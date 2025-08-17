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
    <div className="container">
      <h2>Visitor Entry Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="houseNumber"
          placeholder="House Number"
          value={formData.houseNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="memberToMeet"
          placeholder="Member to Visit"
          value={formData.memberToMeet}
          onChange={handleChange}
          required
        />
        <button type="submit" className="primary">
          Submit
        </button>
      </form>
    </div>
  );
}
