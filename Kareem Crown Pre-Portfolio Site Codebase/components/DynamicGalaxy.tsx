"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// --- CONFIGURATION ---
const STAR_COUNT = 150;
const COMET_INTERVAL_MS = 8000;
const FLARE_INTERVAL_MS = 12000;

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

interface Comet {
    id: number;
    startX: number;
    startY: number;
    angle: number;
    speed: number;
    length: number;
    thickness: number;
    color: string;
}

interface Flare {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    duration: number;
}

export const DynamicGalaxy = () => {
    const [stars, setStars] = useState<Star[]>([]);
    const [comets, setComets] = useState<Comet[]>([]);
    const [flares, setFlares] = useState<Flare[]>([]);

    const cometIdCounter = useRef(0);
    const flareIdCounter = useRef(0);

    // Initialize Static but Twinkling Starfield
    useEffect(() => {
        const generatedStars: Star[] = Array.from({ length: STAR_COUNT }).map((_, i) => {
            // Favor smaller, distant stars
            const isLarge = Math.random() > 0.9;
            return {
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: isLarge ? Math.random() * 2 + 1.5 : Math.random() * 1 + 0.5,
                duration: Math.random() * 4 + 3,
                delay: Math.random() * 5,
                opacity: Math.random() * 0.5 + 0.3,
            };
        });
        setStars(generatedStars);
    }, []);

    // Periodic Comet Spawner
    useEffect(() => {
        const spawnComet = () => {
            cometIdCounter.current += 1;
            const isLeftToRight = Math.random() > 0.5;

            const newComet: Comet = {
                id: cometIdCounter.current,
                startX: isLeftToRight ? -10 : 110,
                startY: Math.random() * 80,
                angle: isLeftToRight ? 15 + Math.random() * 30 : -15 - Math.random() * 30,
                speed: 1.5 + Math.random() * 1.5, // seconds to cross screen
                length: 10 + Math.random() * 20, // percentage of screen width
                thickness: 1 + Math.random() * 2,
                color: Math.random() > 0.7 ? '#ffffff' : '#D4AF37', // 30% chance of gold comet
            };

            setComets((prev) => [...prev, newComet]);

            // Cleanup comet after it crosses
            setTimeout(() => {
                setComets((prev) => prev.filter((c) => c.id !== newComet.id));
            }, newComet.speed * 1500);
        };

        const interval = setInterval(() => {
            if (Math.random() > 0.3) spawnComet(); // 70% chance every tick
        }, COMET_INTERVAL_MS);

        return () => clearInterval(interval);
    }, []);

    // Periodic Solar Flare Spawner
    useEffect(() => {
        const spawnFlare = () => {
            flareIdCounter.current += 1;
            const newFlare: Flare = {
                id: flareIdCounter.current,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: 30 + Math.random() * 50, // 30% to 80% screen width
                color: Math.random() > 0.5 ? 'rgba(212, 175, 55, 0.08)' : 'rgba(100, 150, 255, 0.05)',
                duration: 8 + Math.random() * 6, // 8-14 seconds
            };

            setFlares((prev) => [...prev, newFlare]);

            // Cleanup flare
            setTimeout(() => {
                setFlares((prev) => prev.filter((f) => f.id !== newFlare.id));
            }, newFlare.duration * 1000);
        };

        const interval = setInterval(() => {
            if (Math.random() > 0.5) spawnFlare();
        }, FLARE_INTERVAL_MS);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-[-50] overflow-hidden bg-transparent">

            {/* 1. TWINKLING STARFIELD */}
            {stars.map((star) => (
                <motion.div
                    key={`star-${star.id}`}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                    }}
                    initial={{ opacity: star.opacity * 0.2 }}
                    animate={{ opacity: [star.opacity * 0.2, star.opacity, star.opacity * 0.2] }}
                    transition={{
                        duration: star.duration,
                        delay: star.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* 2. SOLAR FLARES */}
            {flares.map((flare) => (
                <motion.div
                    key={`flare-${flare.id}`}
                    className="absolute rounded-full"
                    style={{
                        left: `${flare.x}%`,
                        top: `${flare.y}%`,
                        width: `${flare.size}vw`,
                        height: `${flare.size}vw`,
                        x: '-50%',
                        y: '-50%',
                        background: `radial-gradient(circle, ${flare.color} 0%, transparent 70%)`,
                        mixBlendMode: 'screen',
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1.4] }}
                    transition={{
                        duration: flare.duration,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* 3. SHOOTING COMETS */}
            {comets.map((comet) => {
                const directionMultiplier = comet.startX < 50 ? 1 : -1;
                return (
                    <motion.div
                        key={`comet-${comet.id}`}
                        className="absolute rounded-full"
                        style={{
                            left: `${comet.startX}%`,
                            top: `${comet.startY}%`,
                            width: `${comet.length}vw`,
                            height: `${comet.thickness}px`,
                            background: `linear-gradient(to ${directionMultiplier > 0 ? 'left' : 'right'}, transparent, ${comet.color})`,
                            rotate: `${comet.angle}deg`,
                            boxShadow: `0 0 ${comet.thickness * 4}px ${comet.color}`,
                        }}
                        initial={{ x: 0, opacity: 0 }}
                        animate={{
                            x: `${120 * directionMultiplier}vw`,
                            y: `${120 * directionMultiplier * Math.tan(comet.angle * Math.PI / 180)}vw`,
                            opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                            duration: comet.speed,
                            ease: "linear",
                        }}
                    />
                );
            })}
        </div>
    );
};
