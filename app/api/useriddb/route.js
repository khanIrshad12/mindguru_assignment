import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import editUserdata from "@/models/editUserdata";
import mongoose from "mongoose";
export const POST = async (req) => {
  try {
    const { email } = await req.json(); 
    await connectMongoDB();
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ userId: user._id }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while searching for the user." },
      { status: 500 }
    );
  }
};

export const GET = async (req, { params }) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    // Find user data based on the user's ID 
    const data = await editUserdata.find({
      user: new mongoose.Types.ObjectId(id),
    });
    if (data) {
      return NextResponse.json({ data }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while searching for the user." },
      { status: 500 }
    );
  }
};
