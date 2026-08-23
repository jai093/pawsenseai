import type { Product } from '../types';

export const mockProducts: Product[] = [
  // Premium Dog Food
  {
    id: "1",
    name: "Royal Canin Maxi Adult Dog Food",
    description: "High-quality, veterinarian-recommended formula for adult large breed dogs. Contains essential nutrients for joint health and optimal digestion.",
    price: 170,
    category: "Food" as const,
    image: "https://www.petkonnect.in/cdn/shop/products/PK2022MaxiAdult5_-1.jpg?v=1735906717&width=823",
    rating: 4.5,
    stock: 45,
    brand: "Royal Canin",
    weight: "3kg",
    ingredients: "Chicken, Rice, Wheat, Maize, Animal Fats, Beet Pulp, Fish Oil, Vitamins & Minerals",
    features: ["Breed-Specific Formula", "Joint Support", "Digestive Health", "Veterinarian Recommended"],
    inStock: true
  },
  {
    id: "2",
    name: "Drools Absolute Performance Dog Food",
    description: "Major Indian brand offering high-performance dry food for active dogs. Enriched with antioxidants and prebiotics for optimal health.",
    price: 1140,
    category: "Food" as const,
    image: "https://thepetproject.com/cdn/shop/files/Drools-Adult-Optimum-Performance-Dog-Food-10kg-front_e9ac073f-8898-4e97-b986-f7a77e5d945b.jpg?v=1765372833",
    rating: 4.3,
    stock: 60,
    brand: "Drools",
    weight: "4kg",
    ingredients: "Chicken, Lamb, Rice, Wheat, Maize, Chicken Fat, Beet Pulp, Omega Fatty Acids",
    features: ["High Protein", "Performance Formula", "Indian Brand", "Antioxidant Rich"],
    inStock: true
  },
  
  // Natural Treats
  {
    id: "3",
    name: "Dogsee Chew Hard Bar - Yak Cheese",
    description: "Natural, long-lasting dental chews made from hardened yak/cow milk cheese from the Himalayas. 100% natural and preservative-free.",
    price: 284,
    category: "Treats" as const,
    image: "https://thepetproject.com/cdn/shop/files/Dogsee-Chew-Bars-130g-Front_f8f0bf99-1be9-44d3-8a1d-ae8d9216249e.jpg?v=1765373482",
    rating: 4.9,
    stock: 80,
    brand: "Dogsee Chew",
    weight: "100g",
    ingredients: "Yak Milk, Cow Milk, Salt, Lime Juice",
    features: ["Natural Himalayan Cheese", "Long-Lasting", "Dental Health", "Preservative Free"],
    inStock: true
  },
  {
    id: "4",
    name: "Dogsee Chew Mini Pops - Training Treats",
    description: "Freeze-dried fruit and vegetable treats perfect for training. Small, bite-sized treats with natural flavors.",
    price: 199,
    category: "Treats" as const,
    image: "https://thepetproject.com/cdn/shop/files/Dogsee-Chew-Mini-Pops-Coconut-70g-Front_7a18f5a5-dda4-4c2b-b88c-fa782a353124.jpg?v=1765373493",
    rating: 4.8,
    stock: 120,
    brand: "Dogsee Chew",
    weight: "50g",
    ingredients: "Freeze-Dried Fruits & Vegetables, Natural Flavors",
    features: ["Training Size", "Natural Ingredients", "Low Calorie", "Highly Motivating"],
    inStock: true
  },
  
  // Grooming Products
  {
    id: "5",
    name: "M-Pets Bamboo Slicker Brush",
    description: "Eco-friendly bamboo handle slicker brush for deshedding, removing tangles, and promoting a healthy coat. Gentle on skin.",
    price: 502,
    category: "Grooming" as const,
    image: "https://thepetproject.com/cdn/shop/files/M-Pets-Bamboo-Slicker-Brush-M-Displayed_2ff2838b-0652-4ac5-89ab-483c1e9680d7.jpg?v=1765374958",
    rating: 4.7,
    stock: 35,
    brand: "M-Pets",
    weight: "150g",
    ingredients: "Bamboo Handle, Stainless Steel Pins, Rubber Base",
    features: ["Eco-Friendly", "Deshedding", "Tangle Removal", "Gentle on Skin"],
    inStock: true
  },
  {
    id: "6",
    name: "Himalaya Erina Shampoo - Anti-Tick & Flea",
    description: "Natural shampoo with coconut and aloe vera for protection against ticks and fleas while keeping coat clean and shiny.",
    price: 500,
    category: "Grooming" as const,
    image: "https://m.media-amazon.com/images/I/416yMnE6rWL._SY300_SX300_QL70_FMwebp_.jpg",
    rating: 4.2,
    stock: 50,
    brand: "Himalaya",
    weight: "200ml",
    ingredients: "Coconut Oil, Aloe Vera, Neem, Tulsi, Natural Extracts",
    features: ["Anti-Tick & Flea", "Natural Ingredients", "pH Balanced", "Coat Shine"],
    inStock: true
  },
  
  // Health Supplements
  {
    id: "7",
    name: "Drools Absolute Multivitamin Supplement",
    description: "Chewable multivitamin tablets to support overall immunity, energy, and nervous system function for dogs of all ages.",
    price: 625,
    category: "Food" as const,
    image: "https://cdn.dotpe.in/longtail/store-items/1320730/kohcFo7q.webp",
    rating: 4.6,
    stock: 40,
    brand: "Drools",
    weight: "60 tablets",
    ingredients: "Vitamins A, D, E, B Complex, Calcium, Phosphorus, Zinc, Selenium",
    features: ["Complete Multivitamin", "Immunity Boost", "Energy Support", "Chewable Tablets"],
    inStock: true
  },
  {
    id: "8",
    name: "Himalaya Furglow Skin & Coat Supplement",
    description: "Rich tonic with Omega fatty acids to promote a soft, shiny coat and healthy skin. Ideal for all dog breeds.",
    price: 442,
    category: "Food" as const,
    image: "https://m.media-amazon.com/images/I/71fzIyjLAxL.jpg",
    rating: 4.5,
    stock: 30,
    brand: "Himalaya",
    weight: "200ml",
    ingredients: "Omega 3 & 6 Fatty Acids, Biotin, Zinc, Vitamin E, Natural Oils",
    features: ["Skin & Coat Health", "Omega Rich", "Shiny Coat", "Natural Formula"],
    inStock: true
  },
  
  // Beds
  {
    id: "9",
    name: "Guru Orthopedic Mattress Dog Bed",
    description: "Comfortable, supportive bed with orthopedic foam filling for joint support. Available in multiple sizes for all breeds.",
    price: 2250,
    category: "Beds" as const,
    image: "https://5.imimg.com/data5/SELLER/Default/2025/1/479160530/QF/DN/SN/237464200/boujee-dog-mattress-250x250.png",
    rating: 4.3,
    stock: 20,
    brand: "Guru",
    weight: "2.5kg",
    ingredients: "Orthopedic Foam, Fiber Filling, Washable Cover, Non-Slip Base",
    features: ["Orthopedic Support", "Washable Cover", "Multiple Sizes", "Joint Relief"],
    inStock: true
  },
  
  // Toys
  {
    id: "10",
    name: "KONG Classic Rubber Toy",
    description: "Durable natural rubber toy with spot for stuffing treats. Provides mental enrichment and satisfies chewing instincts.",
    price: 825,
    category: "Toys" as const,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnMbF5AIJyNkqxABg0xfopOznO8vx5XqONmw&s",
    rating: 4.5,
    stock: 55,
    brand: "KONG",
    weight: "250g",
    ingredients: "Natural Rubber, Non-Toxic Materials",
    features: ["Durable Rubber", "Treat Stuffing", "Mental Enrichment", "Chewing Satisfaction"],
    inStock: true
  },
  {
    id: "11",
    name: "Barkbutler Rubber Chew Toy",
    description: "Tough rubber chew toy designed for aggressive chewers. Helps with dental health and reduces destructive chewing.",
    price: 375,
    category: "Toys" as const,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl8Z7eKt0P_-Pr-Pw0cWEJL42OUwdA_zAlOw&s",
    rating: 4.1,
    stock: 70,
    brand: "Barkbutler",
    weight: "180g",
    ingredients: "Natural Rubber, Food-Grade Colors",
    features: ["Tough Chew Toy", "Dental Health", "Aggressive Chewers", "Non-Toxic"],
    inStock: true
  },
  
  // Accessories
  {
    id: "12",
    name: "Petex K9 Adjustable Harness",
    description: "Nylon/Polyester harness with reflective and padded features. Provides better control and reduces neck strain.",
    price: 875,
    category: "Accessories" as const,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTWYJp8M3ReJEhTiPGdHgarNnzF1RMnwCBvwCmVXSepAoK5HTBMbARgfL0Mhvdcgeds2yIG6-mucM4ZXxYTq5-_r_P6WT2vU-fs2OvYcwVE2AuVDYwmzrBq0GBEqZPYyb8tq5O2g9sX&usqp=CAc",
    rating: 4.7,
    stock: 45,
    brand: "Petex K9",
    weight: "200g",
    ingredients: "Nylon, Polyester, Reflective Strips, Padded Chest",
    features: ["Reflective", "Padded Comfort", "Better Control", "Neck Strain Reduction"],
    inStock: true
  },
  {
    id: "13",
    name: "Petshop7 Collar & Leash Combo",
    description: "Basic daily essentials made of durable nylon with reflective features for safety during walks.",
    price: 340,
    category: "Accessories" as const,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8q7_QNAdWOVISESRgIIfcQSc_rStUoecDQ&s",
    rating: 4.2,
    stock: 80,
    brand: "Petshop7",
    weight: "250g",
    ingredients: "Durable Nylon, Reflective Strips, Metal Hardware",
    features: ["Combo Set", "Reflective Safety", "Durable", "Daily Use"],
    inStock: true
  },
  
  // Bowls
  {
    id: "14",
    name: "Durapet Non-Tip Stainless Steel Bowl",
    description: "Durable, anti-skid stainless steel bowl for hygiene and longevity. Double-walled design keeps food fresh longer.",
    price: 305,
    category: "Bowls" as const,
    image: "https://m.media-amazon.com/images/I/71vdikQWfPL._AC_UF350,350_QL80_.jpg",
    rating: 4.7,
    stock: 60,
    brand: "Durapet",
    weight: "300g",
    ingredients: "Stainless Steel, Anti-Skid Rubber Base",
    features: ["Non-Tip Design", "Stainless Steel", "Hygienic", "Durable"],
    inStock: true
  },
  
  // Medical
  {
    id: "15",
    name: "Simparica TRIO Chewable Tablets",
    description: "Veterinary-prescribed oral chewables for month-long protection against fleas, ticks, heartworm, and intestinal parasites.",
    price: 650,
    category: "Food" as const,
    image: "https://www.loyalpetzone.com/wp-content/uploads/2023/02/zoetis-simparica-trio-dogs-India.jpg",
    rating: 4.9,
    stock: 25,
    brand: "Simparica",
    weight: "3 tablets",
    ingredients: "Sarolaner, Moxidectin, Pyrantel, Beef Flavoring",
    features: ["Month-Long Protection", "Broad Spectrum", "Veterinary Prescription", "Chewable"],
    inStock: true
  }
];

export const categories = ["Food", "Toys", "Grooming", "Beds", "Treats", "Accessories", "Bowls"];
