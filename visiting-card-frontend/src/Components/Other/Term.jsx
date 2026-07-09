import React from "react";

const TermsAndConditions = () => {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-[#08122d] to-black px-6 py-16 text-gray-300">
      <section className="mx-auto max-w-5xl rounded-2xl border border-blue-500/20 bg-slate-900/40 p-8 backdrop-blur-lg">
        <h1 className="mb-6 text-4xl font-bold text-white">
          Terms & Conditions
        </h1>
        <p className="mb-6">
          Last Updated: July 2026
        </p>
        <p className="leading-8">
          By accessing or using NexLink, you agree to comply with these Terms
          and Conditions.
        </p>
        <h2 className="mt-8 mb-3 text-2xl font-semibold text-white">
          Acceptable Use
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Provide accurate information.</li>
          <li>Do not upload harmful or illegal content.</li>
          <li>Do not misuse the platform or attempt unauthorized access.</li>
        </ul>
        <h2 className="mt-8 mb-3 text-2xl font-semibold text-white">
          User Responsibility
        </h2>
        <p className="leading-8">
          Users are responsible for the information and links they publish on
          their NexLink profile. Please ensure all shared content belongs to you
          or that you have permission to share it.
        </p>
        <h2 className="mt-8 mb-3 text-2xl font-semibold text-white">
          Availability
        </h2>
        <p className="leading-8">
          While we strive to keep NexLink available at all times, we cannot
          guarantee uninterrupted service. Maintenance or technical issues may
          occasionally affect availability.
        </p>
        <h2 className="mt-8 mb-3 text-2xl font-semibold text-white">
          Educational Purpose
        </h2>
        <p className="leading-8">
          NexLink is currently developed as an educational and portfolio
          project. Features, functionality, and policies may change as the
          platform continues to grow.
        </p>
        <h2 className="mt-8 mb-3 text-2xl font-semibold text-white">
          Changes
        </h2>
        <p className="leading-8">
          We reserve the right to modify these Terms & Conditions whenever
          necessary. Continued use of NexLink indicates acceptance of any
          updates.
        </p>
      </section>
    </main>
  );
};

export default TermsAndConditions;