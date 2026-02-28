"use client";

import React from 'react';
import { PlayCircle, Trash, BookOpen, TrendingUp, Award } from 'lucide-react';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress";

const EnrolledCourseCard = ({ course, enrollCourse, onDelete }) => {
    if (!course || !enrollCourse) {
        return null;
    }

    const CourseJson = course.courseJson;

    const CalculatePerProgress = () => {
        if (!course?.courseContent || course.courseContent.length === 0) {
            return 0;
        }
        return Math.floor((enrollCourse?.completedChapters?.length ?? 0 / course.courseContent.length) * 100);
    };
    
    const progress = CalculatePerProgress();

    const getIconForCourse = (title) => {
        const lowerTitle = (title || "").toLowerCase();
        if (lowerTitle.includes('next.js')) return 'https://cdn.worldvectorlogo.com/logos/next-js.svg';
        if (lowerTitle.includes('python')) return 'https://cdn.worldvectorlogo.com/logos/python-5.svg';
        if (lowerTitle.includes('react')) return 'https://cdn.worldvectorlogo.com/logos/react-2.svg';
        if (lowerTitle.includes('java')) return 'https://cdn.worldvectorlogo.com/logos/java-4.svg';
        return 'https://cdn.worldvectorlogo.com/logos/artificial-intelligence-ai-5.svg';
    };

    const iconUrl = CourseJson?.image || getIconForCourse(CourseJson?.name);

    return (
        <div className="group relative w-full max-w-sm">
            <div className="relative h-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-2">
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/5 group-hover:to-cyan-500/5 transition-all duration-500" />
                
                {/* Icon badge */}
                <div className="absolute top-4 right-4 z-10 w-16 h-16 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center group-hover:scale-110 group-hover:border-teal-500/50 transition-all duration-300">
                    <img 
                        src={iconUrl} 
                        alt={`${CourseJson?.name} logo`}
                        className="w-10 h-10 object-contain"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/1e293b/ffffff?text=AI'; }}
                    />
                </div>

                {/* Content */}
                <div className="relative p-6 pt-24">
                    <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-teal-400" />
                        <span className="text-xs font-medium text-teal-400 uppercase tracking-wider">
                            In Progress
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 min-h-[3.5rem]">
                        {CourseJson?.name || "Untitled Course"}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 min-h-[2.5rem]">
                        {CourseJson?.description || "No description available."}
                    </p>

                    {/* Progress section */}
                    <div className="mb-6 pb-6 border-b border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-400">Progress</span>
                            <span className="text-sm font-semibold text-teal-400">{progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <Link href={'/workspace/view-course/' + course?.cid} className="block">
                            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25">
                                <PlayCircle className="w-4 h-4" />
                                Continue Learning
                            </button>
                        </Link>
                        
                        <button 
                            onClick={onDelete}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-red-500/10 border border-slate-700 hover:border-red-500/50 text-slate-400 hover:text-red-400 font-semibold rounded-xl transition-all duration-300"
                        >
                            <Trash className="w-4 h-4" />
                            Remove Course
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnrolledCourseCard;