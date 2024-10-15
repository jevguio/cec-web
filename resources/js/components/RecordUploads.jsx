import React, { useRef, useState } from "react";
import FileImageView from './fileImageView';

const RecordUploads = ({ post, newContent, setNewContent, handleAddPost,filesSelected,setSelectedFiles}) => {
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

      <div>
        <input
          type="text"
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
            border: hoverAttach ? 'dashed 3px white' : 'dashed 2px gray',
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
          name="videoUpload"
          aria-label=""
          onChange={handleFileSelection}
          multiple
          ref={fileInput}
          hidden
        />

        <button
          onClick={handleAddPost}
          style={{
            marginTop: 10,
            borderRadius: 5
          }}
        >
          Add Post
        </button>
      </div>
    </>
  );
};

export default RecordUploads;
