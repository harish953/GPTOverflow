"use server";

import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared";

export async function getAllTags() {
  try {
    await connectToDatabase();

    const tags = await Tag.find();

    if (!tags) {
      throw new Error("Tags not found");
    }
    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTagById(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { tagId } = params;
    const tag = await Tag.findById(tagId);
    if (!tag) {
      throw new Error("Tag not found");
    }
    return { _id: 1, name: "python" };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
