"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";

export default function LoginPage() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const onLogin = async () => {
        //TODO: Signup API call
    }
    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1>Login</h1>
            <hr className="text-white" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="border p-2 rounded" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="border p-2 rounded" />
            <button onClick={onLogin} className="bg-blue-500 text-white p-2 rounded">Login</button>
            <p>Already have an account? <Link href="/signup" className="text-blue-500">Signup</Link></p>
        </div>
    )
}