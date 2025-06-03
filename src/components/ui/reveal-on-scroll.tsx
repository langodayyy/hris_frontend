"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  animationType?:
    | "fade-in"
    | "slide-up"
    | "slide-left"
    | "slide-right"
    | "scale-in"
    | "zoom-in-rotate"
    | "custom";
  threshold?: number;
  duration?: string;
  delay?: string;
  customClasses?: string;
}

export default function RevealOnScroll({
  children,
  animationType = "slide-up",
  threshold = 0.1,
  duration = "duration-1000",
  delay = "",
  customClasses = "",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  // Variasi animasi berdasarkan animationType
  let animationClasses = "";
  switch (animationType) {
    case "fade-in":
      animationClasses = `${isVisible ? "opacity-100" : "opacity-0"}`;
      break;
    case "slide-up":
      animationClasses = `${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`;
      break;
    case "slide-left":
      animationClasses = `${
        isVisible ? "opacity-100 -translate-x-0" : "opacity-0 translate-x-10"
      }`;
      break;
    case "slide-right":
      animationClasses = `${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      }`;
      break;
    case "scale-in":
      animationClasses = `${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`;
      break;
    case "zoom-in-rotate":
      animationClasses = `${
        isVisible
          ? "opacity-100 scale-100 rotate-0"
          : "opacity-0 scale-75 -rotate-6"
      }`;
      break;
    case "custom":
      animationClasses = `${isVisible ? "opacity-100" : "opacity-0"}`;
      break;
    default:
      animationClasses = `${isVisible ? "opacity-100" : "opacity-0"}`;
  }

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${duration} ${delay} ${animationClasses} ${customClasses}`}
    >
      {children}
    </div>
  );
}
