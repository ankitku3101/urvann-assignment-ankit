"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Plant {
  _id: string;
  name: string;
  categories: string[];
  price: number;
  image: string;
}

export default function NewArrivals() {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plants`);
        const data = await res.json();

        const plantsArray = data.plants;

        if (Array.isArray(plantsArray)) {
          setPlants(plantsArray.slice(-3).reverse());
        } else {
          console.error("Expected plants to be an array but got:", plantsArray);
        }
      } catch (err) {
        console.error("Error fetching plants:", err);
      }
    };

    fetchPlants();
  }, []);

  return (
    <section className="container my-16 mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <button className="px-4 py-2 text-green-700 rounded-full text-sm font-medium flex items-center mx-auto border-green-900 border">
          <span>Fresh Picks</span>
          <span className="ml-2">🌱</span>
        </button>
        <h2 className="text-4xl md:text-7xl font-semibold mt-2 text-gray-800 tracking-tight" >
          New arrivals <br/> in this Week!
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3 px-6 md:px-20 border-t pt-10">
        {plants.map((plant, index) => (
          <div
            key={index}
            className="bg-[#ddfed8] rounded-xl p-6 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transition"
          >
            <span className="px-4 py-2 text-xs font-medium bg-white text-green-800 rounded-full mb-3">
              {plant.categories.join(", ")}
            </span>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {plant.name}
            </h3>

            <div className="relative">
              <Image
                src={plant.image}
                alt={plant.name}
                className="w-80 h-80 object-fit mx-auto rounded-2xl"
                width={320}
                height={260}    
              />
              <span className="absolute m-1 bottom-0 right-0 bg-white shadow px-3 py-1 rounded-full text-sm font-semibold">
                ₹{plant.price}
              </span>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
