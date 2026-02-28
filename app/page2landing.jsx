// "use client";


// import React, { useEffect, useRef } from 'react';
// import { BrainCircuit, ArrowRight, Zap, BookOpen, Target } from 'lucide-react';
// import Link from 'next/link';

// // Helper function to create a particle for the background animation
// const createParticle = (canvas) => {
//     const size = Math.random() * 1.5 + 1;
//     return {
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: Math.random() * 0.3 - 0.15,
//         vy: Math.random() * 0.3 - 0.15,
//         size: size,
//         maxSize: size * 1.5,
//         minSize: size * 0.5,
//         growing: true,
//     };
// };

// // Background Canvas Animation Component
// const AnimatedBackground = () => {
//     const canvasRef = useRef(null);
//     const particlesRef = useRef([]);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         let animationFrameId;

//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
            
//             // Re-initialize particles on resize for responsiveness
//             particlesRef.current = [];
//             const particleCount = Math.floor((canvas.width * canvas.height) / 20000); // Adjust density based on screen size
//             for (let i = 0; i < Math.max(50, particleCount); i++) { 
//                 particlesRef.current.push(createParticle(canvas));
//             }
//         };

//         const animate = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             const particles = particlesRef.current;

//             // Update and draw pulsating particles
//             particles.forEach(p => {
//                 p.x += p.vx;
//                 p.y += p.vy;

//                 if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
//                 if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

//                 if (p.growing) {
//                     p.size += 0.02;
//                     if (p.size >= p.maxSize) p.growing = false;
//                 } else {
//                     p.size -= 0.02;
//                     if (p.size <= p.minSize) p.growing = true;
//                 }

//                 ctx.beginPath();
//                 ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//                 ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'; // A professional blue color
//                 ctx.fill();
//             });

//             // Draw subtle connection lines between nearby particles
//             ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
//             ctx.lineWidth = 0.5;
//             for (let i = 0; i < particles.length; i++) {
//                 for (let j = i + 1; j < particles.length; j++) {
//                     const dx = particles[i].x - particles[j].x;
//                     const dy = particles[i].y - particles[j].y;
//                     const distance = Math.sqrt(dx * dx + dy * dy);

//                     if (distance < 180) { // Connection distance
//                         ctx.beginPath();
//                         ctx.moveTo(particles[i].x, particles[i].y);
//                         ctx.lineTo(particles[j].x, particles[j].y);
//                         ctx.stroke();
//                     }
//                 }
//             }

//             animationFrameId = requestAnimationFrame(animate);
//         };

//         window.addEventListener('resize', resizeCanvas);
//         resizeCanvas();
//         animate();

//         return () => {
//             window.removeEventListener('resize', resizeCanvas);
//             cancelAnimationFrame(animationFrameId);
//         };
//     }, []);

//     return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
// };


// // Main Page Component
// export default function Landingpage() {
//     const handleExploreClick = () => {
//         // This would typically navigate to another page in a real Next.js app
//         // For example, using Next's router: router.push('/dashboard')
//         console.log("Navigating to the main app...");
//     };

//     return (
//         <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gray-50 text-gray-800 overflow-hidden font-sans">
//             <AnimatedBackground />

//             <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 text-center">
//                 <div className="w-full p-8 md:p-12 bg-white/60 backdrop-blur-lg border border-gray-200/80 rounded-2xl shadow-xl shadow-gray-300/30">
                    
//                     <div className="flex justify-center mb-6">
//                         <BrainCircuit className="w-16 h-16 text-blue-500" strokeWidth={1.5} />
//                     </div>

//                     <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
//                         Unlock Your Potential
//                     </h1>

//                     <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-600 md:text-xl">
//                         Our AI crafts personalized learning journeys from any topic. Go from curious to capable, faster than ever before.
//                     </p>

