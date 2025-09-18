import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";
import { uploadFileResult } from "../types/food-types";

configDotenv()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // server-side only
});

export async function uploadFile(fileBuffer: Buffer): Promise<uploadFileResult> {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "Feed_View",     // optional folder
                resource_type: "auto",    // auto-detect image/video
                use_filename: true,
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result!);
            }
        );

        stream.end(fileBuffer); // 👈 send buffer here
    });
}

export default uploadFile;