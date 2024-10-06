
import React from 'react'

const Footer = () => {

  return (
    <footer className="bg-gray-800 text-white py-6 mt-12 rounded-xl w-full shadow-lg">
      <div className="container mx-auto text-center">
        <p className="text-lg">&copy; AMDB. All rights reserved.</p>
        <p className="mt-2">
          Developed by <a href="https://github.com/Arikeola100" className="text-blue-400">Blessing Ajayi</a>
        </p>
        <p className="mt-4">
          <a href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</a> | 
          <a href="/terms-of-service" className="text-blue-400 hover:underline ml-2">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
  

}

export default Footer