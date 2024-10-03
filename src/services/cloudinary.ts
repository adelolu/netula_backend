import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret,
});

export const handleUpload = async (
  file: string,
  name: string,
  format?: string
) => {
  console.log(name, format);

  if (format === "doc" || format === "docx") {
    name = name.concat(".", format);
  }
  return await cloudinary.uploader
    .upload(file, {
      use_filename: true,
      resource_type: "auto",
      format,
      public_id: name,
      folder: "netula",
    })
    .catch((error) => console.log(error));
};
