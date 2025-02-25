"use client";
import React, { useEffect, useRef } from 'react';

const FluidAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<{ x: number; y: number; vx: number; vy: number; size: number; }[]>([]);
    const mouse = useRef({ x: 0, y: 0 });
    const count = 50;
    //deltaTime
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let lastTime = 0;

        const resizeCanvas = () => {
            if (!canvas) return;

            // Get the container dimensions
            const container = canvas.parentElement;
            if (!container) return;

            // Set canvas size to match container
            const { width, height } = container.getBoundingClientRect();
            canvas.width = width;
            canvas.height = height;

            // Reinitialize particles when canvas is resized
            initParticles();
        };

        const initParticles = () => {
            if (!canvas) return;
            particles.current = Array.from({ length: count }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: 0,
                vy: 0,
                size: Math.random() * 2 + 2,
            }));
        };

        const animate = (timestamp: number) => {

            lastTime = timestamp;

            if (!ctx || !canvas) return;

            // Clear the canvas with slight transparency
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach(particle => {
                // Add mouse influence
                const dx = mouse.current.x - particle.x;
                const dy = mouse.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 200;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    particle.vx += (dx / distance) * force * 0.2;
                    particle.vy += (dy / distance) * force * 0.2;
                }

                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Apply friction
                particle.vx *= 0.95;
                particle.vy *= 0.95;

                // Keep particles within bounds
                if (particle.x < 0) {
                    particle.x = 0;
                    particle.vx *= -0.5;
                }
                if (particle.x > canvas.width) {
                    particle.x = canvas.width;
                    particle.vx *= -0.5;
                }
                if (particle.y < 0) {
                    particle.y = 0;
                    particle.vy *= -0.5;
                }
                if (particle.y > canvas.height) {
                    particle.y = canvas.height;
                    particle.vy *= -0.5;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(64, 128, 255, 0.6)';
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // Event listeners
        const handleMouseMove = (e: MouseEvent) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            mouse.current = {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY
            };
        };

        // Initialize
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove); // Changed to window
        animationFrameId = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: 'rgba(0, 0, 0, 0.5)' }}
        />
    );
};

const HomeSection = () => {
    return (
        <section id="home" className="relative min-h-screen overflow-hidden">
            <div className="relative w-full h-full">
                <FluidAnimation />
                <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                            Welcome to AI Social Tools
                        </h2>
                        <p className="text-xl md:text-2xl mb-8 text-gray-300">
                            Empower your business with AI-driven solutions for content creation, trend analysis, and automated responses.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <a
                                href="#features"
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
                            >
                                Explore Features
                            </a>
                            <a
                                href="#contact"
                                className="px-8 py-3 border border-white hover:bg-white hover:text-black rounded-full transition-colors text-white"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeSection;