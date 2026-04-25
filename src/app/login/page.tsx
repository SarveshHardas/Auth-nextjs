"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader, Moon, Sun } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [lightTheme, setLightTheme] = useState(true);
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
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            toast.success("Login successful");
            router.push(`/profile/${response.data?.user?.username}`);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An error occurred';
            toast.error(message);
        } finally {
            setLoading(false);
        }

    }

    const forgotPassword = async () => {
        try {
            await axios.post("/api/users/forgotpassword", { email: user.email })
        } catch (error: unknown) {
            console.log((error as Error).message)
        }
    }

    if (loading) {
        return (
            <div className={`flex justify-center items-center min-h-screen ${lightTheme ? "bg-white text-neutral-800" : "text-white"}`}>
                <Loader />
            </div>
        )
    }

    return (
        <>
            <section className="grid grid-cols-2 min-h-screen w-full">
                <div className="relative w-full h-full">
                    <Image src={"/login-img.png"} alt="Login" fill className="object-cover" priority/>
                </div>
                <div className={`p-10 flex flex-col justify-center items-center ${lightTheme ? "bg-blue-300 text-neutral-800" : "bg-gray-900 text-white"}`}>
                    <div className="fixed top-0 right-0 mr-5 mt-5 transition-all duration-300 ease-in-out">
                        <button
                            onClick={() => setLightTheme(prev => !prev)}
                            className="relative w-8 h-8"
                        >
                            <Moon
                                size={26}
                                className={`absolute inset-0 transition-all duration-600 ${lightTheme ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"}`}
                            />
                            <Sun
                                size={26}
                                className={`absolute inset-0 transition-all duration-600 ${lightTheme ? "opacity-0 -rotate-180" : "opacity-100 rotate-0"}`}
                            />
                        </button>
                    </div>
                    <h1 className="text-4xl font-bold mb-8">Login</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className={`bg-transparent border px-5 py-3 rounded-xl focus:outline-none ${lightTheme ? "border-neutral-800 text-neutral-800" : "border-neutral-300 text-white"}`}
                    />
                    <input
                        type="password"
                        placeholder="********"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className={`bg-transparent border px-5 py-3 mt-4 rounded-xl focus:outline-none ${lightTheme ? "border-neutral-800 text-neutral-800" : "border-neutral-300 text-white"}`}
                    />
                    <button
                        type="submit"
                        onClick={onLogin}
                        disabled={buttonDisabled}
                        className={`px-7 py-3 rounded-xl mt-6 font-bold transition-colors duration-300 ease-in-out ${buttonDisabled ? "opacity-50 cursor-not-allowed" : `${lightTheme ? "hover:bg-gray-200" : "hover:bg-gray-600"}`} ${lightTheme ? "bg-white text-blue-500" : "bg-gray-700 text-white"}`}
                    >
                        Login
                    </button>
                    <p className="text-sm font-semibold mt-2">
                        Don&apos;t have an account?
                        <Link
                            href="/signup"
                            className={`ml-1 ${lightTheme ? "text-neutral-800" : "text-gray-300"} hover:underline`}
                        >Signup
                        </Link>
                    </p>
                    <button onClick={forgotPassword} className={`text-sm font-semibold mt-2 hover:underline ${lightTheme ? "text-neutral-800" : "text-gray-300"}`}>
                        Forgot Password?
                    </button>
                </div>
            </section>
        </>
    )
}

/*

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
                className={`bg-blue-500 my-4 text-white p-2 rounded ${buttonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
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
            <button onClick={forgotPassword} className="cursor-pointer p-2 bg-blue-500">
                Forgot Password
            </button>
        </div>

*/