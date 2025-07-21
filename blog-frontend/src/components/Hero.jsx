import React from 'react'

const Hero = () => {
  return (
    <div>
        <div className="text-center py-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#3F4E4F] mb-4">
            Share. Learn. Build.
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto text-white">
            Dive into real-world coding tips, project breakdowns, and lessons
            from the dev journey.
          </p>
          <button
            className="mt-6 bg-[#2C3639] text-[#A27B5C] px-6 py-3 rounded-2xl hover:bg-[#1f2628] transition duration-300 cursor-pointer"
            onClick={() => setShowAuthModal(true)}
          >
            Start Reading
          </button>
        </div>
      
    </div>
  )
}

export default Hero
