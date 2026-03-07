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
    <div className="flex min-h-screen items-center justify-center bg-pink-50 text-gray-800">
      <div className="text-center px-4">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-pink-500 shadow-md border border-pink-100">
            <Coffee size={48} />
          </div>
        </motion.div>
        
        <motion.h1 
          className="mb-2 text-7xl md:text-9xl font-display font-bold text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          404
        </motion.h1>
        
        <motion.h2 
          className="mb-4 text-2xl md:text-3xl font-display font-semibold text-pink-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Oops! Page off the menu
        </motion.h2>
        
        <motion.p 
          className="mb-8 text-lg text-gray-500 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Looks like the page you are looking for has been taken off the table. Don't worry, we have plenty of other delicious things to explore at The Aura Cafe!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-500 px-8 py-4 font-semibold text-white hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
          >
            <Home size={18} />
            Return to Home
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default NotFound;