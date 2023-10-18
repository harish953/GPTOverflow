"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from "./shared";
import { revalidatePath } from "next/cache";
import path from "path";
import { NextResponse } from "next/server";
import Question from "@/database/question.model";

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

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const users = await User.create(userData);

    if (!users) {
      throw new Error("Users not found");
    }
    return [{ _id: 1, name: "harish patel" }];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();
    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }
    // Delete users questions, answers and comments from database
    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      _id
    );
    await Question.deleteMany({ author: userQuestionIds._id });

    // TODO: delete all answers,comments, etc of user

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
