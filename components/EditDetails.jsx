"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { get, set } from 'idb-keyval';
const EditDetails = ({ id, Name, Phone, Email }) => {
  const [email, setEmail] = useState(Email);
  const [phone, setPhone] = useState(Phone);
  const [name, setName] = useState(Name);
  const router = useRouter();
  const dataStorageKey = 'Itemdata';
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/details/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, phone, email }),
      });

      if (!res.ok) {
        throw new Error("Update not happened something went wrong");
      }
      const updatedData = await res.json();

      setName(updatedData.name);
      setPhone(updatedData.phone);
      setEmail(updatedData.email);

      // Update IndexedDB with the updated data
      const existingData = await get(dataStorageKey);
      const newData ={...EditDetails, data:existingData.data.map((item) =>{
     return item.id === id ? { ...item, name, phone, email } : item
    }
    )};

      await set(dataStorageKey, newData);
     const value= await get(dataStorageKey);
     const userId=value.data[0].user;
      router.push(`/dashboard/${userId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex justify-center text-lg font-semibold font-serif">
          Update YOUR DETAILS
        </div>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Name"
        />
        <input
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Phone no"
        />

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="email"
        />

        <button
          type="submit"
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        >
          Update Detail
        </button>
      </form>
    </div>
  );
};

export default EditDetails;
