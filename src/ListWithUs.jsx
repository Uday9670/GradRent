import React from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import "./ListWithUs.css";

export default function ListWithUsForm() {
  const [formData, setFormData] = React.useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = React.useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  // Basic validation
  if (!formData.name || !formData.email || !formData.phone) {
    alert("Please fill all fields.");
    return;
  }
  try {
    await addDoc(collection(db, "ownerApplications"), {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      status: "pending",
      createdAt: serverTimestamp(),
    });
    alert("Thank you for your application! We will contact you soon.");
    setFormData({ name: "", email: "", phone: "" });
  } catch (error) {
    console.error("Error submitting application:", error);
    alert("Submission failed: " + error.message);
  }
};

  return submitted ? (
    <div className="list-with-us-container">
      <p className="submitted-message">Thank you for your application! We will contact you soon.</p>
    </div>
  ) : (
    <div className="list-with-us-container">
      <h2>List With Us</h2>
      <form className="list-with-us-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone"
          required
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}