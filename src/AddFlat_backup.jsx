// import React, { useState, useEffect } from "react";
// import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
// import { db, auth } from "./firebase";
// import { Link } from "react-router-dom"; // for navigation links
// import "./AddFlat.css";

// const amenitiesOptions = {
//   billsIncluded: [
//     "Water",
//     "Electricity",
//     "Gas",
//     "Internet",
//     "Gym Facility",
//     "Use of all the social spaces",
//   ],
//   commonAmenities: [
//     "Social Spaces",
//     "Ground Floor Bar",
//     "32nd Floor Bar",
//     "24hr 33rd Floor Library",
//     "Auditorium",
//     "Karaoke Rooms",
//     "Games Area",
//     "Cinema",
//     "Onsite Gym",
//     "32nd Floor Lounge",
//     "33rd floor Balcony",
//     "Post & Parcel Services",
//     "Onsite Laundry",
//     "Upto 200 MB Dual Band Wifi",
//     "Free Bi-Weekly Cleaning",
//   ],
// };

// function AddFlat() {
//   const [isOwner, setIsOwner] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser ] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (currentUser ) => {
//       setLoading(true);
//       setUser (currentUser );

//       if (!currentUser ) {
//         setIsOwner(false);
//         setLoading(false);
//         return;
//       }

