import React from "react";

const FloatingDoodles = () => {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Curved arrow */}
      <svg
        className="absolute top-24 -left-10 h-24 w-24 doodle animate-float-slow"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 60 C 40 20, 80 20, 110 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M92 50 L110 60 L96 74" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Idea (lightbulb) */}
      <svg
        className="absolute right-10 top-1/3 h-24 w-24 doodle animate-float-slower"
        viewBox="0 0 64 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M32 8c14 0 24 12 24 24 0 9-5 16-12 20-2 1-3 3-3 5v4H23v-4c0-2-1-4-3-5C13 48 8 41 8 32 8 20 18 8 32 8Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M26 72h12M24 76h16M22 84h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>

      {/* Hash symbol */}
      <svg
        className="absolute bottom-16 left-1/3 h-16 w-16 doodle animate-float-slow"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18 10 L46 10 M18 30 L46 30 M26 2 L26 38 M38 2 L38 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default FloatingDoodles;
