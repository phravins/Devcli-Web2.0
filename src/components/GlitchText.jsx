import { useState, useEffect, useCallback } from 'react';

// interface GlitchTextProps {
  text= '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

export default function GlitchText({ 
  text, 
  className = '', 
  glitchIntensity = 'medium',
  as) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const intensityMap = {
    low, duration, iterations,
    medium, duration, iterations,
    high, duration, iterations= useCallback(() => {
    if (isGlitching) return;
    
    const { duration, iterations } = intensityMap[glitchIntensity];
    setIsGlitching(true);
    
    let iteration = 0;
    const interval = setInterval(() => {
      if (iteration >= iterations) {
        setDisplayText(text);
        setIsGlitching(false);
        clearInterval(interval);
        return;
      }

      const glitched = text
        .split('')
        .map((char) => {
          if (char === ' ') return ' ';
          if (Math.random() < 0.3) {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
          return char;
        })
        .join('');

      setDisplayText(glitched);
      iteration++;
    }, duration / iterations);
  }, [text, glitchIntensity, isGlitching]);

  useEffect(() => {
    const { probability } = intensityMap[glitchIntensity];
    
    const interval = setInterval(() => {
      if (Math.random() < probability) {
        triggerGlitch();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [triggerGlitch, glitchIntensity]);

  return (
    <Component 
      className={`relative inline-block ${className}`}
      onMouseEnter={triggerGlitch}
    >
      {/* Main text */}
      <span className="relative z-10">{displayText}</span>
      
      {/* Glitch layers */}
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-0 text-terminal-red opacity-50 -translate-x-[2px]"
            aria-hidden="true"
          >
            {displayText}
          </span>
          <span 
            className="absolute top-0 left-0 text-terminal-cyan opacity-50 translate-x-[2px]"
            aria-hidden="true"
          >
            {displayText}
          </span>
        </>
      )}
    </Component>
  );
}

