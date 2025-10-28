import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';

// Load environment variables
dotenv.config();

const categories = [
  {
    name: "Technology",
    description: "Tech-related posts about programming, AI, gadgets, and software"
  },
  {
    name: "Lifestyle", 
    description: "Posts about daily life, habits, and personal development"
  },
  {
    name: "Travel",
    description: "Travel experiences, tips, and destination guides"
  },
  {
    name: "Food",
    description: "Recipes, cooking tips, and food reviews"
  },
  {
    name: "Sports",
    description: "Sports news, analysis, and athlete stories"
  },
  {
    name: "Health",
    description: "Fitness, nutrition, and wellness topics"
  },
  {
    name: "Education",
    description: "Learning resources, tutorials, and educational content"
  },
  {
    name: "Business",
    description: "Entrepreneurship, marketing, and career advice"
  }
];

const seedCategories = async () => {
  try {
    // Use the same connection as your app
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    
    // Clear existing categories (optional)
    await Category.deleteMany({});
    console.log('🗑️  Cleared existing categories');
    
    // Insert new categories
    await Category.insertMany(categories);
    console.log('✅ Categories seeded successfully');
    console.log(`📝 Added ${categories.length} categories`);
    
    // List the created categories
    const createdCategories = await Category.find();
    console.log('\n📋 Created categories:');
    createdCategories.forEach(cat => {
      console.log(`   - ${cat.name}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();