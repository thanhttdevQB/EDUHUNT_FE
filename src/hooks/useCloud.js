// hooks/useCloud.js
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your account details
cloudinary.config({
  cloud_name: 'du7wlrmpi',
  api_key: '848457936193612',
  api_secret: '3iY4ybzFwl5CQUv7RA4yug6_56c'
});

export async function uploadMedia(dataUrl) {
  try {
    // Assuming `dataUrl` is a valid Data URL for an image
    const response = await cloudinary.uploader.upload(dataUrl, {
      resource_type: 'auto' // Automatically detect the resource type (image, video, etc.)
    });

    const cloudUrl = response.secure_url; // Use `secure_url` to get the HTTPS URL
    console.log('Upload successful:', cloudUrl);
    return cloudUrl; // Return the URL of the uploaded file
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error; // Rethrow or handle the error appropriately
  }
}
