"use client"

import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import { HomeIcon, Video, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useContext } from 'react'
import YouTube from 'react-youtube';

const ChapterContent = ({courseInfo}) => {
  const {selectedChapterIndex, setSelectedChapterIndex} = useContext(SelectedChapterIndexContext)
  const courseContent = courseInfo?.courses?.courseContent;
  const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
  const content = courseContent?.[selectedChapterIndex]?.courseData?.content;

  const handlePrevious = () => {
    if (selectedChapterIndex > 0) {
      setSelectedChapterIndex(selectedChapterIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (selectedChapterIndex < courseContent?.length - 1) {
      setSelectedChapterIndex(selectedChapterIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'>
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-800/50'>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-teal-500/20 border border-teal-500/30 rounded-full text-xs font-semibold text-teal-400">
                Chapter {selectedChapterIndex + 1}
              </span>
            </div>
            <h1 className='text-2xl md:text-4xl font-bold text-white'>
              {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}
            </h1>
          </div>
          <Link href={'/workspace'}>
            <Button className='bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-slate-700/80 hover:border-teal-400 hover:text-white transition-all duration-200'>
              <HomeIcon className='h-5 w-5 mr-2'/>
              Home
            </Button>
          </Link>
        </div>

        {/* Related Videos Section */}
        {videoData && videoData.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-lg border border-teal-500/30">
                <Video className="w-5 h-5 text-teal-400" />
              </div>
              <h2 className='font-bold text-2xl text-white'>Related Videos</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
              {videoData?.map((video, index) => index < 3 && (
                <div key={index} className='group relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-lg hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-1'>
                  <YouTube
                    videoId={video?.videoId}
                    opts={{
                      width: '100%',
                      height: '250',
                    }}
                    className="w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Section */}
        <div className='space-y-6'>
          {content?.map((data, index) => (
            <div key={index} className='group relative p-6 md:p-8 bg-slate-900/70 backdrop-blur-lg border border-slate-700/50 rounded-2xl hover:border-teal-500/30 transition-all duration-300'> 
              {/* Topic header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30 flex items-center justify-center">
                  <span className="text-teal-400 font-bold">{index + 1}</span>
                </div>
                <h2 className='font-bold text-2xl text-white flex-1'>{data?.topic}</h2>
              </div>
              
              {/* Content */}
              <div 
                className='prose-styles pl-14'
                dangerouslySetInnerHTML={{__html: data?.htmlContent}}
              ></div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-800/50 gap-4">
          <Button
            onClick={handlePrevious}
            disabled={selectedChapterIndex === 0}
            className="flex items-center gap-2 px-6 py-6 bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-slate-700/80 hover:border-teal-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 rounded-xl"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline font-semibold">Previous Chapter</span>
            <span className="sm:hidden font-semibold">Previous</span>
          </Button>
          
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <CheckCircle className="w-4 h-4 text-teal-400" />
            <span>{selectedChapterIndex + 1} / {courseContent?.length}</span>
          </div>
          
          <Button
            onClick={handleNext}
            disabled={selectedChapterIndex === courseContent?.length - 1}
            className="flex items-center gap-2 px-6 py-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 rounded-xl font-semibold shadow-lg hover:shadow-teal-500/25"
          >
            <span className="hidden sm:inline">Next Chapter</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <style jsx global>{`
        .prose-styles {
          color: #d1d5db;
          line-height: 1.8;
        }
        .prose-styles h1, .prose-styles h2, .prose-styles h3, .prose-styles h4, .prose-styles h5, .prose-styles h6 {
          color: #ffffff;
          margin-bottom: 1rem;
          margin-top: 1.5rem;
          font-weight: 600;
        }
        .prose-styles h1 { font-size: 2rem; }
        .prose-styles h2 { font-size: 1.5rem; }
        .prose-styles h3 { font-size: 1.25rem; }
        .prose-styles p {
          margin-bottom: 1rem;
          color: #cbd5e1;
        }
        .prose-styles a {
          color: #2dd4bf;
          text-decoration: none;
          transition: color 0.2s;
          border-bottom: 1px solid transparent;
        }
        .prose-styles a:hover {
          color: #5eead4;
          border-bottom-color: #5eead4;
        }
        .prose-styles strong {
          color: #f1f5f9;
          font-weight: 600;
        }
        .prose-styles pre {
          background-color: #0f172a;
          color: #e2e8f0;
          padding: 1.5rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          border: 1px solid #1e293b;
          margin: 1.5rem 0;
        }
        .prose-styles code {
          background-color: #1e293b;
          color: #f1f5f9;
          padding: 0.25em 0.5em;
          margin: 0;
          font-size: 0.875em;
          border-radius: 0.375rem;
          border: 1px solid #334155;
        }
        .prose-styles pre code {
          background-color: transparent;
          padding: 0;
          border: none;
        }
        .prose-styles ul, .prose-styles ol {
          padding-left: 1.5rem;
          margin: 1rem 0;
        }
        .prose-styles li {
          margin-bottom: 0.5rem;
          color: #cbd5e1;
        }
        .prose-styles li::marker {
          color: #2dd4bf;
        }
        .prose-styles blockquote {
          border-left: 4px solid #2dd4bf;
          padding-left: 1rem;
          margin: 1.5rem 0;
          color: #94a3b8;
          font-style: italic;
          background-color: #0f172a;
          padding: 1rem;
          border-radius: 0.5rem;
        }
        .prose-styles table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }
        .prose-styles th, .prose-styles td {
          border: 1px solid #334155;
          padding: 0.75rem;
          text-align: left;
        }
        .prose-styles th {
          background-color: #1e293b;
          color: #f1f5f9;
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

export default ChapterContent;

