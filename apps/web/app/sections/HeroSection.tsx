'use client';
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Square {
  id: number;
  src: string;
}

export const HeroSection = () => {
  return (
    <div id="home" className="px-10 md:px-8">
      <section className="w-full my-10 px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto bg-[#ddfed8] rounded-4xl">
        <div>
          <span className="block mb-4 text-xs md:text-sm text-[#0c3e26] font-medium">
            Explore Urvann
          </span>
          <h3 className="text-5xl md:text-7xl font-semibold tracking-tight text-[#0c3e26]">
            Bring Nature Home
          </h3>
          <p className="text-base md:text-lg text-slate-700 my-4 md:my-6 tracking-tight">
            Explore a variety of beautiful plants and flowers to brighten your
            home and garden. Quality greenery delivered to your doorstep.
          </p>
          <Link href={'#products'} className="bg-[#0c3e26] text-white font-medium py-2 px-4 transition-all hover:bg-green-600 active:scale-95 rounded-lg cursor-pointer">
            Shop Now
          </Link>
        </div>
        <ShuffleGrid />
      </section>
    </div>
  );
};

const shuffle = (array: Square[]): Square[] => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const squareData: Square[] = [
  { id: 1, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/67ea5df78529ab002bd60aa6/img_7313-640x640.jpg" },
  { id: 2, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/689b26eeaae197270cf8d9a5/img_1percent20percent20-128--640x640.jpg" },
  { id: 3, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/686e3400bc3bb3ba5aad599a/1percent20-1--640x640.jpg" },
  { id: 4, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/689c8b7b2035c13f14c9d831/1percent20-59--640x640.jpg" },
  { id: 5, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/688e1ab286914cd145ef62c8/1percent20-159--640x640.jpg" },
  { id: 6, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/68a809da82d67eb79e1380d9/1percent20-11--640x640.jpg" },
  { id: 7, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/686e33f52c14fcddb6bc9df7/1percent20-20-2--640x640.jpg" },
  { id: 8, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/689db6a51e1f0b92a576c0aa/1percent20-49--640x640.jpg" },
  { id: 9, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/67d55c428948bd003efbc256/img_4416-640x640.jpg" },
  { id: 10, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/684aa342922d1476eb8813e3/money-plant-green-in-4-inch-nursery-pot2-640x640.jpg" },
  { id: 11, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/6826f7f464a00526464da26a/marigold-genda-red-in-4-inch-nursery-pot-best-seller--640x640.jpg" },
  { id: 12, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/685665af42257125e0e8cecd/img_01percent20-254--640x640.jpg" },
  { id: 13, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/65ae07c7fe3e3f0228181cb2/206-640x640.jpg" },
  { id: 14, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/686e28618f112318f3ca3ba5/img_7602-640x640.jpg" },
  { id: 15, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/686e2de9bbe55ec68438d658/1percent20-105--640x640.jpg" },
  { id: 16, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/68038d3306438403fb27b89d/sjn5228-640x640.jpg" },
  { id: 17, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/685691a6e9ffa2c46c8bb404/278-640x640.jpg" },
  { id: 18, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/68569162f5938b969d9b44f6/1percent20-30--640x640.jpg" },
  { id: 19, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/68833a0c2115e60294de86c6/1percent20-19-1--640x640.jpg" },
  { id: 20, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/68a6fae2a207938d86e8ba5c/1percent20-59--640x640.jpg" },
  { id: 21, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/683b1cb975e05dc3b008150d/sedum-green-succulent-in-4-inch-nursery-pot-jpg-best-seller--640x640.jpg" },
  { id: 22, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/689db656938c089cf8481a65/13-640x640.jpg" },
  { id: 23, src: "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/689db64b77b87b8e3ff188a3/img_8864-640x640.jpg" },
];

const generateSquares = (): React.ReactElement[] => {
  return shuffle(squareData).map((sq: Square) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full rounded-md"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [squares, setSquares] = useState<JSX.Element[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load
    setSquares(generateSquares());
    setLoading(false);

    const shuffleSquares = () => {
      setSquares(generateSquares());
      timeoutRef.current = setTimeout(shuffleSquares, 3000);
    };

    timeoutRef.current = setTimeout(shuffleSquares, 3000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[450px] w-full">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares}
    </div>
  );
};

