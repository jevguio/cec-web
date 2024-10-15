import React, { useRef, useState } from "react";
import FileImageView from './fileImageView';

const RecordUploads = ({ post, newContent, setNewContent, handleAddPost, filesSelected, setSelectedFiles }) => {
  const fileInput = useRef(null);
  const [hoverAttach, setHoverAttach] = useState(false);

  const onClickSelectFile = () => {
    fileInput.current.click();
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    Array.from(formData.entries()).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
    try {


      const response = await axios.post('http://127.0.0.1:8000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload Successful:', response.data);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Log validation errors
        console.error('Validation Errors:', error.response.data.errors);
      } else {
        console.error('Upload Failed:', error);
      }
    }
  };

  return (
    <>
      <div>
        {post.map((item, index) => (
          <div key={index}>
            <video src={item.filePath} controls></video>
            <p>Content: {item.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} method="post" action="./api/upload">
        <textarea
          type="text"
          name="announcement"
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
                />
              </div>
            ))}
          </div>
        </div>

        <input
          type="file"
          name="files[]"
          aria-label=""
          onChange={handleFileSelection}
          multiple
          ref={fileInput}
          hidden
          accept="image/png,image/jpg,video/mp4"
        />

        <button
          type="submit"
          style={{
            marginTop: 10,
            borderRadius: 5
          }}
        >
          Add Post
        </button>
      </form>
    </>
  );
};

export default RecordUploads;
