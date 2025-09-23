import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // adjust path if needed
import "./PropertyDetailsC.css";
import { useParams } from "react-router-dom";

function PropertyDetailsC() {
  const { propertyId } = useParams();
  const [flat, setFlat] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if(!propertyId)return;
    async function fetchFlat() {
      const docRef = doc(db, "flats", propertyId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFlat(docSnap.data());
      } else {
        console.log("No such document!");
      }
    }
    fetchFlat();
  }, [propertyId]);

  if (!flat) return <p>Loading...</p>;

  const mediaItems = flat.mediaItems || [];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  const handleSelect = (index) => {
    setActiveIndex(index);
  };

  const activeItem = mediaItems[activeIndex] || {};

  return (
    <div className="property-details-container">
      <div className="slider-container">
        <div className="slider-label">
          {activeItem.label && <span>{activeItem.label}</span>}
        </div>

        <button className="slider-arrow left" onClick={handlePrev} aria-label="Previous">
          &#8249;
        </button>

        <div className="slider-media">
          {activeItem.type === "image" && (
            <img src={activeItem.src} alt={activeItem.alt || flat.title} className="main-image" />
          )}
          {activeItem.type === "video" && (
            <video src={activeItem.src} controls className="main-video" aria-label={activeItem.alt} />
          )}
        </div>

        <button className="slider-arrow right" onClick={handleNext} aria-label="Next">
          &#8250;
        </button>

        <div className="slider-dots">
          {mediaItems.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === activeIndex ? "active" : ""}`}
              onClick={() => handleSelect(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSelect(idx);
                }
              }}
            ></span>
          ))}
        </div>
      </div>

      <div className="thumbnail-sidebar">
        {mediaItems.map((item, idx) => (
          <div
            key={idx}
            className={`thumbnail-item ${idx === activeIndex ? "active" : ""}`}
            onClick={() => handleSelect(idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleSelect(idx);
              }
            }}
            aria-label={`Thumbnail ${idx + 1}`}
          >
            {item.type === "video" ? (
              <div className="video-thumbnail-wrapper">
                <video src={item.src} muted loop playsInline preload="metadata" className="thumbnail-video" />
                <div className="play-icon">&#9658;</div>
                {item.label && <div className="video-label">{item.label}</div>}
              </div>
            ) : (
              <div className="thumbnail-image-wrapper">
                <img src={item.src} alt={item.alt || flat.title} className="thumbnail-image" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyDetailsC;