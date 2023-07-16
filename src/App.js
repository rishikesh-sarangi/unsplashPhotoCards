import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = `YOUR API KEY`;
  const fetchRandomPhotos = async () => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: {
            count: 10, // Number of random photos you want
            client_id: apiKey, // Unsplash access key
          },
        }
      );
      console.log(response.data);
      setPhotos(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchRandomPhotos();
  }, []);

  return (
    <>
      {/* When photos are not loading */}
      {error && (
        <div className="container">
          <button onClick={fetchRandomPhotos} className="new-photos">
            Click for New Photos!
          </button>
          <div className="error-message">
            There was an error fetching the photos. Please try again later.
          </div>
        </div>
      )}
      {/* When photos are loading */}
      {photos.length > 0 && (
        <div className="container">
          <p className="desc">
            A simple Website which is using Unsplash API to generate random
            photos in the form of cards
          </p>
          <button onClick={fetchRandomPhotos} className="new-photos">
            Click for New Photos!
          </button>
          {photos.map((photo) => (
            <div className="photo-div" key={photo.id}>
              <img src={photo.urls.regular} alt={photo.alt_description} />
              <p className="photo-desc">{photo.alt_description}</p>
            </div>
          ))}
        </div>
      )}
      <footer className="foot">
        <a
          className="text-color-animation"
          href="https://github.com/rishikesh-sarangi"
        >
          Made by Rishikesh Sarangi
        </a>
      </footer>
    </>
  );
}

export default App;
