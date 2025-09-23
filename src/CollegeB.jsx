import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "./firebase"; // adjust path if needed
import { Link } from "react-router-dom";
import "./CollegeB.css";

function CollegeB() {
  const [flats, setFlats] = useState([]);

  // 🟢 WhatsApp handler for Book Now
  const handleBookNow = (flat) => {
    // ✅ Correct format: Country code + phone number (no +, no spaces)
    // For India: 91 + your 10-digit number (e.g., 9670166394 → 919670166394)
    // Replace with YOUR exact international number
    const adminPhone = "919670166394"; // Updated: Added 91 for India

    // Pre-filled message with flat details (customize as needed)
    const message = `Hi! I'm interested in booking "${flat.title}" flat.\n\nDetails:\n- Price: £${flat.price} per ${flat.pricePeriod}\n- Address: ${flat.address}\n- Rating: ${flat.rating || 'N/A'} (${flat.reviews || 0} reviews)\n- Distance from City Center: ${flat.distanceFromCityCenter}\n\nCan you help with availability and next steps?`;

    // WhatsApp URL with encoded message
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;

    // Open in new tab (works on mobile/desktop)
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const q = query(
      collection(db, "flats"),
      where("collegeId", "==", "CollegeB"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const flatsData = [];
      snapshot.forEach((doc) => flatsData.push({ id: doc.id, ...doc.data() }));
      setFlats(flatsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="property-page">
      {flats.length === 0 && <p>No listings available.</p>}
      {flats.map((flat) => (
        <div key={flat.id} className="property-card">
          <div className="image-wrapper">
            <Link to={`/property-details/${flat.id}`}>
              <img src={flat.imageUrl} alt={flat.title} />
            </Link>
          </div>
          <div className="property-info">
            <h2>{flat.title}</h2>
            <p className="address">{flat.address}</p>
            <div className="rating">
              <span className="rating-value">{flat.rating || "N/A"}</span>
              <span className="stars">&#9733; &#9733; &#9733; &#9733; &#9733;</span>
              <span className="reviews">({flat.reviews || 0})</span>
            </div>
            <div className="location-info">
              <span>📍 {flat.distanceFromCityCenter}</span>
              <span>🚌 {flat.transportTimes?.bus}</span>
              <span>🚶 {flat.transportTimes?.walk}</span>
              <span>🛴 {flat.transportTimes?.scooter}</span>
            </div>
            <div className="tags">
              <span className="tag">
                <span className="icon">🛏️</span> {flat.roomOptions} Room Options
              </span>
              <span className="tag">
                <span className="icon">🏷️</span> {flat.offers} Offers
              </span>
              {flat.instantBooking && (
                <span className="tag outlined">
                  <span className="icon">⚡</span> Instant Booking
                </span>
              )}
              {flat.payInInstalment && (
                <span className="tag outlined">
                  <span className="icon">✔️</span> Pay In Instalment
                </span>
              )}
              {flat.electricity24x7 && (
                <span className="tag outlined">
                  <span className="icon">⚡</span> 24*7 Electricity
                </span>
              )}
            </div>
            <div className="footer">
              <div className="price">
                From <b>£{flat.price}</b> / {flat.pricePeriod}
              </div>
              {/* 🟢 Updated Book Now button with WhatsApp handler */}
              <button 
                className="enquire-btn" // Keep class for existing CSS; rename to "book-now-btn" if you update CSS
                onClick={() => handleBookNow(flat)}
                style={{ 
                  backgroundColor: "#25D366", // WhatsApp green
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Book Now via WhatsApp
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CollegeB;