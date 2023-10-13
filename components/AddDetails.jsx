"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AddDetails({id}) {
  const { data: session } = useSession();
  //const user = session?.user?.email;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("");
 
  const user=id
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      alert("name and email and phone no are required.");
      return;
    }

    try {
      const res = await fetch("https://mindguru-assignment-ldyghl1xw-khanirshad12.vercel.app/api/details", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ user, name, email, phone }),
      });

      if (res.ok) {
        router.push(`/dashboard/${user}`);
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    
    <div className="flex felx-col justify-center  mt-10 h-screen ">
      <form onSubmit={handleSubmit} className="flex flex-col  gap-3">
      <div className="flex justify-center text-lg font-semibold font-serif">ADD YOUR DETAILS</div>
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
          Add Detail
        </button>
      </form>
    </div>
    </>
  );
}
