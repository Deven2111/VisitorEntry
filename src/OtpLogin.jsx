import { useState } from "react";
import { auth } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function OtpLogin({ onSuccess }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }
  };

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

  const verifyOtp = async () => {
    if (!confirmationResult) return;
    try {
      await confirmationResult.confirm(otp);
      alert("OTP verified ✅");
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Invalid OTP");
    }
  };

  return (
    <div className="container">
      <h2>Visitor Login</h2>
      <input
        type="text"
        placeholder="+91 9999999999"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button className="primary" onClick={sendOtp}>
        Send OTP
      </button>

      {confirmationResult && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="success" onClick={verifyOtp}>
            Verify OTP
          </button>
        </>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
}
