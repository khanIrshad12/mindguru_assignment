"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    howDidYouHear: [],
    city: "Mumbai",
    state: "",
    password: "",
  });
  const { name, email, phone, gender, howDidYouHear, city, state, password } =
    formData;
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        howDidYouHear: [...formData.howDidYouHear, name],
      });
    } else {
      setFormData({
        ...formData,
        howDidYouHear: formData.howDidYouHear.filter((item) => item !== name),
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phone ||
      !formData.gender ||
      !formData.phone ||
      !formData.city ||
      !formData.state
    ) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          gender,
          city,
          howDidYouHear,
          state,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 relative">
          <input
            onChange={handleInputChange}
            name="name"
            value={formData.name}
            type="text"
            placeholder="Full Name"
          />
          <input
            onChange={handleInputChange}
            name="email"
            value={formData.email}
            type="text"
            placeholder="Email"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
          />
          <div className="w-[200px] flex flex-row justify-between gap-3 ">
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleInputChange}
            />{" "}
            Male
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleInputChange}
            />{" "}
            Female
            <input
              type="radio"
              name="gender"
              value="Others"
              onChange={handleInputChange}
            />{" "}
            Others
          </div>
          <div className="w-[200px] flex flex-row  items-center justify-between gap-3">
            <input
              type="checkbox"
              name="LinkedIn"
              checked={formData.howDidYouHear.includes("LinkedIn")}
              onChange={handleCheckboxChange}
            />{" "}
            LinkedIn
            <input
              type="checkbox"
              name="Friends"
              checked={formData.howDidYouHear.includes("Friends")}
              onChange={handleCheckboxChange}
            />{" "}
            Friends
            <input
              type="checkbox"
              name="JobPortal"
              checked={formData.howDidYouHear.includes("JobPortal")}
              onChange={handleCheckboxChange}
            />{" "}
            Job Portal
            <input
              type="checkbox"
              name="Others"
              checked={formData.howDidYouHear.includes("Others")}
              onChange={handleCheckboxChange}
            />{" "}
            Others
          </div>
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          >
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Ahmedabad">Ahmedabad</option>
          </select>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="State"
            list="stateOptions"
          />
          <datalist id="stateOptions">
            <option value="Gujarat" />
            <option value="Maharashtra" />
            <option value="Karnataka" />
          </datalist>
          <input
            onChange={handleInputChange}
            name="password"
            value={formData.password}
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
