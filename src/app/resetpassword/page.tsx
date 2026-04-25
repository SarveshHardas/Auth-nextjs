"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function ResetPasswordPage() {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1] || ""
        if (urlToken) {
            setToken(urlToken)
        }
    }, [token])

    const resetUserPassword = async () => {
        try {
            await axios.post("/api/users/resetpassword", { token: token, newPassword: password });
            setSuccess(true)
            setError(false)
        } catch (error: unknown) {
            setError(true)
            setSuccess(false)
            console.log((error as Error))
        }
    }

    return (
        <div className="flex flex-col gap-4">

            <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={resetUserPassword}>
                Reset Password
            </button>

            {success && <p>
                Password reset successful.{" "}
                <Link href="/login">Login</Link>
                </p>}
            {error && <p>Reset failed</p>}

        </div>
    )
}