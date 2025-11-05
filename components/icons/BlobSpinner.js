import React from 'react';

export default function BlobSpinner() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'blobSpin 3s ease-in-out infinite' }}
    >
      <defs>
        <style>{`
          @keyframes blobSpin {
            0% {
              transform: rotate(0deg);
            }
            50% {
              transform: rotate(180deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes blobWave {
            0%, 100% {
              d: path('M40,10 C50,8 60,15 65,25 C70,35 68,48 60,58 C52,68 38,72 28,68 C18,64 8,55 10,42 C12,30 25,12 40,10 Z');
            }
            50% {
              d: path('M40,8 C55,5 68,12 70,28 C72,45 65,55 55,62 C45,69 28,75 18,68 C8,60 5,45 8,32 C12,18 28,10 40,8 Z');
            }
          }
        `}</style>
      </defs>
      <path
        d="M40,10 C50,8 60,15 65,25 C70,35 68,48 60,58 C52,68 38,72 28,68 C18,64 8,55 10,42 C12,30 25,12 40,10 Z"
        fill="none"
        stroke="#ccd131"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ animation: 'blobWave 2s ease-in-out infinite' }}
      />
    </svg>
  );
}
