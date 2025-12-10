import React, { useState } from "react";
import StepEmailVerification from "../components/Register/StepEmailVerification";
import StepTwo from "../components/Register/StepTwo";
import {
  registerMember,
  verifyOtp as v_otp_api,
  sendOtp as s_otp_api,
} from "../api/Register";

const initialData = {
  email: "",
  otp: "",
  fullName: "",
  phone: "",
  gender: "",
  dateOfBirth: "",
  education: "",
  profession: "",
  addressLine1: "",
  addressLine2: "",
  pincode: "",
  city: "",
  state: "",
  country: "",
  previousAssociations: "",
  volunteerPrograms: "",
  aadhar: "",
  extraFields: "",
};

export default function MemberRegistration() {
  const [formData, setFormData] = useState(initialData);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [cooldown, setCooldown] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // STEP 1 – Send OTP
  const sendOtp = async () => {
    if (cooldown) return;
    setLoading(true);
    setMessage("");

    try {
      const data = await s_otp_api({ email: formData.email });
      setMessage(data.message);
      setCooldown(true);
      setTimeLeft(300);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCooldown(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setMessage(err.message || "OTP sending failed.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 1 – Verify OTP
  const verifyOtp = async () => {
    setVerifyLoading(true);
    setMessage("");

    try {
      const data = await v_otp_api({
        email: formData.email,
        otp: formData.otp,
      });

      if (data.success) {
        setStep(2);
      }

      setMessage(data.message);
    } catch (err) {
      setMessage(err.message || "OTP verification failed.");
    } finally {
      setVerifyLoading(false);
    }
  };

  // STEP 2 – Submit Full Registration
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await registerMember(formData);

      const data = await res.json();
      setMessage(data.message);

      if (data.success) setFormData(initialData);
    } catch (err) {
      setMessage(err.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-red-700">Member Registration</h1>
        <p className="text-gray-600">
          Join our mission by completing registration.
        </p>
      </header>

      {step === 1 ? (
        <StepEmailVerification
          loading={loading}
          verifyLoading={verifyLoading}
          handleChange={handleChange}
          sendOtp={sendOtp}
          verifyOtp={verifyOtp}
          formData={formData}
          message={
            cooldown
              ? `You can resend OTP after ${Math.floor(timeLeft / 60)}:${
                  timeLeft % 60
                } min.`
              : message
          }
          cooldown={cooldown}
        />
      ) : (
        <StepTwo
          loading={loading}
          handleChange={handleChange}
          formData={formData}
          submitForm={submitForm}
          message={message}
        />
      )}
    </main>
  );
}
