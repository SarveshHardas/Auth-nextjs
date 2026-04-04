"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";

export default function SignupPage() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const onSignup = async () => {
        //TODO: Signup API call
    }
    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1>Signup</h1>
            <hr className="text-white" />
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className="border p-2 rounded" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="border p-2 rounded" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="border p-2 rounded" />
            <button onClick={onSignup} className="bg-blue-500 text-white p-2 rounded">Signup</button>
            <p>Already have an account? <Link href="/login" className="text-blue-500">Login</Link></p>
        </div>
    )
}