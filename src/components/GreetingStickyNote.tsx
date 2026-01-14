"use client";

import { useEffect, useState } from "react";

const COLORS = [
  "#BAE6FD", // blue
  "#BBF7D0", // green
  "#E9D5FF", // purple
  "#FEF08A", // yellow
  "#FECACA", // red
  "#FED7AA", // orange
];

export function GreetingStickyNote() {
  const [greeting, setGreeting] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [bgColor, setBgColor] = useState(COLORS[0]);

  useEffect(() => {
    // Set random color
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setBgColor(randomColor);

    const hours = new Date().getHours();
    let message = "Hi!";

    if (hours < 12) {
      message = "Good morning!";
    } else if (hours < 18) {
      message = "Good afternoon!";
    } else {
      message = "Good evening!";
    }

    setGreeting(message);
    
    // Small delay to ensure the initial "hidden" state is rendered first for the transition to work
    const timer = setTimeout(() => {
        setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`absolute left-30 top-[-5px] md:left-40 md:top-2 transform rotate-6 p-3 pt-5 pb-5 shadow-md w-32 md:w-40 font-patrick text-base leading-tight text-black z-20 transition-all duration-700 ease-out origin-bottom-left
        ${isVisible ? "opacity-100 scale-100 translate-y-0 rotate-6" : "opacity-0 scale-50 translate-y-4 rotate-0"}`}
      style={{ 
        clipPath: "polygon(0% 0%, 100% 0%, 100% 90%, 95% 100%, 0% 100%)",
        backgroundColor: bgColor
      }}
    >
      <span className="block transform -rotate-1">
        {greeting} :)
      </span>
    </div>
  );
}
