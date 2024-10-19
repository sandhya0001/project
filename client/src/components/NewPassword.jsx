import React from "react";

export default function NewPassword({ formData, handleChange }) {
  return (
    <div className="text-black flex flex-col justify-center items-center gap-3">
      <div className="text-black flex flex-col items-start">
        <label htmlFor="code">OTP:</label>
        <input
          id="code"
          className="px-2 mt-1 py-1.5 rounded-2xl outline-none border border-black bg-transparent text-black"
          type="text"
          name="code"
          placeholder="Enter OTP"
          value={formData.code}
          onChange={handleChange}
        />
      </div>
      <div className="text-black flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="px-2 mt-1 py-1.5 rounded-2xl outline-none border border-black bg-transparent text-black"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="text-black flex flex-col">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          id="confirmPassword"
          className="px-2 mt-1 py-1.5 rounded-2xl outline-none border border-black bg-transparent text-black"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
