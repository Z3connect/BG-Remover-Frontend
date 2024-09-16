import React from 'react';
import './css/ImageDisplay.css';

const ImageDisplay = ({ originalImage, processedImage, loading }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = processedImage;
    link.setAttribute('download', 'processed_image.png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="image-display-container row gx-lg-5 gy-md-3 gy-4 ">
      {!loading && originalImage && (
        <div className="image-section col-lg-5 col-md-6 col-sm-12">
          <h2>Original Image</h2>
          <img src={originalImage} alt="Original" className="img-fluid original-img" />
        </div>
      )}

      {!loading && processedImage && (
        <div className="image-section col-lg-5 col-md-6 col-sm-12">
          <h2>BGRemoved Image</h2>
          <img src={processedImage} alt="Processed" className="img-fluid processed-img" />
        </div>
      )}
      {processedImage && <button className='btn btn-primary download-btn' onClick={handleDownload}>Download</button>}
    </div>
  );
};

export default ImageDisplay;