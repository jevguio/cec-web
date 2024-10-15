import React from 'react';

function FileImageView({ file, removeFile, index }) {

  const isVideo = file.type.startsWith('video/'); // Check if the file is a video
    return (
        <>
            <div style={{
                borderTop: 'solid 1px',
                borderBottom: 'solid 1px',
                maxHeight: '50px',
                width: '100%',
                minWidth: '200px',
                margin: 2,
                display: 'flex'
            }}>
                {isVideo ? (
                    <video
                        src={URL.createObjectURL(file)}
                        disablePictureInPicture
                        
                        muted
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: '50px',
                            maxHeight: '50px',
                            aspectRatio: '1/1',
                            objectFit: 'cover',
                        }}
                    />
                ) : (
                    <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: '50px',
                            maxHeight: '50px',
                            aspectRatio: '1/1',
                            objectFit: 'cover',
                        }}
                    />
                )}
                <div>

                    <label style={{ padding: 10, fontSize: '12px' }}>{file.name}</label><br></br>

                    <button style={{
                        position: 'absolute',
                        right: 35,
                        height: '20px', fontSize: '10px',
                        backgroundColor: 'red',
                        color: 'white',
                        borderRadius: 10

                    }}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent the click event from bubbling up
                            removeFile();
                        }}
                    >Remove</button>
                </div>
            </div>
        </>
    )
}
export default FileImageView;