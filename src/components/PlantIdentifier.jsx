import React, { useState } from 'react';
import Axios from 'axios';

const PlantIdentifier = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      setError('Please upload an image.');
      return;
    }
    
    const formData = new FormData();
    formData.append('images', image);

    try {
      const response = await Axios.post('https://api.plantnet.org/v2/identify/all', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Api-Key': 'YOUR_PLANTNET_API_KEY' // Replace with your own API key
        }
      });
      setResult(response.data);
      setError(null);
    } catch (err) {
      setError('Identification failed, please try again.');
      setResult(null);
    }
  };

  return (
    <div>
      <h1>Plant Identifier</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Identify Plant</button>
      {error && <div>{error}</div>}
      {result && (
        <div>
          <h2>Identification Results:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PlantIdentifier;