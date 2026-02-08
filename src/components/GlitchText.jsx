import { useState, useEffect, useCallback } from 'react';

const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

const intensityMap = {
  low: { duration: 200, iterations: 5, probability: 0.05 },
  medium: { duration: 400, iterations: 10, probability: 0.1 },
  high: { duration: 600, iterations: 15, probability: 0.2 },
};

export default function GlitchText({
  text,
  className = '',
  glitchIntensity = 'medium',
  as: Component = 'span'
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const triggerGlitch = useCallback(() => {
    if (isGlitching) return;

    const { duration, iterations } = intensityMap[glitchIntensity] || intensityMap.medium;
    setIsGlitching(true);

    let iteration = 0;
    const intervalId = setInterval(() => {
      if (iteration >= iterations) {
        setDisplayText(text);
        setIsGlitching(false);
        clearInterval(intervalId);
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
    const { probability } = intensityMap[glitchIntensity] || intensityMap.medium;

    const intervalId = setInterval(() => {
      if (Math.random() < probability) {
        triggerGlitch();
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [triggerGlitch, glitchIntensity]);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  return (
    <Component
      className={`relative inline-block ${className}`}
      onMouseEnter={triggerGlitch}
    >
      <span className="relative z-10">{displayText}</span>

      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 text-terminal-red opacity-50 -translate-x-[2px] z-0"
            aria-hidden="true"
          >
            {displayText}
          </span>
          <span
            className="absolute top-0 left-0 text-terminal-cyan opacity-50 translate-x-[2px] z-0"
            aria-hidden="true"
          >
            {displayText}
          </span>
        </>
      )}
    </Component>
  );
}
