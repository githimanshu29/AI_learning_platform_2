"use client"
import React from 'react';
import axios from 'axios';
import EnrollCourseCard2 from './EnrolledCourseCard2';
import { toast } from 'sonner';
import { GraduationCap } from 'lucide-react';

const EnrollCourseList = ({ enrolledCourses, onDataChange }) => {
    const handleDeleteEnrolledCourse = async (enrollmentId) => {
        try {
            const response = await axios.delete('/api/delete-course', {
                data: { enrollmentId: enrollmentId }
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
    
    if (enrolledCourses.length === 0) {
        return null; // Don't show section if no enrolled courses
    }

    return (
        <div className='mt-8 mb-12'>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-lg border border-teal-500/30">
                    <GraduationCap className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                    <h2 className='font-bold text-2xl text-white'>Continue Learning</h2>
                    <p className="text-slate-400 text-sm">Pick up where you left off</p>
                </div>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {enrolledCourses.map((course) => (
                    <EnrollCourseCard2
                        course={course.courses} 
                        enrollCourse={course.enrollCourse} 
                        key={course.enrollCourse.id} 
                        onDelete={() => handleDeleteEnrolledCourse(course.enrollCourse.id)} 
                    />
                ))}
            </div>
        </div>
    )
}

export default EnrollCourseList;


