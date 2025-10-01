"use client";

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-primary-500 text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wide hover:text-primary-200">
            BabyNameAI
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-primary-200">Home</Link>
            <Link href="/generate" className="hover:text-primary-200">Generate</Link>
            <Link href="/about" className="hover:text-primary-200">About</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary-600 px-4 pt-2 pb-4 space-y-1">
          <Link href="/" className="block py-2 hover:text-primary-200">Home</Link>
          <Link href="/generate" className="block py-2 hover:text-primary-200">Generate</Link>
          <Link href="/about" className="block py-2 hover:text-primary-200">About</Link>
        </div>
      )}
    </nav>
  )
}