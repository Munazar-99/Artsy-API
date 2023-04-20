# Artsy

Artsy is a full-stack web application that uses the DAL-E model to convert text into stunning images. Built with Next.js on the front-end and Node.js with MongoDB on the back-end, Artsy empowers you to express your creativity and share your ideas with the world. With Artsy, you can easily create beautiful, eye-catching images that capture the essence of your message and grab your audience's attention.

## Technologies Used

Artsy is built with the following technologies:

- [Next.js](https://nextjs.org/) - a React-based framework for building web applications
- [Node.js](https://nodejs.org/) - a JavaScript runtime for building server-side applications
- [MongoDB](https://www.mongodb.com/) - a NoSQL document database that provides flexible data models and scalable performance
- [DAL-E model](https://github.com/lucidrains/DALLE-pytorch) - a powerful model for generating high-quality images from textual input
- [Cloudinary](https://cloudinary.com/) - a cloud-based image and video management platform that provides powerful APIs for image processing, storage, and delivery

With Cloudinary, Artsy is able to store and process images efficiently, and deliver them to users with optimal performance.


## Front-end

The Frontend code for this project can be found at this [Repositoy](https://github.com/Munazar-99/Artsy)

The front-end of Artsy is built with Next.js, which provides server-side rendering and automatic code splitting. The front-end code is organized into several components, including:

- `pages/index.tsx`: The main page of the application,which displays the generated images
- `pages/createPost.tsx`: The page which includes the text input field and the "Generate" button

## Backend

The backend of Artsy is built with Node.js and utilizes the Express.js framework for handling HTTP requests. The API endpoints are responsible for receiving user input, processing it, and sending it to the DAL-E model for image generation.

In addition to MongoDB, Cloudinary is used for image storage and processing. Cloudinary's APIs are used to upload images from the frontend, process them as necessary, and then store them in the cloud for quick and efficient access.

Here's an example of how the backend handles image uploads using the Cloudinary API:

```javascript
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Handle image upload
app.post('/api/images', async (req, res) => {
  const { image } = req.body;

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'artsy'
    });

    res.status(200).json({
      success: true,
      data: {
        url: result.secure_url
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Unable to upload image'
    });
  }
});
```


The back-end also includes several middleware functions, including:

- `cors`: A middleware that enables cross-origin resource sharing (CORS), which allows the front-end to make requests to the back-end from a different domain.
- `body-parser`: A middleware that parses incoming request bodies in a middleware before the handlers.

## Database

The database used by Artsy is MongoDB, which stores the generated images and their associated metadata, such as the text that was used to generate the image and the time that it was generated.

## Getting Started

To get started with Artsy, follow these steps:

1. Clone this repository to your local machine.
2. Install the dependencies by running `npm install` in the root directory.
3. Start the server by running `npm run dev` in the root directory.
4. Open `http://localhost:3000` in your web browser.

## Contributing

If you would like to contribute to Artsy, please follow these steps:

1. Fork this repository to your own account.
2. Create a new branch with your changes: `git checkout -b my-feature-branch`
3. Make your changes and commit them: `git commit -am 'Add some feature'`
4. Push your changes to your branch: `git push origin my-feature-branch`
5. Create a new pull request and explain your changes.