//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto text-left">
//                         <div className="flex items-start space-x-4">
//                             <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
//                                 <Zap className="w-6 h-6 text-blue-600" />
//                             </div>
//                             <div>
//                                 <h3 className="font-semibold text-gray-800">Dynamic Curriculum</h3>
//                                 <p className="text-gray-500 text-sm">Instantly generate structured courses on any subject.</p>
//                             </div>
//                         </div>
//                         <div className="flex items-start space-x-4">
//                             <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
//                                 <BookOpen className="w-6 h-6 text-blue-600" />
//                             </div>
//                             <div>
//                                 <h3 className="font-semibold text-gray-800">Interactive Modules</h3>
//                                 <p className="text-gray-500 text-sm">Engage with content that adapts to your learning style.</p>
//                             </div>
//                         </div>
//                         <div className="flex items-start space-x-4">
//                             <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
//                                 <Target className="w-6 h-6 text-blue-600" />
//                             </div>
//                             <div>
//                                 <h3 className="font-semibold text-gray-800">Personalized Paths</h3>
//                                 <p className="text-gray-500 text-sm">Follow a learning roadmap built specifically for your goals.</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex justify-center">
//                         <Link href="/workspace">
//                          <button
//                             onClick={handleExploreClick}
//                             className="flex items-center justify-center w-full sm:w-auto px-10 py-4 font-semibold text-white transition-all duration-300 ease-in-out rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-blue-500/20 cursor-pointer"
//                         >
//                             Explore & Learn
//                             <ArrowRight className="w-5 h-5 ml-3" />
//                         </button>
//                         </Link>
//                     </div>
//                 </div>

//                 <footer className="mt-12 text-center">
//                     <p className="text-sm text-gray-500">Powered by cutting-edge AI technology.</p>
//                 </footer>
//             </main>
//         </div>
//     );
// }


"use client";
import logo from '../public/logo.svg'
import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowRight, Zap, Youtube, Target, BookOpen, Rocket, Brain, Video } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Floating particles background
const FloatingParticles = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-20 animate-float"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${10 + Math.random() * 20}s`
                    }}
                />
            ))}
        </div>
    );
};

export default function Landingpage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const features = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Instant Generation",
            description: "AI builds complete courses in seconds"
        },
        {
            icon: <Video className="w-6 h-6" />,
            title: "Video Integration",
            description: "Curated YouTube content for each topic"
        },
        {
            icon: <BookOpen className="w-6 h-6" />,
            title: "Rich Content",
            description: "Comprehensive written materials"
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: "Personalized Paths",
            description: "Custom learning roadmaps"
        }
    ];

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
            {/* Animated gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
            
            <FloatingParticles />

            {/* Navbar */}
            <nav className="relative z-50 w-full px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Image src={logo} alt='Logo' width={140} height={140} className="brightness-110" />
                    <Link href="/workspace">
                        <button className="group relative px-6 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 overflow-hidden">
                            <span className="relative z-10 text-sm font-medium">Launch App</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
                <div className="text-center space-y-8">
                    {/* Floating icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 animate-float">
                        <Brain className="w-10 h-10 text-teal-400" />
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                        <span className="block bg-gradient-to-r from-white via-teal-100 to-cyan-100 bg-clip-text text-transparent">
                            Learn Anything
                        </span>
                        <span className="block bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mt-2">
                            With AI Power
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed">
                        Transform any topic into a comprehensive course with AI-generated content, curated videos, and personalized learning paths.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <Link href="/workspace">
                            <button className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full font-semibold text-white shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/40 transition-all duration-300 hover:scale-105">
                                <span className="flex items-center gap-2">
                                    Start Learning Free
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </Link>
                        <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                            Watch Demo
                        </button>
                    </div>
                </div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl text-teal-400 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                                    <p className="text-sm text-slate-400">{feature.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
                    <p className="text-slate-400 text-lg">Three simple steps to start learning</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { step: "01", title: "Choose Topic", desc: "Enter any subject you want to master" },
                        { step: "02", title: "AI Generates", desc: "Our AI creates a complete course structure" },
                        { step: "03", title: "Start Learning", desc: "Dive into your personalized curriculum" }
                    ].map((item, index) => (
                        <div key={index} className="relative">
                            <div className="text-center space-y-4">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-2xl font-bold">
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-bold">{item.title}</h3>
                                <p className="text-slate-400">{item.desc}</p>
                            </div>
                            {index < 2 && (
                                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-teal-500/50 to-transparent" />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 mt-32">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-400 text-sm">© 2024 Course-AI. Powered by AI.</p>
                        <div className="flex gap-6">
                            <Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">About</Link>
                            <Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Contact</Link>
                            <Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy</Link>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    25% { transform: translateY(-20px) translateX(10px); }
                    50% { transform: translateY(-10px) translateX(-10px); }
                    75% { transform: translateY(-15px) translateX(5px); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.1); }
                }
                .animate-float {
                    animation: float 20s ease-in-out infinite;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