//       try {
//         const userDoc = await getDoc(doc(db, "users", currentUser .uid));
//         if (userDoc.exists() && userDoc.data().role === "owner") {
//           setIsOwner(true);
//         } else {
//           setIsOwner(false);
//         }
//       } catch (error) {
//         console.error("Error fetching user role:", error);
//         setIsOwner(false);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Form state and handlers
//   const [formData, setFormData] = useState({
//     title: "",
//     address: "",
//     rating: "",
//     reviews: "",
//     distanceFromCityCenter: "",
//     transportTimes: { bus: "", walk: "", scooter: "" },
//     roomOptions: "",
//     offers: "",
//     instantBooking: false,
//     payInInstalment: false,
//     electricity24x7: false,
//     price: "",
//     pricePeriod: "week",
//     imageUrl: "",
//     billsIncluded: [],
//     commonAmenities: [],
//     collegeId: "",
//     mediaItems: [],
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name.startsWith("transportTimes.")) {
//       const key = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         transportTimes: { ...prev.transportTimes, [key]: value },
//       }));
//     } else if (
//       type === "checkbox" &&
//       (name === "instantBooking" ||
//         name === "payInInstalment" ||
//         name === "electricity24x7")
//     ) {
//       setFormData((prev) => ({ ...prev, [name]: checked }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleAmenityToggle = (category, amenity) => {
//     setFormData((prev) => {
//       const current = prev[category];
//       if (current.includes(amenity)) {
//         return { ...prev, [category]: current.filter((a) => a !== amenity) };
//       } else {
//         return { ...prev, [category]: [...current, amenity] };
//       }
//     });
//   };

//   const addMediaItem = () => {
//     setFormData((prev) => ({
//       ...prev,
//       mediaItems: [...prev.mediaItems, { type: "image", src: "", alt: "", label: "" }],
//     }));
//   };

//   const updateMediaItem = (index, field, value) => {
//     setFormData((prev) => {
//       const newMedia = [...prev.mediaItems];
//       newMedia[index][field] = value;
//       return { ...prev, mediaItems: newMedia };
//     });
//   };

//   const removeMediaItem = (index) => {
//     setFormData((prev) => {
//       const newMedia = prev.mediaItems.filter((_, i) => i !== index);
//       return { ...prev, mediaItems: newMedia };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const currentUser  = auth.currentUser ;
//       if (!currentUser ) {
//         alert("You must be logged in to submit a listing.");
//         return;
//       }
//       if (!formData.collegeId) {
//         alert("Please select a college.");
//         return;
//       }

//       const flatDataWithOwner = {
//         ...formData,
//         ownerId: currentUser .uid,
//         createdAt: serverTimestamp(),
//       };

//       await addDoc(collection(db, "flats"), flatDataWithOwner);

//       alert("Flat listing submitted successfully!");

//       // Reset form
//       setFormData({
//         title: "",
//         address: "",
//         rating: "",
//         reviews: "",
//         distanceFromCityCenter: "",
//         transportTimes: { bus: "", walk: "", scooter: "" },
//         roomOptions: "",
//         offers: "",
//         instantBooking: false,
//         payInInstalment: false,
//         electricity24x7: false,
//         price: "",
//         pricePeriod: "week",
//         imageUrl: "",
//         billsIncluded: [],
//         commonAmenities: [],
//         collegeId: "",
//         mediaItems: [],
//       });
//     } catch (error) {
//       console.error("Error adding document: ", error);
//       alert("Failed to submit listing: " + error.message);
//     }
//   };

// if (loading) {
//   return (
//     <div className="add-flat-container">
//       <p>Checking permissions, please wait...</p>
//     </div>
//   );
// }

// if (!user) {
//   return (
//     <div className="add-flat-container">
//       <p>
//         You must <Link to="/login">login</Link> first to apply via{" "}
//         <Link to="/list-with-us">List With Us</Link> form.
//       </p>
//     </div>
//   );
// }

// if (!isOwner) {
//   return (
//     <div className="add-flat-container">
//       <p>
//         You do not have permission to add flats. Please apply via{" "}
//         <Link to="/ListWithUs">List With Us</Link> form.
//       </p>
//     </div>
//   );
// }

//   // Render the AddFlat form only if user is verified owner
//   return (
//     <div className="add-flat-container">
//       <h2>Add Your Flat Listing</h2>
//       <form onSubmit={handleSubmit} className="add-flat-form">
//         {/* College selector */}
//         <label>
//           Select College:
//           <select
//             name="collegeId"
//             value={formData.collegeId}
//             onChange={handleChange}
//             required
//           >
//             <option value="">--Select College--</option>
//             <option value="CollegeA">College A</option>
//             <option value="CollegeB">College B</option>
//             <option value="CollegeC">College C</option>
//             {/* Add more colleges as needed */}
//           </select>
//         </label>

//         {/* Property Title */}
//         <label>
//           Property Title:
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             placeholder="e.g. Chapter Spitalfields, London"
//           />
//         </label>

//         {/* Address */}
//         <label>
//           Address:
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//             placeholder="Full address"
//           />
//         </label>

//         {/* Rating */}
//         <label>
//           Rating (optional):
//           <input
//             type="number"
//             name="rating"
//             value={formData.rating}
//             onChange={handleChange}
//             min="0"
//             max="5"
//             step="0.1"
//             placeholder="e.g. 4.5"
//           />
//         </label>

//         {/* Number of Reviews */}
//         <label>
//           Number of Reviews (optional):
//           <input
//             type="number"
//             name="reviews"
//             value={formData.reviews}
//             onChange={handleChange}
//             min="0"
//             placeholder="e.g. 10"
//           />
//         </label>

//         {/* Distance / Location Info */}
//         <fieldset>
//           <legend>Distance / Location Info</legend>
//           <label>
//             Distance from City Center:
//             <input
//               type="text"
//               name="distanceFromCityCenter"
//               value={formData.distanceFromCityCenter}
//               onChange={handleChange}
//               placeholder="e.g. 2.6 mi"
//             />
//           </label>
//           <label>
//             Bus Time:
//             <input
//               type="text"
//               name="transportTimes.bus"
//               value={formData.transportTimes.bus}
//               onChange={handleChange}
//               placeholder="e.g. 20m"
//             />
//           </label>
//           <label>
//             Walk Time:
//             <input
//               type="text"
//               name="transportTimes.walk"
//               value={formData.transportTimes.walk}
//               onChange={handleChange}
//               placeholder="e.g. 25m"
//             />
//           </label>
//           <label>
//             Scooter Time:
//             <input
//               type="text"
//               name="transportTimes.scooter"
//               value={formData.transportTimes.scooter}
//               onChange={handleChange}
//               placeholder="e.g. 53m"
//             />
//           </label>
//         </fieldset>

//         {/* Room Options */}
//         <label>
//           Number of Room Options:
//           <input
//             type="number"
//             name="roomOptions"
//             value={formData.roomOptions}
//             onChange={handleChange}
//             min="1"
//             placeholder="e.g. 18"
//           />
//         </label>

//         {/* Offers */}
//         <label>
//           Number of Offers:
//           <input
//             type="number"
//             name="offers"
//             value={formData.offers}
//             onChange={handleChange}
//             min="0"
//             placeholder="e.g. 7"
//           />
//         </label>

//         {/* Checkboxes */}
//         <label>
//           <input
//             type="checkbox"
//             name="instantBooking"
//             checked={formData.instantBooking}
//             onChange={handleChange}
//           />
//           Instant Booking
//         </label>

//         <label>
//           <input
//             type="checkbox"
//             name="payInInstalment"
//             checked={formData.payInInstalment}
//             onChange={handleChange}
//           />
//           Pay In Instalment
//         </label>

//         <label>
//           <input
//             type="checkbox"
//             name="electricity24x7"
//             checked={formData.electricity24x7}
//             onChange={handleChange}
//           />
//           24*7 Electricity
//         </label>

//         {/* Price */}
//         <label>
//           Price:
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             min="0"
//             required
//             placeholder="e.g. 463"
//           />
//         </label>

//         <label>
//           Price Period:
//           <select
//             name="pricePeriod"
//             value={formData.pricePeriod}
//             onChange={handleChange}
//           >
//             <option value="week">Per Week</option>
//             <option value="month">Per Month</option>
//           </select>
//         </label>

//         {/* Main Image URL */}
//         <label>
//           Image URL (Main Image):
//           <input
//             type="url"
//             name="imageUrl"
//             value={formData.imageUrl}
//             onChange={handleChange}
//             placeholder="Link to main property image"
//           />
//         </label>

//         {/* Bills Included */}
//         <fieldset>
//           <legend>Bills Included</legend>
//           {amenitiesOptions.billsIncluded.map((amenity) => (
//             <label key={amenity}>
//               <input
//                 type="checkbox"
//                 checked={formData.billsIncluded.includes(amenity)}
//                 onChange={() => handleAmenityToggle("billsIncluded", amenity)}
//               />
//               {amenity}
//             </label>
//           ))}
//         </fieldset>

//         {/* Common Amenities */}
//         <fieldset>
//           <legend>Common Amenities</legend>
//           {amenitiesOptions.commonAmenities.map((amenity) => (
//             <label key={amenity}>
//               <input
//                 type="checkbox"
//                 checked={formData.commonAmenities.includes(amenity)}
//                 onChange={() => handleAmenityToggle("commonAmenities", amenity)}
//               />
//               {amenity}
//             </label>
//           ))}
//         </fieldset>

//         {/* Media Items Section */}
//         <div style={{ marginTop: "20px" }}>
//           <h3>Property Media (Images/Videos)</h3>
//           {formData.mediaItems.map((item, idx) => (
//             <div
//               key={idx}
//               style={{
//                 marginBottom: "10px",
//                 border: "1px solid #ccc",
//                 padding: "10px",
//               }}
//             >
//               <label>
//                 Type:
//                 <select
//                   value={item.type}
//                   onChange={(e) => updateMediaItem(idx, "type", e.target.value)}
//                 >
//                   <option value="image">Image</option>
//                   <option value="video">Video</option>
//                 </select>
//               </label>
//               <label>
//                 URL:
//                 <input
//                   type="url"
//                   value={item.src}
//                   onChange={(e) => updateMediaItem(idx, "src", e.target.value)}
//                   placeholder="Media URL"
//                   required
//                 />
//               </label>
//               <label>
//                 Alt Text:
//                 <input
//                   type="text"
//                   value={item.alt}
//                   onChange={(e) => updateMediaItem(idx, "alt", e.target.value)}
//                   placeholder="Alt text"
//                 />
//               </label>
//               <label>
//                 Label (optional):
//                 <input
//                   type="text"
//                   value={item.label}
//                   onChange={(e) => updateMediaItem(idx, "label", e.target.value)}
//                   placeholder="Label"
//                 />
//               </label>
//               <button type="button" onClick={() => removeMediaItem(idx)}>
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button type="button" onClick={addMediaItem}>
//             Add Media Item
//           </button>
//         </div>

//         <button type="submit" className="submit-btn" style={{ marginTop: "20px" }}>
//           Submit Listing
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddFlat;