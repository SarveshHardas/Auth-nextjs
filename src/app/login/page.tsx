"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }

    }, [user])

    const onLogin = async () => {
        //TODO: Signup API call
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login successful", response.data);
            toast.success("Login successful");
            router.push("/profile");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
            return NextResponse.json({ message: error.message }, { status: 500 });
        } finally {
            setLoading(false);
        }

    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1>Login</h1>
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
                htmlFor="password"
            >
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
                onClick={onLogin}
                className={`bg-blue-500 text-white p-2 rounded ${buttonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
            >
                Login
            </button>
            <p>
                Already have an account?
                <Link
                    href="/signup"
                    className="text-blue-500"
                >
                    Signup
                </Link>
            </p>
        </div>
    )
}