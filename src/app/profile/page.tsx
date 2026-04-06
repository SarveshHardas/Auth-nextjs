'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios.get("/api/users/me");
      setData(res.data.user.username);
    }

    getUserDetails();

    if (data !== "nothing") {
      router.push("/profile/" + data);
    }
  }, [router,data])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <p>This is the profile page.</p>
    </div>
  );
}