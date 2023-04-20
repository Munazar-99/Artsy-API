import Express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai'
import { v2 as cloudinary } from 'cloudinary';
import { createNewPost, getAllPost } from "./mongodb/connection.js";

dotenv.config()

const app = Express();

app.use(Express.json({ limit: '50mb' }));
app.use(Express.urlencoded({ extended: false }));
app.use(cors());


const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



app.post('/api/post', async (req, res) => {
    try {
        const { prompt } = req.body
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        })
        const image = aiResponse.data.data[0].b64_json
        return res
            .status(200)
            .json({ photo: image });
    } catch (error) {
        console.log(error?.response.data.error.message)
        return res.status(500).send(error?.response.data.error.message)
    }
});

app.get('/api/getPosts', async (req, res) => {
    try {
        const posts = await getAllPost();
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

app.post('/api/sharePosts', async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo)
        const newPost = await createNewPost(name, prompt, photoUrl)
        res.status(200).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});




app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
