'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main>
      <section className="text-center">
        <h1 className="text-5xl font-extrabold mb-4">About Us</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          At CarRentPro, we are passionate about connecting people with their perfect vehicles — whether buying or renting. Our mission is to provide a seamless and trustworthy car marketplace backed by modern technology and exceptional customer service.
        </p>
      </section>

      <section className="relative h-64 sm:h-96 rounded-lg overflow-hidden shadow-lg mx-auto max-w-4xl mt-4">
        <Image
          src="/about.png"
          alt="Our Team"
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="rounded-lg"
        />
      </section>

      <section className="space-y-6 text-center max-w-3xl mx-auto mt-4">
        <h2 className="text-3xl font-semibold">Meet the Team</h2>
        <p className="text-gray-600">
          Our diverse team of experts combines years of experience in automotive sales, tech innovation, and customer support to ensure you have the best experience possible.
        </p>
        <Link
          href="/contact"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Contact Us
        </Link>
      </section>
    </main>
  );
}
