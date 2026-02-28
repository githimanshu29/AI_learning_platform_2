"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { LoaderCircle, PlayCircle, Settings, Trash2, BookOpen, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'sonner';

const CourseCard = ({ course, onEnrollSuccess, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const Course = course?.courseJson;
  const courseHasContent = course?.courseContent?.length > 0;

  const getIconForCourse = (title) => {
    const lowerTitle = (title || "").toLowerCase();
    if (lowerTitle.includes('next.js')) return 'https://cdn.worldvectorlogo.com/logos/next-js.svg';
    if (lowerTitle.includes('python')) return 'https://cdn.worldvectorlogo.com/logos/python-5.svg';
    if (lowerTitle.includes('react')) return 'https://cdn.worldvectorlogo.com/logos/react-2.svg';
    if (lowerTitle.includes('java')) return 'https://cdn.worldvectorlogo.com/logos/java-4.svg';
    return 'https://cdn.worldvectorlogo.com/logos/artificial-intelligence-ai-5.svg';
  };

  const iconUrl = Course?.image || getIconForCourse(Course?.name);

  const onEnrollCourse = async () => {
    try {
      setLoading(true);
      const result = await axios.post('/api/enroll-course', {
        courseId: course?.cid,
      });

      if (result.data.res) {
        toast.warning('Already enrolled in this course');
      } else {
        toast.success("Successfully enrolled in course!");
        if (onEnrollSuccess) {
          onEnrollSuccess();
        }
      }
    } catch (e) {
      toast.error("Error enrolling in course. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative w-full max-w-sm">
      {/* Card */}
      <div className="relative h-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-2">
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/5 group-hover:to-cyan-500/5 transition-all duration-500" />
        
        {/* Icon badge */}
        <div className="absolute top-4 right-4 z-10 w-16 h-16 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center group-hover:scale-110 group-hover:border-teal-500/50 transition-all duration-300">
          <img 
            src={iconUrl} 
            alt={`${Course?.name} logo`}
            className="w-10 h-10 object-contain"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/1e293b/ffffff?text=AI'; }}
          />
        </div>

        {/* Content */}
        <div className="relative p-6 pt-24">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-medium text-teal-400 uppercase tracking-wider">
              {Course?.level || 'Beginner'}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 min-h-[3.5rem]">
            {Course?.name || "Untitled Course"}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 min-h-[4rem]">
            {Course?.description || "No description available."}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-400">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">{Course?.noOfChapters || 0} Chapters</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">2h</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {courseHasContent ? (
              <Button
                onClick={onEnrollCourse}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25"
              >
                {loading ? (
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Enroll Now
                  </>
                )}
              </Button>
            ) : (
              <Link href={`/workspace/edit-course/${course?.cid}`} className="flex-1">
                <Button className="w-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-teal-500/50 text-white font-semibold rounded-xl transition-all duration-300">
                  <Settings className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              </Link>
            )}
            
            <Button
              onClick={onDelete}
              variant="ghost"
              className="px-3 hover:bg-red-500/10 hover:text-red-400 border border-slate-700 hover:border-red-500/50 rounded-xl transition-all duration-300"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;