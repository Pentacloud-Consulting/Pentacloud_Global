"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import SplashAnimation from "./SplashAnimation";

export default function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [splashDone, setSplashDone] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only show splash on the root homepage. Skip on all other routes, or if already played this session.
    if (pathname !== '/' || sessionStorage.getItem('splash_shown')) {
      setSplashDone(true);
    }
  }, [pathname]);

  const handleComplete = () => {
    sessionStorage.setItem('splash_shown', 'true');
    setSplashDone(true);
  };

  // We want to immediately check local storage to prevent flicker if splash already done
  // However, local storage is only available on the client side.
  // The layout will render the server content immediately.
  // So the best way is to let SplashAnimation cover the screen.
  // The prompt suggests rendering children invisible until splash is done.
  // To avoid hydration mismatch, we can just use SplashAnimation overlay.
  // SplashAnimation handles the "skip if already shown" logic.
  // When it skips, it calls onComplete() instantly.

  return (
    <>
      {!splashDone && <SplashAnimation onComplete={handleComplete} />}
      <div
        className={`w-full flex-grow flex flex-col transition-opacity duration-700 ${
          splashDone ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        {children}
      </div>
    </>
  );
}
