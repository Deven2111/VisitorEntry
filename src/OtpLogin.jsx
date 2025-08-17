// src/OtpLogin.js
import { useState } from "react";
import { auth } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function OtpLogin({ onSuccess }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  // Setup reCAPTCHA once
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }
  };

  // Step 1: send OTP
  const sendOtp = async () => {
    setupRecaptcha();
    try {
      const result = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );
      setConfirmationResult(result);
      alert("OTP sent!");
    } catch (err) {
      console.error(err);
      alert("Error sending OTP: " + err.message);
    }
  };

  // Step 2: verify OTP
  const verifyOtp = async () => {
    if (!confirmationResult) return;
    try {
      await confirmationResult.confirm(otp);
      alert("OTP verified ✅");
      onSuccess(); // tell parent login is successful
    } catch (err) {
      console.error(err);
      alert("Invalid OTP");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2>Visitor Login</h2>
      <input
        className="border p-2 w-full mt-2"
        type="text"
        placeholder="+91 9999999999"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={sendOtp}>
        Send OTP
      </button>

      {confirmationResult && (
        <>
          <input
            className="border p-2 w-full mt-2"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 mt-2"
            onClick={verifyOtp}
          >
            Verify OTP
          </button>
        </>
      )}

      {/* invisible reCAPTCHA */}
      <div id="recaptcha-container"></div>
    </div>
  );
}