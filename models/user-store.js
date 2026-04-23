'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },
  
  getUserById(id) {
    return this.store.findOneBy(this.collection, (user => user.id === id));
  },
  
  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, (user => user.email === email));
  },
  
  async addUser(user, file, response) {
      try {
        user.picture = await this.store.addToCloudinary(file);
        this.store.addCollection(this.collection, user);
        response();
      } catch (error) {
        logger.error("Error processing picture:", error);
        
      }
    },

};

export default userStore;
