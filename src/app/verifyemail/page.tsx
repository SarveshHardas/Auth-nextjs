"use client";

import axios from 'axios'
import React, { useEffect, useState, useCallback } from "react"
import Link from 'next/link';

export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = useCallback(async (emailToken: string) => {
        try {
            await axios.post("/api/users/verifyemail", { token: emailToken });
            setVerified(true)
        } catch (error: unknown) {
            setError(true)
            console.log((error as Error).message)
        }
    }, [])

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1] || "";
        if (urlToken.length > 0) {
            setToken(urlToken);
            verifyUserEmail(urlToken);
        }
    }, [verifyUserEmail])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl'>
                Verify Email
            </h1>
            <h2 className='bg-orange-500 p-2 text-black'>{token ? `${token}` : "no token"}</h2>
            {
                verified && (
                    <div>
                        <h2 className='text-2xl'>Email Verified</h2>
                        <Link href="/login">
                            Login
                        </Link>
                    </div>
                )
            }

            {
                error && (
                    <div>
                        <h2 className='text-2xl bg-red-500 text-black'>Error</h2>
                        <p className='text-white'>{error}</p>
                    </div>
                )
                
            }
        </div>
    )
}