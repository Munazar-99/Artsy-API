import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config()

const url = process.env.URL
const dbName = 'DAL-E';

let client;
let carts;

const openConnection = async () => {
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const db = client.db(dbName);
  carts = db.collection('Images');
};

const generateCartId = () => uuidv4();

export const createNewPost = async (name, prompt, photoUrl) => {
  try {
    const generatedId = generateCartId();
    await openConnection();
    await carts.insertOne({
      postId: generatedId,
      name: name,
      prompt: prompt,
      photo: photoUrl.url,
    });
    const result = await carts.find({ cartId: generatedId }).toArray();
    setTimeout(() => client.close(), 1000);
    return result[0];
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getAllPost = async () => {
  try {
    await openConnection();
    const results = await carts.find().toArray();
    setTimeout(() => client.close(), 1000);
    return results;
  } catch (e) {
    throw new Error(e.message);
  }
};

