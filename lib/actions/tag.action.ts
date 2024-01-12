'use server'

import Tag, { ITag } from '@/database/tag.model'
// import Tag from '@/database/tag.model'
import { connectToDatabase } from '../mongoose'
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from './shared'
import User from '@/database/user.model'
import { FilterQuery } from 'mongoose'
import Question from '@/database/question.model'

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase()

    const { userId } = params
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    // const tags = await Tag.find()

    // if (!tags) {
    //   throw new Error('Tags not found')
    // }
    return [
      { _id: '1', name: 'python' },
      { _id: '2', name: 'java' },
    ]
  } catch (error) {
    console.log(error)
    throw error
  }
}
export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase()

    const { searchQuery, page = 1, pageSize = 10 } = params
    const skipAmount = (page - 1) * pageSize

    const query: FilterQuery<typeof Tag> = {}

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, 'i') } }]
    }

    // const sortOptions = {}

    // switch (filter) {
    //   case 'popular':
    //     sortOptions = { questions: -1 }
    //     break
    //   case 'recent':
    //     sortOptions = { createdAt: -1 }
    //     break
    //   case 'name':
    //     sortOptions = { name: 1 }
    //     break
    //   case 'old':
    //     sortOptions = { createdAt: 1 }
    //     break

    //   default:
    //     break
    // }

    const totalTags = await Tag.countDocuments()

    const tags = await Tag.find(query)
      // .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)

    const isNext = totalTags > skipAmount + tags.length

    return { tags, isNext }
  } catch (error) {
    console.log(error)
    throw error
  }
}

// export async function getTagById(params: GetAllTagsParams) {
//   try {
//     connectToDatabase();

//     const { tagId } = params;
//     const tag = await Tag.findById(tagId);
//     if (!tag) {
//       throw new Error("Tag not found");
//     }
//     return { _id: 1, name: "python" };
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase()

    const { tagId, page = 1, pageSize = 10, searchQuery } = params
    const skipAmount = (page - 1) * pageSize

    const tagFilter: FilterQuery<ITag> = { _id: tagId }

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1, // +1 to check if there is next page
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerkId name picture' },
      ],
    })

    if (!tag) {
      throw new Error('Tag not found')
    }

    const isNext = tag.questions.length > pageSize

    const questions = tag.questions

    return { tagTitle: tag.name, questions, isNext }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getPopularTags() {
  try {
    connectToDatabase()
    const tags = await Tag.aggregate([
      // { $group: { _id: '$name' } },
      { $project: { name: 1, totalQuestions: { $size: '$questions' } } },
      { $sort: { totalQuestions: -1 } },
      { $limit: 5 },
    ])
    return tags
  } catch (error) {
    console.log(error)
    throw error
  }
}
