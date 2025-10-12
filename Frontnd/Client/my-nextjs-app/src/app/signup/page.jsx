"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Link from "next/link";

const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(3),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required").min(6),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required(),
});

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", data);
      alert("Signup success (mock)!");
    } catch {
      alert("Signup failed (mock)!");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <input type="text" {...register("name")} placeholder="Name" className="w-full p-3 border rounded"/>
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <input type="email" {...register("email")} placeholder="Email" className="w-full p-3 border rounded"/>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input type="password" {...register("password")} placeholder="Password" className="w-full p-3 border rounded"/>
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        <input type="password" {...register("confirmPassword")} placeholder="Confirm Password" className="w-full p-3 border rounded"/>
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        <button type="submit" disabled={isSubmitting} className="w-full bg-green-500 text-white py-3 rounded">
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
        <p className="text-center mt-2">
          Already have an account? <Link href="/login" className="text-blue-500 underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
