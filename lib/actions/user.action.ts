"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

export async function getAllUsers(params: any) {
  try {
    connectToDatabase();

    const users = await User.find();

    if (!users) {
      throw new Error("Users not found");
    }
    return [{ _id: 1, name: "harish patel" }];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(params: any) {
  try {
    await connectToDatabase();

    const { userId } = params;
    console.log(userId);
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
