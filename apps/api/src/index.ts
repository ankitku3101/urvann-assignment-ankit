import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Plant from "./models/Plant";

dotenv.config({ path: ".env" });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/plantsdb";

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// GET /plants - Get all plants with pagination & filters
app.get("/plants", async (req: Request, res: Response) => {
  try {
    const {
      search,
      category,
      inStock,
      minPrice,
      maxPrice,
      page = "1",
      limit = "10",
      sortBy = "name",
      order = "asc"
    } = req.query;

    const filter: any = {};

    // Search by name or category keyword
    if (search) {
      const regex = new RegExp(search.toString(), "i");
      filter.$or = [{ name: regex }, { categories: regex }];
    }

    // Filter by category
    if (category) filter.categories = category;

    // Filter by stock availability
    if (inStock !== undefined) filter.inStock = inStock === "true";

    // Filter by price range
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice.toString());
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice.toString());

    const skip = (parseInt(page.toString()) - 1) * parseInt(limit.toString());

    // Sorting
    const sort: any = {};
    sort[sortBy.toString()] = order === "asc" ? 1 : -1;

    const plants = await Plant.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit.toString()));

    const total = await Plant.countDocuments(filter);

    res.json({
      plants,
      total,
      page: parseInt(page.toString()),
      pages: Math.ceil(total / parseInt(limit.toString()))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /plants/:id - Get single plant details
app.get("/plants/:id", async (req: Request, res: Response) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ error: "Plant not found" });
    res.json(plant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /addplant - Add new plant (admin)
app.post("/addplant", async (req: Request, res: Response) => {
  try {
    const { name, price, categories, inStock, image, description } = req.body;

    if (!name || !price || !categories || inStock === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const plant = new Plant({ name, price, categories, inStock, image, description });
    const savedPlant = await plant.save();
    res.status(201).json(savedPlant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
