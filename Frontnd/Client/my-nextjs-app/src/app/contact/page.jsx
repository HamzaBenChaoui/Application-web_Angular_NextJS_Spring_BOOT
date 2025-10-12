"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";

// 1️⃣ Define validation schema with Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
  email: yup.string().required("Email is required").email("Invalid email address"),
  message: yup.string().required("Message is required").min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
  // 2️⃣ Setup React Hook Form
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  // 3️⃣ Submission handler
  const onSubmit = async (data) => {
    try {
      await axios.post("/api/contact", data); // replace with your backend endpoint
      alert("Message sent successfully!");
      reset(); // clear the form
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Your Name"
            {...register("name")}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Your Email"
            {...register("email")}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Message */}
        <div>
          <textarea
            placeholder="Your Message"
            {...register("message")}
            className="w-full p-3 border rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.message && <p className="text-red-500 mt-1">{errors.message.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
