import React from 'react';

const FloatingMasks = () => {
  const masks = [
    { id: 1, size: 'w-16 h-16', delay: '0s', duration: '20s', left: '10%', top: '20%' },
    { id: 2, size: 'w-12 h-12', delay: '5s', duration: '25s', left: '80%', top: '10%' },
    { id: 3, size: 'w-20 h-20', delay: '10s', duration: '30s', left: '15%', top: '70%' },
    { id: 4, size: 'w-14 h-14', delay: '15s', duration: '22s', left: '70%', top: '60%' },
    { id: 5, size: 'w-18 h-18', delay: '8s', duration: '28s', left: '50%', top: '80%' },
    { id: 6, size: 'w-10 h-10', delay: '3s', duration: '35s', left: '90%', top: '40%' },
    { id: 7, size: 'w-22 h-22', delay: '12s', duration: '18s', left: '5%', top: '50%' },
    { id: 8, size: 'w-8 h-8', delay: '18s', duration: '26s', left: '60%', top: '15%' },
    { id: 9, size: 'w-16 h-16', delay: '6s', duration: '32s', left: '25%', top: '90%' },
    { id: 10, size: 'w-14 h-14', delay: '20s', duration: '24s', left: '85%', top: '75%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {masks.map((mask) => (
        <div
          key={mask.id}
          className={`absolute ${mask.size} opacity-10 animate-float`}
          style={{
            animationDelay: mask.delay,
            animationDuration: mask.duration,
            left: mask.left,
            top: mask.top,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full text-red-600"
          >
            {/* Traditional Sri Lankan Mask SVG */}
            <g fill="currentColor">
              {/* Mask outline */}
              <path d="M12 2C8.5 2 6 4.5 6 8v4c0 1.5.5 3 1.5 4.2L12 22l4.5-5.8c1-1.2 1.5-2.7 1.5-4.2V8c0-3.5-2.5-6-6-6z" />
              {/* Decorative elements */}
              <path d="M8 6c0-.5.5-1 1-1h6c.5 0 1 .5 1 1v1H8V6z" />
              <circle cx="10" cy="9" r="1" />
              <circle cx="14" cy="9" r="1" />
              {/* Mouth */}
              <path d="M9.5 14c0-1 1-2 2.5-2s2.5 1 2.5 2H9.5z" />
              {/* Additional decorative patterns */}
              <path d="M7 10h2v1H7zm8 0h2v1h-2z" />
              <path d="M12 4v2h-1V4h1z" />
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingMasks;