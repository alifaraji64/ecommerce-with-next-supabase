'use client'
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton,useUser } from '@clerk/nextjs'
import React from 'react'

export default function Navbar() {
    return (
        <nav className="p-4 border-b bg-blue-600 flex items-center justify-between text-white">
            <h1 className="text-2xl">Shopyy</h1>
            <SignedIn>
                <div>
                    <button className='mr-3 font-medium text-[#6c47ff] bg-white rounded-full text-sm h-10 sm:h-12 px-4 sm:visible sm:px-5 cursor-pointer'>dashboard</button>
                    <SignOutButton signOutOptions={{ redirectUrl: '/' }}>
                        <button className='font-medium text-[#6c47ff] bg-white rounded-full text-sm h-10 sm:h-12 px-4 sm:visible sm:px-5 cursor-pointer'>logout</button>
                    </SignOutButton>
                </div>
            </SignedIn>
            <SignedOut>
                <div>
                    <SignInButton mode='modal'>
                        <button className='mr-3 font-medium text-[#6c47ff] bg-white rounded-full text-sm h-10 sm:h-12 px-4 sm:visible sm:px-5 cursor-pointer'>login</button>
                    </SignInButton>
                    <SignUpButton mode='modal'>
                        <button className='font-medium text-[#6c47ff] bg-white rounded-full text-sm h-10 sm:h-12 px-4 sm:visible sm:px-5 cursor-pointer'>register</button>
                    </SignUpButton>
                </div>
            </SignedOut>

        </nav>
    )
}
