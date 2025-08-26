import { useState } from "react";
import { auth } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function OtpLogin({ onSuccess }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [language, setLanguage] = useState("en"); // default English

  const translations = {
    en: {
      title: "Visitor Login",
      phonePlaceholder: "Enter phone number (e.g., +91 9999999999)",
      sendOtp: "Send OTP",
      otpPlaceholder: "Enter OTP",
      verifyOtp: "Verify OTP",
      otpSent: "OTP sent!",
      otpVerified: "OTP verified ✅",
      invalidOtp: "Invalid OTP",
      errorSending: "Error sending OTP: ",
    },
    hi: {
      title: "आगंतुक लॉगिन",
      phonePlaceholder: "फ़ोन नंबर दर्ज करें (जैसे +91 9999999999)",
      sendOtp: "ओटीपी भेजें",
      otpPlaceholder: "ओटीपी दर्ज करें",
      verifyOtp: "ओटीपी सत्यापित करें",
      otpSent: "ओटीपी भेजा गया!",
      otpVerified: "ओटीपी सत्यापित ✅",
      invalidOtp: "अमान्य ओटीपी",
      errorSending: "ओटीपी भेजने में त्रुटि: ",
    },
    mr: {
      title: "पाहुणे लॉगिन",
      phonePlaceholder: "फोन नंबर टाका (उदा. +91 9999999999)",
      sendOtp: "ओटीपी पाठवा",
      otpPlaceholder: "ओटीपी टाका",
      verifyOtp: "ओटीपी पडताळा",
      otpSent: "ओटीपी पाठवला गेला!",
      otpVerified: "ओटीपी पडताळला ✅",
      invalidOtp: "अवैध ओटीपी",
      errorSending: "ओटीपी पाठवताना त्रुटी: ",
    },
  };

  const t = translations[language];

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
      alert(t.otpSent);
    } catch (err) {
      console.error(err);
      alert(t.errorSending + err.message);
    }
  };

  const verifyOtp = async () => {
    if (!confirmationResult) return;
    try {
      await confirmationResult.confirm(otp);
      alert(t.otpVerified);
      onSuccess();
    } catch (err) {
      console.error(err);
      alert(t.invalidOtp);
    }
  };

  return (
    <div className="container">
      {/* Language Selector */}
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="language">🌐 Language: </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="mr">मराठी</option>
        </select>
      </div>

      <h2>{t.title}</h2>
      <input
        type="text"
        placeholder={t.phonePlaceholder}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button className="primary" onClick={sendOtp}>
        {t.sendOtp}
      </button>

      {confirmationResult && (
        <>
          <input
            type="text"
            placeholder={t.otpPlaceholder}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="success" onClick={verifyOtp}>
            {t.verifyOtp}
          </button>
        </>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
}
