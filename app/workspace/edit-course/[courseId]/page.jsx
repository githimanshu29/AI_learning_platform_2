"use client";
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import CourseInfo from '../_components/CourseInfo.jsx';
import ChapterTopicList from '../_components/ChapterTopicList.jsx';
import { LoaderCircle } from 'lucide-react';

const EditCourse = ({viewCourse=false}) => {
    const {courseId} = useParams();
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState({});
    const [error, setError] = useState(null); 

    useEffect(() => {
      if (courseId) {
          GetCourseInfo();
      } else {
          setLoading(false);
          setError("No course ID provided.");
      }
  }, [courseId]); 

    const GetCourseInfo=async()=>{
      setLoading(true);
      setError(null);
      try {
          const result = await axios.get(`/api/courses?courseId=${courseId}`);
          setCourse(result.data);
      } catch (err) {
          console.error("Error fetching course:", err);
          if (axios.isAxiosError(err) && err.response && err.response.status === 404) {
              setError("Course not found. Please check the URL.");
          } else {
              setError("Failed to fetch course details.");
          }
      } finally {
          setLoading(false);
      }
    }

    if (loading) {
      return (
          <div className="flex justify-center items-center h-screen bg-slate-950">
              <LoaderCircle className="animate-spin text-teal-400 w-12 h-12" />
          </div>
      );
  }
  if (error) {
      return (
          <div className="flex justify-center items-center h-screen bg-slate-950 text-red-400 text-lg font-bold">
              {error}
          </div>
      );
  }
  if (!course || Object.keys(course).length === 0) {
      return (
          <div className="flex justify-center items-center h-screen bg-slate-950 text-slate-400">
              No course data available.
          </div>
      );
  }
  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
            <CourseInfo course={course} viewCourse={viewCourse} />
            <ChapterTopicList course={course} />
        </div>
    </div>
  )
}

export default EditCourse;
