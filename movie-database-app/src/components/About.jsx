import React from 'react'

const About = () => {
    
        return (
          <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-gray-500">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-3xl font-bold mb-4">About AMDB</h2>
              <p className="text-gray-700">
                Welcome to AMDB (Ari Movie DataBase) ! This is a simple movie database app that allows you
                to search for your favorite movies, view details, and even save them to
                your favorites. Explore trending and latest movies, and enjoy!
              </p>
            </div>
          </div>
        );
      }
      
      export default About;
      