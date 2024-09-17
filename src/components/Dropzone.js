import React, { useState } from 'react';
import './css/Dropzone.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDropzone } from 'react-dropzone';
import ImageDisplay from './ImageDisplay';
import axios from 'axios';

const Dropzone = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setProcessedImage(null);
      setErrorMessage(null);
      // setLoading(true)

        try {
          const formData = new FormData();
          formData.append('image', file);
          
          const response = await axios.post(
            'https://appsail-50022284582.development.catalystappsail.in/upload', formData, {
            responseType: 'blob',
          });

          if (response.status === 200) {
            const imageUrl = URL.createObjectURL(new Blob([response.data]));
            // setTimeout(() => {
              setProcessedImage(imageUrl);
              setLoading(false)
            // }, 3000)
          } else {
            setErrorMessage('Error processing image. Please try again.');
          }
        } catch (error) {
          console.error("There was an error uploading the image!", error);
          setErrorMessage('There was an error uploading the image. Please try again.');
          setLoading(false)
        } 
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: (acceptedFiles) => {
      handleFileUpload({ target: { files: acceptedFiles } });
    },
  });

  return (
    <main className='container-fluid main-container'>
      <div className='grid-container row justify-content-center gx-5'>
        <div className='content col-lg-6 text-center text-lg-start'>
          <h1 className='text-heading font-display font-bold'>
            Remove Image Background
          </h1>
          <p className='text-para'>
            Effortlessly remove backgrounds from your images in seconds. Upload your photo, and let our tool do the magic – Quick and Easy.
          </p>
        </div>

        <div className='upload-zone col-lg-6 gy-5'>
          <div className="upload-box">
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className='d-none'
              onChange={handleFileUpload}
            />
            <button
              type='button'
              className='btn btn-primary upload-btn'
              onClick={() => document.getElementById('fileInput').click()}
            >
              Upload Image
            </button>

            <div {...getRootProps()} className="drag-drop-zone">
              <input {...getInputProps()} />
              <p className="drag-text">Or drag and drop your image here</p>
            </div>

            {/* {loading && (
              <div className='fullscreen-loader'>
                <div className='spinner'></div>
              </div>
            )} */}

            {errorMessage && (
              <div className='alert alert-danger m-3'>
                {errorMessage}
              </div>
            )}
          </div>
        </div>
        {/* {!loading && */}
                <ImageDisplay 
                originalImage={selectedImage} 
                processedImage={processedImage} 
                loading={loading}
              />
        {/* } */}
      </div>
    </main>
  );
};

export default Dropzone;