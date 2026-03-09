import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Coffee, Home } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F0FF] text-gray-800 font-sans">
      <div className="text-center px-4 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#A855F7] shadow-xl border border-[#D8B4FE]">
            <Coffee size={48} />
          </div>
        </motion.div>
        
        <motion.h1 
          className="mb-2 text-7xl md:text-9xl font-display font-bold text-gray-900 drop-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          404
        </motion.h1>
        
        <motion.h2 
          className="mb-4 text-2xl md:text-3xl font-display font-semibold text-[#A855F7]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Oops! Page off the menu
        </motion.h2>
        
        <motion.p 
          className="mb-8 text-lg text-gray-600 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Looks like the page you are looking for has been taken off the table. Don't worry, we have plenty of other delicious things to explore at Kiiza!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#CF9FFF] px-8 py-4 font-semibold text-gray-900 hover:bg-[#b07dff] hover:shadow-lg hover:shadow-purple-200 transition-all duration-300"
          >
            <Home size={18} />
            Return to Home
          </Link>
        </motion.div>

      </div>
      
      {/* Background blobs for depth */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#E9D5FF] blur-[100px] z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white blur-[100px] z-0" />
    </div>
  );
};

export default NotFound;