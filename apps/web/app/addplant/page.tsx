'use client';

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-hot-toast";

const categoriesOptions = ["Indoor", "Outdoor", "Succulent", "Flowering"];

export default function AddPlantPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [inStock, setInStock] = useState(true);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!price) newErrors.price = "Price is required";
    else if (isNaN(Number(price)) || Number(price) <= 0)
      newErrors.price = "Price must be a positive number";
    if (categories.length === 0) newErrors.categories = "Select at least one category";
    if (image && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(image))
      newErrors.image = "Image must be a valid URL ending with jpg/jpeg/png/webp/gif";
    if (description && description.length > 300)
      newErrors.description = "Description cannot exceed 300 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addplant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: parseFloat(price),
          categories,
          inStock,
          image,
          description,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      toast.success("Plant added successfully!");
      setName("");
      setPrice("");
      setCategories([]);
      setInStock(true);
      setImage("");
      setDescription("");
      setErrors({});
    } catch (err: any) {
      toast.error(err.message);
    }

    setLoading(false);
  };

  const toggleCategory = (category: string) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start py-3 px-4 sm:px-6 lg:px-8">
      
      {/* Auth Notice */}
      <div className="w-full mb-4 text-center">
        <p className="text-sm text-red-600">
          Ideally this route should be protected by auth and middlewares for admin. Couldn't implement due to time constraints.
        </p>
      </div>

      <div className="max-w-lg w-full max-h-screen overflow-auto space-y-6 bg-[#ddfed8] p-10 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold text-[#0c3e26] text-center mb-4">Add New Plant</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <Label className="mb-1">Name</Label>
            <Input
              type="text"
              placeholder="Plant Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Price */}
          <div>
            <Label className="mb-1">Price (₹)</Label>
            <Input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
          </div>

          {/* Categories */}
          <div>
            <Label className="mb-1">Categories</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {categoriesOptions.map((cat) => (
                <Button
                  type="button"
                  key={cat}
                  variant={categories.includes(cat) ? "default" : "outline"}
                  onClick={() => toggleCategory(cat)}
                  className={`rounded-full px-4 py-1 text-sm ${
                    categories.includes(cat)
                      ? "bg-[#0c3e26] text-white hover:bg-green-800"
                      : "bg-white text-[#0c3e26] border border-[#0c3e26] hover:bg-[#0c3e26] hover:text-white cursor-pointer"
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </div>
            {errors.categories && <p className="text-red-600 text-sm mt-1">{errors.categories}</p>}
          </div>

          {/* In Stock */}
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={inStock}
              onCheckedChange={(checked) => setInStock(!!checked)}
            />
            <Label className="mb-1">In Stock</Label>
          </div>

          {/* Image */}
          <div>
            <Label className="mb-1">Image URL</Label>
            <Input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}
          </div>

          {/* Description */}
          <div>
            <Label className="mb-1">Description</Label>
            <Textarea
              placeholder="Plant Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0c3e26] hover:bg-green-700 text-white py-3 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Plant"}
          </Button>
        </form>

        <div className="text-center mt-4">
          <Link href="/" className="text-[#0c3e26] underline font-medium hover:text-green-700">
            &larr; Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
