import React from 'react'

export default function Navbar() {
    return (
        <nav className="p-4 border-b bg-blue-600 flex items-center justify-between text-white">
            <h1 className="text-2xl">Shopyy</h1>
            <div>
                <button className="border-2 border-white p-1 cursor-pointer">Sign In</button>
                <button className="border-2 border-white p-1 cursor-pointer ml-2">Register</button>
            </div>
        </nav>
    )
}
