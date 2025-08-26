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

  const [showPopup, setShowPopup] = useState(false);

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

      setShowPopup(true); // show popup instead of alert
      setFormData({
        firstName: "",
        lastName: "",
        address: "",
        houseNumber: "",
        memberToMeet: "",
      });
    } catch (err) {
      console.error("Error saving entry:", err);
      alert("❌ Error saving entry. Check console.");
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
        <div className="form-buttons">
          <button type="submit" className="primary">
            Submit
          </button>
        </div>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>✅ Success!</h3>
            <p>Your visitor entry has been recorded.</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .form-buttons {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .secondary {
          background: #ccc;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          border-radius: 4px;
        }

        .primary {
          background: #007bff;
          color: white;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          border-radius: 4px;
        }

        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          animation: fadeIn 0.3s ease-in-out;
        }

        .popup button {
          margin-top: 10px;
          padding: 8px 14px;
          border: none;
          border-radius: 4px;
          background: #007bff;
          color: white;
          cursor: pointer;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
