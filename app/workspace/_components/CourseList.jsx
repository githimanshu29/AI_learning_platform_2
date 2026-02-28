"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import AddNewCourseDialog from "./AddNewCourseDialog";
import CourseCard2 from './CourseCard2'
import { Plus, BookOpen } from 'lucide-react'
import { toast } from 'sonner';
import axios from 'axios';

const CourseList = ({ courseList, onDataChange }) => {
    const handleCourseEnrolled = () => {
        onDataChange();
    };

    const DeleteCourse = async(courseId) => {
        try {
            const response = await axios.delete('/api/delete-unenrolled-course', {
                data: { courseId}
            });

            if (response.data.success) {
                toast.success("Course deleted successfully!");
                onDataChange();
            } else {
                toast.error("Failed to delete course on the server.");
            }
        } catch (error) {
            console.error('An error occurred during deletion:', error);
            toast.error('Failed to delete course. Please try again.');
        }
    };

    if (courseList?.length === 0) {
        return (
            <div className='flex p-10 items-center justify-center flex-col border border-slate-700/50 rounded-2xl mt-8 bg-slate-900/30 backdrop-blur-sm'>
                <div className="p-6 bg-slate-800/50 rounded-full mb-4">
                    <BookOpen className="w-16 h-16 text-slate-500" />
                </div>
                <h2 className='my-2 text-xl font-bold text-white'>No courses created yet</h2>
                <p className="text-slate-400 mb-6 text-center max-w-md">
                    Start your learning journey by creating your first AI-powered course
                </p>
                <AddNewCourseDialog>
                    <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 px-8 py-6 rounded-xl shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105">
                        <Plus className="w-5 h-5 mr-2" />
                        Create Your First Course
                    </Button>
                </AddNewCourseDialog>
            </div>
        );
    }

    return (
        <div className='mt-12'>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className='font-bold text-3xl text-white mb-2'>Your Courses</h2>
                    <p className="text-slate-400">Manage and generate content for your courses</p>
                </div>
                <AddNewCourseDialog>
                    <Button className="bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-slate-700/80 hover:border-teal-400 hover:text-white transition-all duration-200">
                        <Plus className="w-4 h-4 mr-2" />
                        New Course
                    </Button>
                </AddNewCourseDialog>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {courseList.map((course, index) => (
                    <div key={index} className="flex justify-center w-full">
                        <CourseCard2
                            course={course}
                            onEnrollSuccess={handleCourseEnrolled} 
                            onDelete={() => DeleteCourse(course.cid)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CourseList;

