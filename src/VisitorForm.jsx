// src/VisitorForm.jsx
import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function VisitorForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    houseNumber: "",
    memberToMeet: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "visitor_entries"), {
        ...formData,
        timestamp: serverTimestamp(),
      });

      alert("✅ Thank you! Your entry has been recorded.");
      setFormData({
        firstName: "",
        lastName: "",
        address: "",
        houseNumber: "",
        memberToMeet: "",
      });
    } catch (err) {
      console.error("Error saving entry:", err);
      alert("Error saving entry. Check console.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Visitor Entry Form</h2>

      <input
        className="border p-2 w-full mb-2"
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />

      <input
        className="border p-2 w-full mb-2"
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />

      <input
        className="border p-2 w-full mb-2"
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
      />

      <input
        className="border p-2 w-full mb-2"
        type="text"
        name="houseNumber"
        placeholder="House Number"
        value={formData.houseNumber}
        onChange={handleChange}
        required
      />

      <input
        className="border p-2 w-full mb-2"
        type="text"
        name="memberToMeet"
        placeholder="Member to Visit"
        value={formData.memberToMeet}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 mt-2"
      >
        Submit
      </button>
    </form>
  );
}