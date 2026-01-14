"use client";

import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GreetingStickyNote } from "@/components/GreetingStickyNote";
import { useEffect, useState, useRef } from "react";

const DISCORD_ID = "1453546388691484755";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsVisible(true);

    const fetchInitialStatus = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const data = await response.json();
        if (data.success && data.data.discord_status === "online") {
          setIsOnline(true);
        }
      } catch (error) {
        console.error("Failed to fetch initial status:", error);
      }
    };

    fetchInitialStatus();

    const connectLanyard = () => {
      const socket = new WebSocket("wss://api.lanyard.rest/socket");
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("Lanyard WebSocket Connected");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const { op, t, d } = data;

        // Handle Hello (Opcode 1) - Setup Heartbeat AND Subscribe
        if (op === 1) {
          const interval = d.heartbeat_interval;
          if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);
          
          heartbeatIntervalRef.current = setInterval(() => {
            if (socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify({ op: 3 }));
            }
          }, interval);

          // Send Initialize (Opcode 2) AFTER receiving Hello
          socket.send(
            JSON.stringify({
              op: 2,
              d: { subscribe_to_id: DISCORD_ID },
            })
          );
        }

        // Handle Init State (Opcode 0, Event "INIT_STATE")
        if (op === 0 && t === "INIT_STATE") {
          // Check if d is the user object directly or keyed by ID
          const user = d[DISCORD_ID] || d;
          setIsOnline(user?.discord_status === "online");
        }

        // Handle Presence Update (Opcode 0, Event "PRESENCE_UPDATE")
        if (op === 0 && t === "PRESENCE_UPDATE") {
           // Lanyard sends the full new state for the user in PRESENCE_UPDATE
           setIsOnline(d.discord_status === "online");
        }
      };

      socket.onclose = () => {
        console.log("Lanyard WebSocket Closed");
        if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);
        // Try to reconnect after a delay
        setTimeout(connectLanyard, 5000);
      };
    };

    connectLanyard();

    return () => {
      if (socketRef.current) socketRef.current.close();
      if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen p-8 md:p-24 bg-white text-black font-sans">
      <main className="max-w-3xl">
        <div className="relative mb-8">
          <div className="flex items-start">
            <div 
              className={`relative z-10 transition-all duration-700 ease-out transform
                ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"}`}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-[#FFDCA9]">
                 <Image 
                   src="/pfp.png"
                   alt="Kunal avatar" 
                   width={160} 
                   height={160}
                   className="object-cover w-full h-full"
                   priority
                 />
              </div>
            </div>
            
            <GreetingStickyNote />
          </div>
        </div>

        <div className={`transition-all duration-700 delay-100 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          
          <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOnline ? "max-h-10 opacity-100 mb-2" : "max-h-0 opacity-0 mb-0"}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Currently Online
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-patrick mb-6 mt-2 md:mt-2">Kunal Sharma</h1>

          <p className="text-base md:text-lg leading-relaxed max-w-xl mb-10 font-medium">
            18-year-old software engineer. I build software and experiment with ideas, documenting the work along the way. Always open to working on projects. For work inquiries, contact{" "}
            <a href="mailto:hello@kunalsh.com" className="inline-flex items-center group border-b border-black hover:opacity-70 transition-opacity">
              hello@kunalsh.com
              <span className="w-0 overflow-hidden opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300 ease-in-out ml-0 group-hover:ml-1">
                <Mail className="w-4 h-4" />
              </span>
            </a>.
          </p>

          <ul className="space-y-3 text-base">
            <li className="group">
              <Link href="/work" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
                <span className="border-b border-transparent group-hover:border-black transition-colors">
                  projects & work experience
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
