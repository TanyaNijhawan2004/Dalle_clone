//create a post route to create a post and get all posts
//use cloudinary to store our images
import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import PostSchema from '../mongodb/models/post.js';

dotenv.config();
cloudinary.config({
    cloud_name:process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    api_key:process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret:process.env.REACT_APP_CLOUDINARY_SECRET 
});

router.route('/').get(async (req, res) => {
    try {
      const posts = await Post.find({});
      res.status(200).json({ success: true, data: posts });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
  });
  
  router.route('/').post(async (req, res) => {
    try {
      const { name, prompt, image} = req.body;
      const imageUrl = await cloudinary.uploader.upload(image);
  
      const newPost = await Post.create({
        name,
        prompt,
        image: imageUrl.url,
      });
  
      res.status(200).json({ success: true, data: newPost });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    }
  });
const router=express.Router();

export default router;
