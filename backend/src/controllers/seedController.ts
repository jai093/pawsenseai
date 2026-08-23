import { Request, Response } from 'express';
import Product from '../models/Product';

// Mock dog products for testing
const mockProducts = [
  {
    name: "Premium Dog Food - Chicken & Rice",
    description: "Nutritious dry dog food with real chicken and brown rice for adult dogs",
    price: 45.99,
    category: "Food",
    image: "https://images.unsplash.com/photo-1583335098398-6735c4e9d8c3?w=300&h=300&fit=crop",
    rating: 4.5,
    stock: 50,
    brand: "PawPremium",
    weight: "5kg",
    ingredients: "Chicken, Brown Rice, Vegetables, Vitamins",
    features: ["High Protein", "Grain-Free Option", "Natural Ingredients"],
    inStock: true
  },
  {
    name: "Interactive Dog Toy Ball",
    description: "Durable rubber ball that squeaks and bounces for endless playtime",
    price: 12.99,
    category: "Toys",
    image: "https://images.unsplash.com/photo-1605641321706-3c8c6c6b8c9c?w=300&h=300&fit=crop",
    rating: 4.2,
    stock: 100,
    brand: "PlayPaws",
    weight: "150g",
    ingredients: "Natural Rubber",
    features: ["Squeaky", "Bouncy", "Non-Toxic"],
    inStock: true
  },
  {
    name: "Dog Grooming Kit",
    description: "Complete grooming set with brush, comb, nail clippers, and shampoo",
    price: 29.99,
    category: "Grooming",
    image: "https://images.unsplash.com/photo-1596424688224-7a92c4d0f5fc?w=300&h=300&fit=crop",
    rating: 4.7,
    stock: 25,
    brand: "GroomPro",
    weight: "1kg",
    ingredients: "Stainless Steel, Plastic, Natural Shampoo",
    features: ["Complete Set", "Professional Quality", "Travel Case"],
    inStock: true
  },
  {
    name: "Comfortable Dog Bed",
    description: "Orthopedic memory foam bed for joint support and comfortable sleep",
    price: 89.99,
    category: "Beds",
    image: "https://images.unsplash.com/photo-1583335098398-6735c4e9d8c3?w=300&h=300&fit=crop",
    rating: 4.8,
    stock: 15,
    brand: "SleepWell",
    weight: "3kg",
    ingredients: "Memory Foam, Washable Cover",
    features: ["Orthopedic", "Machine Washable", "Non-Slip Base"],
    inStock: true
  },
  {
    name: "Dog Training Treats",
    description: "Small, tasty treats perfect for training and rewarding good behavior",
    price: 8.99,
    category: "Treats",
    image: "https://images.unsplash.com/photo-1583335098398-6735c4e9d8c3?w=300&h=300&fit=crop",
    rating: 4.4,
    stock: 200,
    brand: "TrainTreats",
    weight: "250g",
    ingredients: "Chicken, Oats, Natural Flavors",
    features: ["Low Calorie", "Training Size", "Natural Ingredients"],
    inStock: true
  },
  {
    name: "Dog Collar and Leash Set",
    description: "Adjustable collar with matching leash for daily walks and training",
    price: 24.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1583335098398-6735c4e9d8c3?w=300&h=300&fit=crop",
    rating: 4.3,
    stock: 60,
    brand: "WalkSafe",
    weight: "300g",
    ingredients: "Nylon, Metal Hardware",
    features: ["Adjustable", "Reflective", "Padded"],
    inStock: true
  },
  {
    name: "Dog Water Fountain",
    description: "Automatic water fountain with filter to provide fresh water continuously",
    price: 39.99,
    category: "Bowls",
    image: "https://images.unsplash.com/photo-1583335098398-6735c4e9d8c3?w=300&h=300&fit=crop",
    rating: 4.6,
    stock: 30,
    brand: "FreshFlow",
    weight: "1.5kg",
    ingredients: "BPA-Free Plastic, Carbon Filter",
    features: ["Continuous Flow", "Filtered Water", "Quiet Motor"],
    inStock: true
  },
  {
    name: "Dog Crate Kennel",
    description: "Foldable metal crate for training, travel, and safe space at home",
    price: 79.99,
    category: "Crates",
    image: "https://images.unsplash.com/photo-1583335098398-6735c4e9d8c3?w=300&h=300&fit=crop",
    rating: 4.5,
    stock: 20,
    brand: "SafeHaven",
    weight: "8kg",
    ingredients: "Metal Wire, Plastic Tray",
    features: ["Foldable", "Double Door", "Easy Clean"],
    inStock: true
  }
];

export const seedProducts = async (req: Request, res: Response) => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert mock products
    const insertedProducts = await Product.insertMany(mockProducts);
    
    res.status(201).json({
      success: true,
      message: `Successfully seeded ${insertedProducts.length} products`,
      data: insertedProducts
    });
  } catch (error) {
    console.error('Error seeding products:', error);
    res.status(500).json({
      success: false,
      message: 'Error seeding products',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
