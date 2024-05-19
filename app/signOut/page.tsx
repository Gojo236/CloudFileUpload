'use client'
import React from 'react'
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function SignOut() {
    const router = useRouter();
    const handleGoogleSignOut = () => {
        signOut();
        router.push("/")
      };
    
    const { data: session, status } = useSession();
    if (status === "unauthenticated") {
        router.push("/")
    }
      
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md text-center">
                <button
                    onClick={ ()=>handleGoogleSignOut()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default SignOut