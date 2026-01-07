"use client";

import { useEffect, useRef, useCallback, useState } from 'react';

/**
 * SoundManager - Signature Audio System for The Kareem Crown
 * 
 * Implements the brand's sonic identity following the MTM Brand Bible:
 * - Four-note rising arpeggio in D-minor (signature moment)
 * - Subtle digital beeps layered throughout
 * - 110 BPM tempo, 2.2 second duration for audio logo
 * 
 * The system provides:
 * - Ambient background layer (spatial presence)
 * - Interaction feedback (satisfying response)
 * - Signature moments (achievement celebration)
 * - Full user control via toggle
 */

type SoundType = 'ambient' | 'hover' | 'click' | 'signature' | 'scroll';

interface SoundManagerProps {
  enabled?: boolean;
  onToggle?: (enabled: boolean) => void;
}

// Audio context singleton
let audioContext: AudioContext | null = null;
let masterGain: GainNode | null = null;

// Sound generation functions using Web Audio API
const createOscillator = (context: AudioContext, type: OscillatorType, frequency: number, gain: number, startTime: number, duration: number) => {
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  
  // Envelope for smooth sound
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(gain * 0.3, startTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(gain * 0.01, startTime + duration);
  
  oscillator.connect(gainNode);
  gainNode.connect(masterGain!);
  
  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
  
  return { oscillator, gainNode };
};

const playNote = (context: AudioContext, note: number, startTime: number, duration: number = 0.3, gain: number = 0.5) => {
  // D-minor arpeggio notes (D3, F3, A3, D4)
  const frequencies = [146.83, 174.61, 220.00, 293.66];
  if (note >= 0 && note < frequencies.length) {
    createOscillator(context, 'sine', frequencies[note], gain, startTime, duration);
    // Layer with subtle digital beep
    createOscillator(context, 'square', frequencies[note] * 2, gain * 0.1, startTime, 0.05);
  }
};

const generateAmbientLayer = (context: AudioContext): void => {
  // Create a warm, subtle ambient pad
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  const filter = context.createBiquadFilter();
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(55, context.currentTime); // Low A
  
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(200, context.currentTime);
  filter.Q.setValueAtTime(1, context.currentTime);
  
  // Slow LFO for movement
  const lfo = context.createOscillator();
  const lfoGain = context.createGain();
  lfo.frequency.setValueAtTime(0.1, context.currentTime);
  lfoGain.gain.setValueAtTime(100, context.currentTime);
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();
  
  gainNode.gain.setValueAtTime(0, context.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.05, context.currentTime + 2);
  
  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(masterGain!);
  
  oscillator.start();
  
  // Store for cleanup
  (oscillator as unknown as { lfo?: { stop: () => void } }).lfo = lfo;
};

const generateHoverSound = (context: AudioContext): void => {
  const now = context.currentTime;
  // Subtle digital blip
  createOscillator(context, 'sine', 880, 0.3, now, 0.1);
  createOscillator(context, 'sine', 1760, 0.1, now + 0.05, 0.05);
};

const generateClickSound = (context: AudioContext): void => {
  const now = context.currentTime;
  // Satisfying mechanical click
  createOscillator(context, 'triangle', 220, 0.4, now, 0.08);
  createOscillator(context, 'sine', 440, 0.2, now + 0.02, 0.06);
  createOscillator(context, 'sine', 660, 0.1, now + 0.04, 0.04);
};

const generateSignatureSound = (context: AudioContext): void => {
  // Four-note rising arpeggio in D-minor (Brand Bible spec)
  const now = context.currentTime;
  const tempo = 110;
  const beatDuration = 60 / tempo;
  
  // D-minor arpeggio: D3 -> F3 -> A3 -> D4 (rising)
  playNote(context, 0, now, beatDuration * 0.8, 0.6);
  playNote(context, 1, now + beatDuration * 0.5, beatDuration * 0.8, 0.6);
  playNote(context, 2, now + beatDuration, beatDuration * 0.8, 0.6);
  playNote(context, 3, now + beatDuration * 1.5, beatDuration * 1.2, 0.7);
  
  // Layer with subtle digital beeps (Brand Bible spec)
  for (let i = 0; i < 4; i++) {
    createOscillator(context, 'square', 880 + (i * 220), 0.05, now + (i * beatDuration * 0.5), 0.05);
  }
};

const generateScrollSound = (context: AudioContext): void => {
  const now = context.currentTime;
  // Soft whoosh effect
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  const filter = context.createBiquadFilter();
  
  oscillator.type = 'noise'; // Approximate with low frequency sine
  oscillator.frequency.setValueAtTime(100, now);
  oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.2);
  
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(200, now);
  filter.Q.setValueAtTime(1, now);
  
  gainNode.gain.setValueAtTime(0.1, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
  
  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(masterGain!);
  
  oscillator.start(now);
  oscillator.stop(now + 0.2);
};

export default function SoundManager({ enabled = false, onToggle }: SoundManagerProps) {
  const [isEnabled, setIsEnabled] = useState(enabled);
  const ambientIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const contextRef = useRef<AudioContext | null>(null);

  // Initialize audio context
  const initAudio = useCallback(() => {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      masterGain = audioContext.createGain();
      masterGain.gain.value = 0.5;
      masterGain.connect(audioContext.destination);
    }
    
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    return audioContext;
  }, []);

  // Play a specific sound type
  const playSound = useCallback((type: SoundType) => {
    if (!isEnabled || !masterGain) return;
    
    const context = initAudio();
    
    switch (type) {
      case 'ambient':
        if (!ambientIntervalRef.current) {
          // Play ambient layer with subtle variations
          ambientIntervalRef.current = setInterval(() => {
            if (isEnabled && Math.random() > 0.7) {
              generateAmbientLayer(context);
            }
          }, 5000);
        }
        break;
      case 'hover':
        generateHoverSound(context);
        break;
      case 'click':
        generateClickSound(context);
        break;
      case 'signature':
        generateSignatureSound(context);
        break;
      case 'scroll':
        if (Math.random() > 0.8) {
          generateScrollSound(context);
        }
        break;
    }
  }, [isEnabled, initAudio]);

  // Handle enable/disable
  useEffect(() => {
    setIsEnabled(enabled);
  }, [enabled]);

  useEffect(() => {
    if (isEnabled) {
      // Start ambient layer
      const context = initAudio();
      generateAmbientLayer(context);
      
      // Play signature welcome sound after brief delay
      const welcomeTimer = setTimeout(() => {
        playSound('signature');
      }, 1000);
      
      return () => clearTimeout(welcomeTimer);
    } else {
      // Stop ambient layer
      if (ambientIntervalRef.current) {
        clearInterval(ambientIntervalRef.current);
        ambientIntervalRef.current = null;
      }
    }
  }, [isEnabled, initAudio, playSound]);

  // Expose playSound globally for use by other components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as unknown as { playSound: (type: SoundType) => void }).playSound = playSound;
    }
  }, [playSound]);

  // Handle toggle callback
  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    onToggle?.(newState);
    
    if (newState) {
      // Play activation sound
      const context = initAudio();
      createOscillator(context, 'sine', 440, 0.3, context.currentTime, 0.1);
      createOscillator(context, 'sine', 660, 0.3, context.currentTime + 0.1, 0.15);
    }
  };

  return null; // Sound manager has no visual representation
}

// Export helper functions for other components
export const playInteractionSound = (type: 'hover' | 'click' = 'hover') => {
  if (typeof window !== 'undefined') {
    const playSound = (window as unknown as { playSound: (type: SoundType) => void }).playSound;
    if (playSound) {
      playSound(type);
    }
  }
};

export const triggerSignatureMoment = () => {
  if (typeof window !== 'undefined') {
    const playSound = (window as unknown as { playSound: (type: SoundType) => void }).playSound;
    if (playSound) {
      playSound('signature');
    }
  }
};
