import axios from "axios";

const useAddImage = () => {
  const addImage = async (file) => {
    console.log("Uploading image to cloudinary...", file);
    // upload to cloudinary using axios
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "kanban");
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dwtv1wom8/image/upload`,
        data
      );

      //secure_url
      //public_id

      // Handle the response, e.g., get the URL of the uploaded image
      console.log("Upload successful", res.data);
    } catch (error) {
      console.log("Error uploading image to cloudinary", error);
    }
  };

  return { addImage };
};

export default useAddImage;
