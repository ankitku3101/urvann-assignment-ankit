
  import mongoose from "mongoose";
  import dotenv from "dotenv";
  import Plant from "../models/Plant";
  import path from "path";

  dotenv.config({ path: path.resolve(process.cwd(), ".env") });

  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/plantsdb";

  const data = [
  {
    "name": "Ficus",
    "price": 350,
    "categories": ["Indoor", "Air Purifying"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/68710d8cfd05342b0c87f011/untitled-design-640x640.png",
    "description": "Ficus is an elegant indoor plant, perfect for living rooms."
  },
  {
    "name": "Lucky Bamboo",
    "price": 220,
    "categories": ["Indoor", "Lucky Plant"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/68a6fed791b4614d08681d88/11-640x640.png",
    "description": "A low-maintenance bamboo plant believed to bring good luck."
  },
  {
    "name": "Peace Lily",
    "price": 400,
    "categories": ["Indoor", "Flowering"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/68a6feec416ea8f0d34a79a0/12-640x640.png",
    "description": "Peace Lily is known for its beautiful white flowers and air-purifying properties."
  },
  {
    "name": "Areca Palm",
    "price": 550,
    "categories": ["Indoor", "Air Purifying"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/67ea5df78529ab002bd60aa6/img_7313-640x640.jpg",
    "description": "Areca Palm adds tropical vibes and cleans the air indoors."
  },
  {
    "name": "Marigold",
    "price": 150,
    "categories": ["Flowering", "Outdoor"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/689db6472035c13f14cda753/marigold-genda-red-in-4-inch-nursery-pot-best-seller--640x640.jpg",
    "description": "Bright and cheerful marigold flowers, ideal for gardens and pots."
  },
  {
    "name": "Money Plant",
    "price": 300,
    "categories": ["Indoor", "Lucky Plant"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/684aa342922d1476eb8813e3/money-plant-green-in-4-inch-nursery-pot2-640x640.jpg",
    "description": "A symbol of prosperity, suitable for home and office decor."
  },
  {
    "name": "Spider Plant",
    "price": 200,
    "categories": ["Indoor", "Air Purifying"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/68443a1f8caa25795f26ed90/spider-plant-in-4-inch-nursery-bag-640x640.png",
    "description": "Easy-to-grow spider plant that improves indoor air quality."
  },
  {
    "name": "Snake Plant",
    "price": 350,
    "categories": ["Indoor", "Air Purifying"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/689db67911e0d0e6ded06ee4/snake-green-in-5-inch-nursery-pot-best-seller--640x640.jpg",
    "description": "Snake Plant is a hardy indoor plant that requires minimal care."
  },
  {
    "name": "Syngonium",
    "price": 300,
    "categories": ["Indoor", "Foliage Plant"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/689db4f063335f9f5e03c740/syngonium-green-white-bushy-in-4-inch-nursery-pot-640x640.jpg",
    "description": "A versatile foliage plant with attractive green and white leaves."
  },
  {
    "name": "Aparajita",
    "price": 250,
    "categories": ["Outdoor", "Flowering"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/6893236000e13d5c058ba542/aparajita-640x640.png",
    "description": "Beautiful blue flowering plant suitable for balconies and gardens."
  },
  {
    "name": "Dracaena",
    "price": 450,
    "categories": ["Indoor", "Foliage Plant"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/684bd7d955229a2e2b42244a/dracena-rosea-640x640.jpg",
    "description": "Elegant Dracaena plant that brightens up any indoor space."
  },
  {
    "name": "Raat Ki Rani",
    "price": 300,
    "categories": ["Outdoor", "Flowering"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/684435d874b974fedfdcb3da/raat-ki-rani-_-night-blooming-jasmine-in-6-inch-nursery-pot-640x640.png",
    "description": "Night-blooming jasmine with a pleasant fragrance."
  },
  {
    "name": "Brahmi",
    "price": 250,
    "categories": ["Herbal", "Indoor"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/680791bf9bdb94a776027f62/brahmi-dollar-pennywort-coin-plant-in-4-inch-nursery-640x640.jpg",
    "description": "Herbal Brahmi plant known for its medicinal properties."
  },
  {
    "name": "Curry Patta",
    "price": 180,
    "categories": ["Herbal", "Outdoor"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/682dd0f5ca5012d612ac343a/curry-patta-in-6-inch-classy-red-plastic-pot-640x640.png",
    "description": "Aromatic curry leaves plant ideal for Indian kitchens."
  },
  {
    "name": "Croton Petra",
    "price": 400,
    "categories": ["Indoor", "Foliage Plant"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/683b2aaf93531a5c9a7691b9/croton-petra-in-6-inch-nursery-pot-1-best-seller-640x640.jpg",
    "description": "Colorful foliage plant with vibrant leaves."
  },
  {
    "name": "Money Plant Golden",
    "price": 350,
    "categories": ["Indoor", "Lucky Plant"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/6801eae354aca501637eaf58/money-plant-golden-640x640.jpg",
    "description": "Golden Money Plant for prosperity and indoor decoration."
  },
  {
    "name": "Jade Plant",
    "price": 300,
    "categories": ["Indoor", "Succulent"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/68949ab1fd01e12610777a0d/jade-640x640.jpg",
    "description": "A succulent plant symbolizing good luck and wealth."
  },
  {
    "name": "Syngonium Pink",
    "price": 320,
    "categories": ["Indoor", "Foliage Plant"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/689328c51c6dbd072e6020a0/syngonium-pink-640x640.png",
    "description": "A beautiful pink variety of syngonium, perfect for indoors."
  },
  {
    "name": "Monstera",
    "price": 600,
    "categories": ["Indoor", "Foliage Plant"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/677f8d41008207003fd03a2e/monstera-updated-640x640.png",
    "description": "Iconic Monstera plant known for its large, split leaves."
  },
  {
    "name": "Red Marigold",
    "price": 150,
    "categories": ["Outdoor", "Flowering"],
    "inStock": true,
    "image": "https://www.urvann.com/s/6176774ef575bbd2b3331c8a/67768af2603efc00322f9440/red-marigold-640x640.png",
    "description": "Vibrant red marigold flowers for garden decoration."
  }
]

  async function run() {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("Connected to MongoDB");
      await Plant.deleteMany({});
      const inserted = await Plant.insertMany(data);
      console.log(`Inserted ${inserted.length} plants.`);
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }

  run();
