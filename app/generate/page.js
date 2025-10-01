"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import NameForm from "../../components/NameForm";

export default function GeneratePage() {
  const [names, setNames] = useState([]);
  const [error, setError] = useState(null);

  const generateNames = async (formData) => {
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to generate names");
      }

      const data = await res.json();
      setNames(data.names);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-primary-50 p-4">
        <NameForm onGenerate={generateNames} />

        {error && (
          <p className="text-red-600 text-center mt-4 font-semibold">{error}</p>
        )}

        {names.length > 0 && (
          <section className="max-w-4xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {names.map((name, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow-md text-center font-semibold text-primary-800"
              >
                {name}
              </div>
            ))}
          </section>
        )}
      </main>
    </>
  );
}