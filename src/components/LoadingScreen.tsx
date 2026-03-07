import { useEffect, useState } from "react";

// Integrated Aura Cafe Data
const CAFE_NAME = "The Aura Cafe";
const LOADING_TAGLINE = "Preparing your peaceful retreat...";

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
    <div className="fixed inset-0 bg-pink-500 z-[9999] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Decorative Background Blurs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-400/50 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-600/50 rounded-full blur-3xl" />

      <div className="text-center relative z-10">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
          {CAFE_NAME}
        </h1>
        <p className="text-pink-100 italic text-lg md:text-xl mb-12 font-medium">
          {LOADING_TAGLINE}
        </p>
        
        {/* Progress Bar */}
        <div className="w-56 h-1.5 bg-pink-700/30 rounded-full mx-auto overflow-hidden backdrop-blur-sm shadow-inner">
          <div
            className="h-full bg-white rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
    </div>
  );
};

export default LoadingScreen;