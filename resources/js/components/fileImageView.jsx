import React, { useEffect, useState } from 'react';

function FileImageView({ file, removeFile, index, url }) { 
    let isImage='';
    let isVideo='';
const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
const videoExtensions = ['mp4', 'mov', 'webm'];

// Function to extract file extension
const getFileExtension = (url) => {
    // Check if url is a string
    if (typeof url === 'string') {
        const parts = url.split('.');
        return parts.length > 1 ? parts.pop().toLowerCase() : '';
    }
    console.warn('Invalid URL:', url);
    return ''; // Return an empty string if not a valid URL
};
const fileExtension = url?getFileExtension(url):''; 
 isImage =  url?imageExtensions.includes(fileExtension):'';
 isVideo = url?videoExtensions.includes(fileExtension):file.type.startsWith('video/'); 
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
                        src={url? 'storage/'+url : URL.createObjectURL(file)}
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
                        src={url? 'storage/'+url : URL.createObjectURL(file)}
                        alt={url?'storage/'+url:file.name}
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

                    <label style={{ padding: 10, fontSize: '12px' }}>{url?isVideo?'video '+(index+1):'image '+(index+1):file.name}</label><br></br>

                    <button type='button' style={{
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