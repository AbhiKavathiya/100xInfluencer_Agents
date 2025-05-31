"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitSuccess("");
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise((r) => setTimeout(r, 1500));

      // Example: pretend login success if email contains "ai"
      if (!data.email.includes("ai")) {
        throw new Error("Invalid AI platform credentials");
      }

      setSubmitSuccess("Welcome to 110x");
      reset();
    } catch (error) {
      setSubmitError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-zinc-800 px-4">
      <div className="w-full max-w-md bg-zinc-900 p-10 rounded-3xl shadow-xl border border-zinc-700">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8 select-none tracking-wide">
          Sign In
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-zinc-300 mb-2"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="you@ai-platform.com"
              className={`w-full px-5 py-3 rounded-xl bg-zinc-800 text-white border transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? "border-red-500" : "border-zinc-700"
              }`}
              disabled={loading}
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400 font-medium animate-fadeIn">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password with toggle */}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-zinc-300"
              >
                Password
              </label>
              <button
                type="button"
                className=" right-4 top-3 text-indigo-400 hover:text-indigo-600 transition select-none"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className={`w-full px-5 py-3 rounded-xl bg-zinc-800 text-white border transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.password ? "border-red-500" : "border-zinc-700"
              }`}
              disabled={loading}
              autoComplete="current-password"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-400 font-medium animate-fadeIn">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold text-white flex justify-center items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed select-none"
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Feedback messages */}
          {submitError && (
            <p className="text-center text-red-500 font-semibold animate-fadeIn mt-2">
              {submitError}
            </p>
          )}
          {submitSuccess && (
            <p className="text-center text-green-400 font-semibold animate-fadeIn mt-2">
              {submitSuccess}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
