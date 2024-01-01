import { connectMongoDB } from "@/lib/mongodb";
import editUserdata from "@/models/editUserdata";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
export const PUT = async (req, { params }) => {
  const { id } = params;
  const { name, email, phone } = await req.json();
  await connectMongoDB();
  await editUserdata.findByIdAndUpdate(id, {
    name: name,
    email: email,
    phone: phone,
  });
  console.log("updated")
  return NextResponse.json({ message: "updated" }, { status: 200 });
};
export const GET = async (req, { params }) => {
  const { id } = params;
  await connectMongoDB();
  const data = await editUserdata.findById({ _id: new ObjectId(id) });
  return NextResponse.json({ data }, { status: 200 });
};
