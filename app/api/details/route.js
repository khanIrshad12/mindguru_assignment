const { connectMongoDB } = require("@/lib/mongodb");
const { NextResponse } = require("next/server");
import editUserdata from "@/models/editUserdata";

export const POST = async (req, res) => {
  try {
    const { user, name, phone, email } = await req.json();
    await connectMongoDB();

    await editUserdata.create({ user, name, phone, email });
    return NextResponse.json({ message: "Added new Item" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectMongoDB();
    const data = await editUserdata.find();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
};

export const DELETE = async (req) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    const res = await editUserdata.findByIdAndDelete(id);
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
