// Import required modules
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// Load environment variables from .env file
dotenv.config();

// Set MongoDB connection URL and database name
const url = process.env.URL;
const dbName = 'DAL-E';

let client;
let carts;

// Function to open MongoDB connection
const openConnection = async () => {
  // Connect to MongoDB using the provided URL
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  // Access the specified database
  const db = client.db(dbName);
  // Access the 'Images' collection within the database
  carts = db.collection('Images');
};

// Function to generate a unique ID for a post
const generateCartId = () => uuidv4();

// Exported function to create a new post
export const createNewPost = async (name, prompt, photoUrl) => {
  try {
    // Generate a unique post ID
    const generatedId = generateCartId();
    // Open a connection to the MongoDB server
    await openConnection();
    // Insert the new post data into the 'Images' collection
    await carts.insertOne({
      postId: generatedId,
      name: name,
      prompt: prompt,
      photo: photoUrl.url,
    });
    // Find the newly inserted post in the collection
    const result = await carts.find({ cartId: generatedId }).toArray();
    // Close the MongoDB connection after 1 second
    setTimeout(() => client.close(), 1000);
    return result[0];
  } catch (e) {
    throw new Error(e.message);
  }
};

// Exported function to retrieve all posts
export const getAllPost = async () => {
  try {
    // Open a connection to the MongoDB server
    await openConnection();
    // Retrieve all posts from the 'Images' collection
    const results = await carts.find().toArray();
    // Close the MongoDB connection after 1 second
    setTimeout(() => client.close(), 1000);
    return results;
  } catch (e) {
    throw new Error(e.message);
  }
};
