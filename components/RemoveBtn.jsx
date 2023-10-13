"use client";
import { HiOutlineTrash } from "react-icons/hi";

const RemoveBtn = ({ id,setData }) => {
  const deleteItem = async () => {
    try {
      const confirmed = confirm("Are You Sure");
      if (confirmed) {
        const res = await fetch(`https://mindguru-assignment-ldyghl1xw-khanirshad12.vercel.app/api/details/?id=${id}`, {
          method: "DELETE",
          cache:'no-store'
        });
        if (res.ok) {
         
          setData((preData)=>preData.data &&  preData.data.filter(item => item._id !== id));
          window.location.reload()
        }
      }
    } catch (error) {
      console.log("Removebt comp",error);
    }
  };

  return (
    <button key={id} onClick={deleteItem}>
      <HiOutlineTrash size={24} color="red" />
    </button>
  );
};

export default RemoveBtn;
