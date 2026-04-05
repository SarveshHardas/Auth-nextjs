"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  params: Promise<{
    id: string
  }>
}

export default function UserProfile({ params }: Props) {
  const router = useRouter();
  const { id } = React.use(params)

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: unknown) {
      console.log((error as Error).message);
      toast.error((error as Error).message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>

      <p className="text-4xl">
        This is the profile page of user:
        <span className="p-2 rounded bg-orange-500 text-black">
          {id}
        </span>
      </p>

      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-200 hover:text-black px-7 py-3 mt-4 rounded-lg transition-colors duration-500 ease-in-out"
      >
        Logout
      </button>

    </div>
  )
}