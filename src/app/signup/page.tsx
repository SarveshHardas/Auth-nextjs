"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/users/signup", user);
            router.push("/login");
            toast.success("Logged in sucessfully!")
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen py-2 space-y-2">
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2 space-y-2">
            <h1>Signup</h1>
            <label
                htmlFor="username"
            >
                Username
            </label>
            <input
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="border p-2 rounded"
            />
            <label
                htmlFor="email"
            >
                Email
            </label>
            <input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="border p-2 rounded"
            />
            <label
                htmlFor="password">
                Password
            </label>
            <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="border p-2 rounded"
            />
            <button
                onClick={onSignup}
                className={`bg-blue-500 text-white p-2 rounded ${buttonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
                disabled={buttonDisabled}
            >
                Signup
            </button>
            <p>
                Already have an account?
                <Link
                    href="/login"
                    className="text-blue-500"
                >
                    Login
                </Link>
            </p>
        </div>
    )
}