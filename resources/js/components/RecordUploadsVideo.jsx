import React, { useEffect, useRef, useState } from "react";
import FileImageView from './fileImageView';

const RecordUploads = ({ post, newContent, setNewContent, handleAddPost, filesSelected, setSelectedFiles }) => {
  const fileInput = useRef(null);
  const [hoverAttach, setHoverAttach] = useState(false);
  const [subjects, setSubjects] = useState([
    {
      id: 0,
      title: '',
      room: '',
      teacher_id: '',
      teacher: {
        fname: '',
        lname: '',
        mname: '',
      }
    },
  ]);

  const [Activity, setActivity] = useState([]);
  const [fileUrl, setFileUrl] = useState([]);
  const [ActivityID, setActivityID] = useState('');
  const [selectSubject, setSelectSubject] = useState({
    subject_id: '',
  });
  const onClickSelectFile = () => {
    fileInput.current.click();
  };
  useEffect(() => {
    getSubject();
  }, [newContent, filesSelected])
  const getSubject = async () => {

    try {
      const response = await fetch('/subjects/view', {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setSubjects(result);
      } else {
        console.error(result.message || 'An error occurred.');
      }
    } catch (error) {
      console.error(error + 'An error occurred. Please try again.');
    }
  };
  const handleFileSelection = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to array
    const totalFiles = [...filesSelected, ...selectedFiles];

    // Check if total selected files exceed the limit of 5
    if (totalFiles.length > 5) {
      alert('You can only upload up to 5 files.');
      return;
    }

    setSelectedFiles(totalFiles); // Set new files in state
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file, index) => index !== indexToRemove)
    );
  };
  const removeFileUrl = (idToRemove) => {
    setFileUrl((prevFiles) => {
      const updatedFiles = prevFiles.filter(file => file.id !== idToRemove); // Use file.id if idToRemove is the file ID
      console.log('updatedFiles', updatedFiles); // Log the updated state here
      return updatedFiles; // Return the updated state
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    Array.from(formData.entries()).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
    try {


      const response = await axios.post('/api/uploadvideos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload Successful:', response.data);

      setNewContent('');
      setSelectedFiles([]); setFileUrl([]);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Log validation errors
        console.error('Validation Errors:', error.response.data.errors);
      } else {
        console.error('Upload Failed:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSelectSubject({
      [name]: value,
    });
  };
  useEffect(() => {
    // Fetch the announcement and files when the component mounts
    const getActivity = async () => {
      try {
        const response = await fetch('/api/getvideos', {
          method: 'Post',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
          },
        });

        const result = await response.json();

        if (response.ok) { 
          setActivity(result.uploads);
        } else {
          console.error(result.message || 'An error occurred.');
        }
      } catch (error) {
        console.error('Error fetching the Activity:', error);
      }

    }
    getActivity();
  }, [ActivityID, filesSelected]);
  const onClickeditHandle = (id, content, files) => {
    setActivityID(id);
    setNewContent(content);
    setFileUrl(files);
    setSelectedFiles([]);
  }
  return (
    <div style={{
      padding: 5,
      width: '98%',
      display: 'flex', margin: 5
    }}>
      <div style={{
        height: '70vh',
        overflow: 'auto',
        width: '99%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'gray'
        , margin: 5
      }}>
        {Activity && Activity.map((item, index) => (
          <div key={index} style={{
            border: 'solid 1px',
            padding: 15,
            margin: 5,
            backgroundColor: 'lightgray'
          }}>
            <p>Content: {item.title}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {JSON.parse(item.url).map((file, index) => {
                // Function to get the file extension
                const getFileExtension = (filePath) => {
                  return filePath.split('.').pop().toLowerCase();
                };

                const fileExtension = getFileExtension(file);
                const isVideo = ['mp4', 'mov', 'webm'].includes(fileExtension);

                return (
                  <div key={index}
                  >

                    {isVideo ? (
                      <video style={{ maxHeight: '60px' }}
                        onClick={() => {
                          console.log('open', file); // Make sure 'file' is the correct path/filename
                          window.open(`${window.location.origin}/storage/${file}`, '_blank'); // Open the file in a new tab
                        }}>
                        <source src={'/storage/' + file} type={`video/${fileExtension}`} />
                        Your browser does not support the video tag.
                      </video>
                    ) :
                      (
                        file.split('.')[1] === "png" || file.split('.')[1] === "jpeg" || file.split('.')[1] === "jpg" ? 
                        
                        <img src={"/storage/"+file}
                        onClick={() => {
                          const fileUrl = `${window.location.origin}/storage/${file}`;
                          console.log(fileUrl)
                          window.open(fileUrl, '_blank');
                        }}
                        style={{
                          maxHeight:'80px'
                        }}
                        ></img>:

                          <button
                            onClick={() => {
                              const fileUrl = `${window.location.origin}/storage/${file}`;
                              console.log(fileUrl)
                              window.open(fileUrl, '_blank');
                            }}
                          >
                            {file.split('.')[1] === "pdf" || file.split('.')[1] === "png" || file.split('.')[1] === "jpeg" || file.split('.')[1] === "jpg" ? "Open " : "Download "}
                            {file.split('.')[1]}
                          </button>
                      )


                    }
                  </div>
                );
              })}

            </div>
            <button onClick={() => onClickeditHandle(item.id, item.content, item.files)}>Edit</button>
          </div>
        ))}
      </div>

      <form style={{
        margin: 10,
        padding: 10,
        width: '98%'
      }} onSubmit={handleSubmit} method="post" action="/api/upload">
        <select
          name="subject_id"
          className="registerInput"
          id="Teacher"
          required
          value={selectSubject.subject_id}
          onChange={handleInputChange}
        >
          <option value="" disabled> Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>{subject.title}</option>
          ))}
        </select>
        <textarea
          type="text"
          name="title"
          className="upload_text"
          style={{
            width: '92%',
            border: 'none',
            padding: 10,
            marginTop: 10
          }}
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Announce Something to your class"
          required
        />
        <br />

        <div
          style={{
            border: hoverAttach ? 'dashed 2px white' : 'dashed 2px gray',
            padding: 10,
            textAlign: 'center',
            cursor: 'pointer',
            margin: 10,
            minHeight: 200
          }}
          onClick={onClickSelectFile}
          onMouseEnter={() => setHoverAttach(true)}
          onMouseLeave={() => setHoverAttach(false)}
        >
          <label>Attach File</label>
          <p style={{ fontSize: '10px', color: 'gray' }}>max 5 files only</p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {filesSelected.map((file, index) => (
              <div key={index} style={{ marginRight: '10px' }}>
                <FileImageView
                  removeFile={() => removeFile(index)} // Pass the remove function
                  file={file}
                  url={false}
                />
              </div>
            ))}
            {fileUrl && fileUrl.map((file, index) => (
              <div key={index} style={{ marginRight: '10px' }}>
                <FileImageView
                  index={index}
                  removeFile={() => removeFileUrl(file.id)} // Pass the remove function
                  url={file.file_path ? file.file_path : ''}
                />
              </div>
            ))}
          </div>
        </div>
        <input type="hidden" name="announcementID" value={ActivityID} />
        <input type="hidden" name="fileUrl" value={JSON.stringify(fileUrl)} />
        <input
          type="file"
          name="files[]"
          aria-label=""
          onChange={handleFileSelection}
          multiple
          ref={fileInput}
          hidden
          accept="video/mp4,video/avi, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, image/*"

        />

        <button
          type="submit"
          style={{
            marginTop: 10,
            borderRadius: 5
          }}
        >
          {ActivityID ? 'Save Edit' : 'Add Post'}
        </button>
        {ActivityID &&
          <button
            style={{
              marginTop: 10,
              borderRadius: 5
            }}
            onClick={() => onClickeditHandle('', '', [])}
          >
            Cancel
          </button>}
      </form>
    </div>
  );
};

export default RecordUploads;
