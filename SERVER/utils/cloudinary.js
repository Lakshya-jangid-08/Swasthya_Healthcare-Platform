import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECERET
}); 


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) {
            console.log("could not find path !");
            return null;   
        }

        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type : "auto"
        })

        console.log("file uploaded successfully at cloudinary !", res.url);
        fs.unlinkSync(localFilePath) 
        
        return res;

    } catch(err) {
        fs.unlinkSync(localFilePath)   // remove locally saved temp file, upload oper failed
        return null;
    }
}

export {uploadOnCloudinary}