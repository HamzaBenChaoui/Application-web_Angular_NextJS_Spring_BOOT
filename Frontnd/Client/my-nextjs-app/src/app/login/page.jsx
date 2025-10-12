"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Link from "next/link";

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required").min(6),
});

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", data);
      alert("Login success (mock)!");
    } catch {
      alert("Login failed (mock)!");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input type="email" {...register("email")} placeholder="Email" className="w-full p-3 border rounded"/>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input type="password" {...register("password")} placeholder="Password" className="w-full p-3 border rounded"/>
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white py-3 rounded">
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <p className="text-center mt-2">
          Don't have an account? <Link href="/signup" className="text-blue-500 underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
