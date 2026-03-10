import { useEffect, useState } from "react";

// Integrated Nostalgia Cafe Data
const CAFE_NAME = "Nostalgia Cafe";
const LOADING_TAGLINE = "Lighting the floating candles...";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // ✅ BLOCK SCROLL ON MOUNT
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            // ✅ UNBLOCK SCROLL ON COMPLETE
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
            onComplete();
          }, 200);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearInterval(timer);
      // ✅ SAFETY CLEANUP
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#FCF9F9] z-[9999] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Decorative Background Blurs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F0E6E8] rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FDF8F9] rounded-full blur-3xl opacity-80" />

      <div className="text-center relative z-10">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-stone-700 mb-3 tracking-tight">
          {CAFE_NAME}
        </h1>
        <p className="text-[#C597A6] italic text-lg md:text-xl mb-12 font-medium">
          {LOADING_TAGLINE}
        </p>
        
        {/* Progress Bar */}
        <div className="w-56 h-1.5 bg-[#F0E6E8] rounded-full mx-auto overflow-hidden shadow-inner">
          <div
            className="h-full bg-[#D4A5B4] rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
    </div>
  );
};

export default LoadingScreen;