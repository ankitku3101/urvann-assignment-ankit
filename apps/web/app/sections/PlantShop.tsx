"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface Plant {
  _id: string;
  name: string;
  categories: string[];
  price: number;
  image: string;
  inStock: boolean; 
}

const categories = ["Indoor", "Outdoor", "Succulent", "Flowering"];
const LIMIT = 12;

export const PlantShop = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPlantRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, page, totalPages]
  );

  const fetchPlants = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("limit", LIMIT.toString());
      if (searchTerm) queryParams.append("search", searchTerm);
      if (selectedCategory) queryParams.append("category", selectedCategory);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/plants?${queryParams.toString()}`
      );
      const data = await res.json();
      if (Array.isArray(data.plants)) {
        setPlants((prev) => [...prev, ...data.plants]);
        setTotalPages(data.pages);
      } else {
        console.error("Expected array of plants, got:", data);
      }
    } catch (err) {
      console.error("Error fetching plants:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPlants([]);
    setPage(1);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    fetchPlants();
  }, [page, searchTerm, selectedCategory]);

  return (
    <div id="products" className="container mx-auto my-16">
      <div className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-medium text-slate-800 mb-2">All Plants</h1>
        <p className="text-slate-600 mb-6 text-xl md:text-2xl">Explore our beautiful collection of plants.</p>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Plant Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-10 border-t pt-10">
        {plants.map((plant, idx) => {
          const plantCard = (
            <div
              key={idx}
              className="group bg-[#ddfed8] rounded-lg p-4 hover:shadow-xl transition-all flex flex-col"
            >
              <img
                className="rounded-lg w-full group-hover:shadow-xl hover:-translate-y-0.5 duration-300 transition-all h-80 object-cover object-top"
                src={plant.image}
                alt={plant.name}
              />
              <p className="text-sm mt-2 font-poppins">{plant.name}</p>
              <p className="text-xs text-green-600 font-poppins">
                {plant.categories.join(", ")}
              </p>
              <p className="text-xl mt-1 font-poppins">₹{plant.price}</p>
              <p className={`mt-1 font-semibold ${plant.inStock ? "text-green-600" : "text-red-600"}`}>
                {plant.inStock ? "In Stock" : "Out of Stock"}
              </p>
            </div>
          );

          if (plants.length === idx + 1) {
            return <div ref={lastPlantRef} key={plant._id}>{plantCard}</div>;
          }
          return plantCard;
        })}
      </section>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-10 h-80">
          <div className="w-12 h-12 border-4 border-green-300 border-t-green-500 rounded-full animate-spin"></div>
        </div>
      )}

      {plants.length === 0 && !loading && (
        <p className="text-gray-500 mt-4 font-poppins text-center">No plants found.</p>
      )}
    </div>
  );
}
