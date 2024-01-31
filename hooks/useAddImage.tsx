import axios from "axios";
import { addImageLocal } from "state";
import { useDispatch, useSelector } from "react-redux";
import { useEditTaskMutation } from "state/api";

const useAddImage = () => {
  const dispatch = useDispatch();
  const [editTask] = useEditTaskMutation();
  const { _id } = useSelector((state: any) => state.global.highlightedCard);

  const addImage = async ({ file, imageUrl }) => {
    // upload to cloudinary using axios
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "kanban");

    try {
      dispatch(
        addImageLocal({
          imageUrl,
        })
      );
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dwtv1wom8/image/upload`,
        data
      );

      // get secure_url and public_id from res
      // const image = {
      //   url: res.data.secure_url,
      //   id: res.data.public_id,
      // };

      await editTask({
        taskId: _id,
        imageUrl: res.data.secure_url,
        imageId: res.data.public_id,
      });
    } catch (error) {
      console.log("Error uploading image to cloudinary", error);
    }
  };

  return { addImage };
};

export default useAddImage;
