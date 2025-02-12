import React, { useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);

export default function TechStack() {
  const techStackFrontend = [
    {
      name: "JavaScript",
      imageUrl: "/assets/javascript.svg",
      color: "#F7DF1E",
    },
    { name: "React", imageUrl: "/assets/react.svg", color: "#61DAFB" },
    { name: "Angular", imageUrl: "/assets/angular.svg", color: "#DD0031" },

    {
      name: "TypeScript",
      imageUrl: "/assets/typescript.svg",
      color: "#3178C6",
    },
  ];

  const techStackBackend = [
    { name: "NodeJs", imageUrl: "/assets/nodejs.svg", color: "#8CC84B" },
    { name: "Postgres", imageUrl: "/assets/postgresql.svg", color: "#336791" },
    {
      name: "Python",
      imageUrl: "/assets/python.svg",
      color: "#F7DF1E",
     
    },
    { name: "Docker", imageUrl: "/assets/docker.svg", color: "#2496ED" ,adjust: "translateY(-10px)"},
  ];

  const frontendRefs = useRef([]);
  const backendRefs = useRef([]);
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  const typeText = (text, color) => {
    const tl = gsap.timeline();
    tl.to(textRef.current, {
      duration: 0.4,
      text: "",
      ease: "power2.inOut",
      onUpdate: () => {
        textRef.current.style.color = color;
      },
    }).to(cursorRef.current, { color: color, duration: 0 }, "-=0.4");

    tl.to(textRef.current, {
      duration: 0.8,
      text,
      ease: "power2.out",
      onUpdate: () => {
        textRef.current.style.color = color;
      },
    });
  };

  const handleHover = (index, isHover, type) => {
    const refs =
      type === "frontend" ? frontendRefs.current : backendRefs.current;
    const logo = refs[index];
    if (!logo) return;

    const tl = gsap.timeline();
    const techStack =
      type === "frontend" ? techStackFrontend : techStackBackend;

    if (isHover) {
      tl.to(logo.querySelector(".glow"), {
        duration: 0.3,
        opacity: 0.4,
        scale: 1.2,
        ease: "power2.out",
      });

      tl.to(
        logo.querySelector("img"),
        {
          duration: 0.3,
          scale: 1.1,
          ease: "power2.out",
        },
        0
      );

      typeText(techStack[index].name, techStack[index].color);
    } else {
      tl.to(logo.querySelector(".glow"), {
        duration: 0.3,
        opacity: 0,
        scale: 1,
        ease: "power2.out",
      });

      tl.to(
        logo.querySelector("img"),
        {
          duration: 0.3,
          scale: 1,
          ease: "power2.out",
        },
        0
      );
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="flex space-x-8 justify-center items-center">
        {techStackFrontend.map((tech, index) => (
          <div
            key={`frontend-${index}`}
            ref={(el) => (frontendRefs.current[index] = el)}
            className="relative cursor-pointer"
            onMouseEnter={() => handleHover(index, true, "frontend")}
            onMouseLeave={() => handleHover(index, false, "frontend")}
          >
            <div
              className="glow absolute inset-0 rounded-full opacity-0 blur-md"
              style={{ backgroundColor: tech.color }}
            />
            <img
              src={tech.imageUrl}
              alt={tech.name}
              className="w-16 h-16"
              style={{
                filter: `drop-shadow(0 0 8px ${tech.color}80)`,
                transform: tech.adjust || "none",
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex space-x-8 justify-center items-center mt-6">
        {techStackBackend.map((tech, index) => (
          <div
            key={`backend-${index}`}
            ref={(el) => (backendRefs.current[index] = el)}
            className="relative cursor-pointer"
            onMouseEnter={() => handleHover(index, true, "backend")}
            onMouseLeave={() => handleHover(index, false, "backend")}
          >
            <div
              className="glow absolute inset-0 rounded-full opacity-0 blur-md"
              style={{ backgroundColor: tech.color }}
            />
            <img
              src={tech.imageUrl}
              alt={tech.name}
              className="w-16 h-16"
              style={{
                filter: `drop-shadow(0 0 8px ${tech.color}80)`,
                transform: tech.adjust || "none",
              }}
            />
          </div>
        ))}
      </div>

      <p className="text-2xl font-bold mt-6 text-white">
        My Tech Stack Includes{" "}
        <span ref={textRef} className="inline-block"></span>
        <span
          ref={cursorRef}
          className="animate-blink"
          style={{ color: "white" }}
        >
          |
        </span>
      </p>
    </div>
  );
}
