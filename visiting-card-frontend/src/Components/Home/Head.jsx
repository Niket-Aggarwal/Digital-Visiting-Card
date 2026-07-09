import React from 'react'

const Head = () => {
    return (
        <>
            <p className="inline-flex animate-glow rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
                🚀 Next Generation Digital Identity
            </p>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white">
                One Identity.
                <br />
                <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Every Connection.
                </span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">
                Create one modern profile that brings together your portfolio,
                social media, professional links, and contact information.
                Share a single NexLink and let people discover everything about you effortlessly.
            </p>
        </>
    )
}

export default Head
