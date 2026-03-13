import { useEffect, useState } from "react";
import bloodImg from "@/assets/blood.png";
import bgVideo from "@/assets/scary-video.mp4";
import Lottie from "lottie-react";
import runningGhost from "@/assets/running.json";

const CAFE_NAME = "Nostalgia Cafe";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const timer = setInterval(() => {
      setProgress((prev) => {
        // Ghost ko screen ke bahar nikalne ke liye 115% tak allow kiya
        if (prev >= 115) {
          clearInterval(timer);
          setIsLoaded(true);
          setTimeout(() => {
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
            onComplete();
          }, 800);
          return 115;
        }
        return prev + 1.5; 
      });
    }, 30);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [onComplete]);

  const letters = CAFE_NAME.split("");

  return (
    <>
      <style>{`
        /* EXACT ORIGINAL CSS - NO GPU ACCELERATION INCLUDED */
        .neon-text {
          color: #fff;
          text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #dc2626, 0 0 40px #dc2626;
        }

        .scanline {
          width: 100%;
          height: 100px;
          z-index: 50;
          position: absolute;
          pointer-events: none;
          background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(220,38,38,0.05) 50%, rgba(0,0,0,0) 100%);
          animation: scan 4s linear infinite;
        }

        @keyframes scan {
          0% { top: -100px; }
          100% { top: 100vh; }
        }

        .letter-container {
          position: relative;
          display: inline-block;
        }

        .infected-text {
          color: #dc2626 !important;
          text-shadow: 0 0 15px #991b1b, 0 0 30px #450a0a !important;
          transition: color 0.1s ease-in, text-shadow 0.1s ease-in;
        }

        .real-blood-splatter {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 180px;
          height: 180px;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          filter: drop-shadow(0px 5px 5px rgba(100, 0, 0, 0.8));
          animation: realisticSplat 2s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
        }

        @keyframes realisticSplat {
          /* Using standard translate, NOT translate3d, to prevent the box artifact */
          0% { transform: translate(-50%, -50%) scale(0) rotate(var(--random-rot)); opacity: 1; }
          10% { transform: translate(-50%, -50%) scale(1.2) rotate(var(--random-rot)); opacity: 0.95; }
          100% { transform: translate(-50%, calc(-50% + 40px)) scale(1.3) rotate(var(--random-rot)); opacity: 0.8; }
        }

        /* RUNNING GHOST STYLES */
        .ghost-runner {
           position: absolute;
           bottom: 100%; 
           width: 60px; 
           height: 60px;
           transform: translateX(-50%); 
           transition: left 0.1s linear; 
           z-index: 40;
        }
      `}</style>

      <div
        className={`fixed inset-0 z-[9999] bg-[#050505] overflow-hidden flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-100"
            style={{ filter: "brightness(1) contrast(1.3)" }}
          >
            <source src={bgVideo} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-10 opacity-50" />
          <div className="absolute inset-0 bg-black/10 z-10" />
        </div>

        <div className="scanline z-20"></div>

        <div className="text-center relative z-30 w-full px-6 flex flex-col items-center">

          {/* Added mb-24 to give space for the ghost above the progress bar */}
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-widest mb-24 uppercase text-neutral-800">
            {letters.map((char, index) => {
              const triggerThreshold = (index / letters.length) * 100;
              const isBleeding = progress >= triggerThreshold;
              const randomRot = `${(index * 47) % 360}deg`;

              return (
                <span key={index} className="letter-container">
                  <span className={`relative z-10 ${isBleeding && char !== " " ? "infected-text" : (progress > 10 ? "neon-text" : "")}`}>
                    {char === " " ? "\u00A0" : char}
                  </span>

                  {/* EXACT ORIGINAL RENDER LOGIC */}
                  {isBleeding && char !== " " && (
                    <div
                      className="real-blood-splatter"
                      style={{
                        '--random-rot': randomRot,
                        backgroundImage: `url(${bloodImg})`
                      }}
                    />
                  )}
                </span>
              );
            })}
          </h1>

          <div className="w-full max-w-md relative mt-8">
            {/* Ghost Runner */}
            <div className="ghost-runner" style={{ left: `${progress}%` }}>
               <Lottie animationData={runningGhost} loop={true} />
            </div>
            
            <div className="w-full h-[2px] bg-neutral-900 rounded-full overflow-hidden relative mt-2">
              {/* Progress bar capped at 100% visually */}
              <div
                className="absolute top-0 left-0 h-full bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.9)] transition-all duration-75 ease-linear"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          <div className="mt-4 text-red-700/80 font-mono text-xs tracking-[0.3em] font-bold">
            INITIALIZING {Math.min(Math.floor(progress), 100)}%
          </div>

        </div>
      </div>
    </>
  );
};

export default LoadingScreen;