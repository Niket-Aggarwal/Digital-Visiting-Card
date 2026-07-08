import React from "react";

const PrivacyPolicy = () => {
    return (
        <main className="min-h-screen bg-linear-to-br from-slate-950 via-[#08122d] to-black px-6 py-16 text-gray-300">
            <section className="mx-auto max-w-5xl rounded-2xl border border-blue-500/20 bg-slate-900/40 p-8 backdrop-blur-lg">
                <h1 className="mb-6 text-4xl font-bold text-white">
                    Privacy Policy
                </h1>
                <p className="mb-6">
                    Last Updated: July 2026
                </p>
                <p className="leading-8">
                    Welcome to <strong className="text-blue-400">NexLink</strong>.
                    Your privacy is important to us. This platform has been built to
                    provide users with a secure and professional digital identity.
                </p>
                <h2 className="mt-8 mb-3 text-2xl font-semibold text-white">
                    Information We Collect
                </h2>
                <ul className="list-disc space-y-2 pl-6">
                    <li>Name</li>
                    <li>Email Address</li>
                    <li>Profile Picture</li>
                    <li>Phone Number (optional)</li>
                    <li>Professional & Social Links</li>
                </ul>
                <h2 className="mt-8 mb-3 text-2xl font-semibold text-white">
                    How We Use Your Data
                </h2>
                <p className="leading-8">
                    Your information is used only to create and manage your NexLink
                    profile. We do not sell or intentionally share your personal data
                    with third parties.
                </p>
                <h2 className="mt-8 mb-3 text-2xl font-semibold text-white">
                    Data Storage
                </h2>
                <p className="leading-8">
                    Your account information is securely stored. Images are managed using
                    Cloudinary, while profile information is stored in our database.
                    Passwords are never stored in plain text and are securely encrypted.
                </p>
                <h2 className="mt-8 mb-3 text-2xl font-semibold text-white">
                    Educational Project
                </h2>
                <p className="leading-8">
                    NexLink is currently an educational and portfolio project. Features,
                    policies, and services may change as the platform evolves into a
                    production-ready application.
                </p>
                <h2 className="mt-8 mb-3 text-2xl font-semibold text-white">
                    Contact
                </h2>
                <p>
                    For any questions regarding your privacy, contact us at
                    <span className="text-blue-400">
                        {" "}
                        21.xiia.niketaggarwal@gmail.com
                    </span>.
                </p>
            </section>
        </main>
    );
};

export default PrivacyPolicy;