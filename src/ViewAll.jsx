import React from "react";
import { useNavigate } from "react-router-dom";
import "./ViewAll.css";

const amenitiesData = {
  billsIncluded: [
    { icon: "💧", label: "Water" },
    { icon: "🔌", label: "Electricity" },
    { icon: "🔥", label: "Gas" },
    { icon: "📶", label: "Internet" },
    { icon: "🏋️‍♂️", label: "Gym Facility" },
    { icon: "🤲", label: "Use of all the social spaces" },
  ],
  commonAmenities: [
    { icon: "🤲", label: "Social Spaces" },
    { icon: "🪜", label: "Ground Floor Bar" },
    { icon: "🪜", label: "32nd Floor Bar" },
    { icon: "📚", label: "24hr 33rd Floor Library" },
    { icon: "✔️", label: "Auditorium" },
    { icon: "✔️", label: "Karaoke Rooms" },
    { icon: "🎮", label: "Games Area" },
    { icon: "🎬", label: "Cinema" },
    { icon: "🏋️‍♂️", label: "Onsite Gym" },
    { icon: "🛋️", label: "32nd Floor Lounge" },
    { icon: "🌤️", label: "33rd floor Balcony" },
    { icon: "📦", label: "Post & Parcel Services" },
    { icon: "🧺", label: "Onsite Laundry" },
    { icon: "📶", label: "Upto 200 MB Dual Band Wifi" },
    { icon: "✔️", label: "Free Bi-Weekly Cleaning" },
  ],
};

const ViewAll = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    // Navigate back to the College page, e.g., /collegeA
    navigate("/collegeA");
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Amenities</h2>
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>

        <div className="section">
          <h3>Bills Included</h3>
          <div className="amenities-grid">
            {amenitiesData.billsIncluded.map(({ icon, label }, index) => (
              <div key={index} className="amenity-item">
                <span className="icon">{icon}</span>
                <span className="label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <hr />

        <div className="section">
          <h3>Common Amenities</h3>
          <div className="amenities-grid">
            {amenitiesData.commonAmenities.map(({ icon, label }, index) => (
              <div key={index} className="amenity-item">
                <span className="icon">{icon}</span>
                <span className="label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="got-it-btn" onClick={handleClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAll;