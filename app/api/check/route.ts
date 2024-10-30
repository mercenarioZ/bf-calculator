import connect from "@/app/libs/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connect();
  const { name } = await request.json();

  console.log(name);

  if (name) {
    // get information from the database
    return NextResponse.json({ message: "Information found" }); 
  } else {
    return NextResponse.json({ message: "Information not found" }, { status: 404 });
  }
}
