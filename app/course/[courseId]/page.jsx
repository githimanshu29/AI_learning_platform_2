"use client"

import AppHeader2 from '@/app/workspace/_components/AppHeader2'
import React, { useEffect, useState } from 'react'
import ChapterListSidebar from '../_components/ChapterListSidebar'
import ChapterContent from '../_components/ChapterContent'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const Course = () => {
    const { courseId } = useParams();
    const [courseInfo, setcourseInfo] = useState();

    useEffect(() => {
        if (courseId) {
            GetEnrollledCourseById();
        }
    }, [courseId]);

    const GetEnrollledCourseById = async () => {
        const result = await axios.get('/api/enroll-course?courseId=' + courseId);
        setcourseInfo(result.data);
    }

    return (
        <div className='flex flex-col h-screen bg-slate-950'>
            <AppHeader2 hideSidebar={true} />
            <div className='flex flex-1 overflow-hidden'>
                {/* Desktop Sidebar */}
                <div className="hidden lg:block">
                    <ChapterListSidebar courseInfo={courseInfo} />
                </div>
                
                {/* Mobile Sidebar */}
                <div className="lg:hidden fixed bottom-4 left-4 z-50">
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-teal-500/50 transition-all duration-300">
                                <Menu className="w-6 h-6" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-80 bg-slate-900 border-slate-800">
                            <ChapterListSidebar courseInfo={courseInfo} />
                        </SheetContent>
                    </Sheet>
                </div>
                
                {/* Main Content */}
                <div className="flex-1 overflow-y-auto">
                    <ChapterContent courseInfo={courseInfo} />
                </div>
            </div>
        </div>
    )
}

export default Course


