import { useEffect, useRef } from "react";
/* eslint-disable  @typescript-eslint/no-explicit-any */
const BackgroundOrbs = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const orbs: any = [];
    const orbCount = 12;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createOrb = () => {
      const neonColors = [
        "rgba(58, 227, 116, 0.7)", // Neon green
        "rgba(0, 214, 255, 0.7)", // Neon cyan
        "rgba(255, 0, 198, 0.7)", // Neon magenta
        "rgba(158, 0, 255, 0.7)", // Neon purple
        "rgba(255, 223, 0, 0.7)", // Neon yellow
      ];

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100 + 20,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        blur: Math.random() * 25 + 15, // Neon glow blur
        color: neonColors[Math.floor(Math.random() * neonColors.length)],
      };
    };

    const initializeOrbs = () => {
      for (let i = 0; i < orbCount; i++) {
        orbs.push(createOrb());
      }
    };

    const drawOrb = (orb: any) => {
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      ctx.fillStyle = orb.color;
      ctx.shadowBlur = orb.blur;
      ctx.shadowColor = orb.color;
      ctx.fill();
      ctx.closePath();
    };

    const updateOrb = (orb: any) => {
      orb.x += orb.speedX;
      orb.y += orb.speedY;

      // Bounce off edges
      if (orb.x - orb.radius < 0 || orb.x + orb.radius > canvas.width) {
        orb.speedX *= -1;
      }
      if (orb.y - orb.radius < 0 || orb.y + orb.radius > canvas.height) {
        orb.speedY *= -1;
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb: any) => {
        updateOrb(orb);
        drawOrb(orb);
      });

      requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    initializeOrbs();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        filter: "blur(24px)",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        backgroundColor: "black",
      }}
    />
  );
};

export default BackgroundOrbs;
