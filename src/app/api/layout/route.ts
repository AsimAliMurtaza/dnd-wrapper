import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/utils/mongodb";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const name = "asim";
    const user = await User.findOne({ name: name });
    if (!user) {
      return NextResponse.json({ layout: [] });
    }
    return NextResponse.json({ layout: user.layout });
  } catch (error) {
    console.error("Error fetching layout:", error);
    return NextResponse.json({ layout: [] }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const name = "asim";
    const user = await User.findOne({ name: name });
    if (!user) {
      return NextResponse.json({ status: 404 });
    }
    const { layout } = await request.json();
    const updatedUser = await User.findOneAndUpdate(
      { name: name },
      { layout: layout },
      { new: true }
    );
    return NextResponse.json({ updatedUser, status: 200 });
  } catch (error) {
    console.error("Error connecting to database:", error);
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }
}
