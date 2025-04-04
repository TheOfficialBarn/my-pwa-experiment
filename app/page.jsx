'use client';
import Image from "next/image";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { useRef } from "react";

function useParallax(value, distance) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

// Custom components to use in parallax sections
const Component1 = () => (
  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] mb-16">
  <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <Image
          className="dark:invert"
          src="/icon-192x192.png"
          alt="Logo"
          width={180}
          height={180}
          priority
      />
      <p className="list-inside text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          You can download website as app ✨
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              !
          </code>
      </p>
  </main>
</div>
);

const Component2 = () => (
    <div className="bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg p-6">
        <h3 className="text-white text-2xl font-bold mb-4">Component 2</h3>
        <p className="text-white">This is a custom component with some content.</p>
    </div>
);

const Component3 = () => (
    <div className="bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg flex flex-col items-center justify-center">
        <h3 className="text-white text-2xl font-bold mb-4">Component 3</h3>
        <button className="bg-white text-teal-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
            Click me
        </button>
    </div>
);

// Converted ParallaxImage to ParallaxSection to accept any component
function ParallaxSection({ id, children }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);

    return (
        <section className="img-container">
            <div ref={ref} className="content-container">
                {children}
            </div>
        </section>
    );
}

//  _   _  ____  __  __  ______ 
// | | | |/ __ \|  \/  ||  ____|
// | |_| | |  | | \  / || |__   
// |  _  | |  | | |\/| ||  __|  
// | | | | |__| | |  | || |____ 
// |_| |_|\____/|_|  |_||______|

export default function Home() {
    const { scrollYProgress } = useScroll(); // Tracks scrolling progress
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Array of components to use in the parallax sections
    const components = [
        <Component1 key="component1" />,
        <Component2 key="component2" />,
        <Component3 key="component3" />
    ];

    return (
        <div className="min-h-screen">

            {/* Parallax content */}
            <div>
                {components.map((component, index) => (
                    <ParallaxSection key={index} id={index + 1}>
                        {component}
                    </ParallaxSection>
                ))}
            </div>

            {/* Styles */}
            <style jsx global>{`
                html {
                    scroll-snap-type: y mandatory;
                }
            `}</style>
        </div>
    );
}