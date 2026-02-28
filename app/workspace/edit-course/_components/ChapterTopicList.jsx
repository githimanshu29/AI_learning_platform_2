import { Gift, Clock, BookOpen } from 'lucide-react';
import React from 'react'

const ChapterTopicList = ({course}) => {
    const courseLayout = course.courseJson;

    const handleFinishClick = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
    };
      
  return (
    <div className="w-full">
        <div className="mb-8">
            <h2 className='font-bold text-3xl md:text-4xl text-white mb-2'>Course Roadmap</h2>
            <p className="text-slate-400">Your personalized learning path</p>
        </div>
        
        <div className='flex flex-col items-center justify-center mt-10 px-4'>
            {courseLayout?.chapters.map((chapter, chapterIndex) => (
                <div key={chapterIndex} className='flex flex-col items-center w-full max-w-4xl'>
                    {/* Chapter Card */}
                    <div className='w-full md:w-auto p-6 border-2 border-teal-500/50 shadow-xl rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white transform hover:scale-105 transition-all duration-300'>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                                Chapter {chapterIndex + 1}
                            </div>
                        </div>
                        <h2 className='font-bold text-xl md:text-2xl text-center mb-3'>{chapter.chapterName}</h2>
                        <div className='flex flex-wrap justify-center gap-4 text-sm'>
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg">
                                <Clock className="w-4 h-4" />
                                <span>{chapter?.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg">
                                <BookOpen className="w-4 h-4" />
                                <span>{chapter?.topics?.length} Topics</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Topics */}
                    <div className="w-full">
                        {chapter?.topics.map((topic, topicIndex) => (
                            <div className='flex flex-col items-center' key={topicIndex}>
                                {/* Connector Line */}
                                <div className='h-12 w-1 bg-gradient-to-b from-teal-500 to-cyan-500'></div>
                                
                                {/* Topic Node */}
                                <div className='flex items-center gap-4 md:gap-8 w-full max-w-4xl'>
                                    {/* Left side topic (even indices) */}
                                    <div className={`flex-1 text-right ${topicIndex % 2 === 0 ? 'block' : 'invisible'}`}>
                                        <div className="inline-block p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg hover:border-teal-500/50 transition-all duration-300 max-w-xs">
                                            <p className='text-white font-medium'>{topic}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Center circle */}
                                    <div className='flex-shrink-0'>
                                        <div className='w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg border-4 border-slate-900'>
                                            {topicIndex + 1}
                                        </div>
                                    </div>
                                    
                                    {/* Right side topic (odd indices) */}
                                    <div className={`flex-1 text-left ${topicIndex % 2 !== 0 ? 'block' : 'invisible'}`}>
                                        <div className="inline-block p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg hover:border-teal-500/50 transition-all duration-300 max-w-xs">
                                            <p className='text-white font-medium'>{topic}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Last topic connector and gift */}
                                {topicIndex === chapter?.topics?.length - 1 && (
                                    <>
                                        <div className='h-12 w-1 bg-gradient-to-b from-cyan-500 to-purple-500'></div>
                                        <div className='flex items-center gap-5'>
                                            <div className='p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl border-4 border-slate-900 transform hover:scale-110 transition-all duration-300'>
                                                <Gift className='w-8 h-8 text-white' />
                                            </div>
                                        </div>
                                        <div className='h-12 w-1 bg-gradient-to-b from-purple-500 to-slate-700'></div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            
            {/* Finish Button */}
            <button
                onClick={handleFinishClick}
                className='px-8 py-4 border-2 border-teal-500 shadow-xl rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-lg cursor-pointer hover:from-teal-500 hover:to-cyan-500 transform hover:scale-105 transition-all duration-300'
            >
                Back to Top
            </button>
        </div>
    </div>
  )
}

export default ChapterTopicList
