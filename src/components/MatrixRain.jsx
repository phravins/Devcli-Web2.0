import { useEffect, useRef, useCallback } from 'react';

export default function MatrixRain({
  opacity = 0.15,
  speed = 1,
  density = 0.95,
  color = '#3fb950'
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const dropsRef = useRef([]);
  const charsRef = useRef([]);

  const initMatrix = useCallback((canvas) => {
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize drops at random positions
    dropsRef.current = Array(columns).fill(0).map(() =>
      Math.random() * -100 // Start above screen at random heights
    );

    // Generate character set (mix of code-related symbols)
    const codeChars = '01{}[]()<>/\\|;:\'"`~!@#$%^&*+-=_.?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const japaneseChars = 'ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    charsRef.current = (codeChars + japaneseChars).split('');
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initMatrix(canvas);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 14;
    let frameCount = 0;

    const draw = () => {
      frameCount++;

      // Control speed by skipping frames
      if (frameCount % Math.max(1, Math.floor(3 / speed)) !== 0) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      // Semi-transparent black for fade effect
      ctx.fillStyle = `rgba(13, 17, 23, ${0.1 * opacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      dropsRef.current.forEach((drop, i) => {
        // Randomly skip drawing for density control
        if (Math.random() > density) return;

        const char = charsRef.current[Math.floor(Math.random() * charsRef.current.length)];
        const x = i * fontSize;
        const y = drop * fontSize;

        // Vary the color intensity
        const intensity = Math.random();
        if (intensity > 0.95) {
          ctx.fillStyle = '#ffffff'; // Bright white highlight
        } else if (intensity > 0.8) {
          ctx.fillStyle = color; // Main color
        } else {
          ctx.fillStyle = `${color}88`; // Dimmed color
        }

        ctx.fillText(char, x, y);

        // Reset drop when it reaches bottom
        if (y > canvas.height && Math.random() > 0.975) {
          dropsRef.current[i] = 0;
        }

        dropsRef.current[i]++;
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initMatrix, speed, density, opacity, color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity }}
    />
  );
}
