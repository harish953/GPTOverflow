import React from 'react'
import Filter from './Filter'
import { AnswerFilters } from '@/constants/filters'
import { getAnswers } from '@/lib/actions/answer.action'
import Link from 'next/link'
import Image from 'next/image'
import { getTimestamp } from '@/lib/utils'
import Votes from './Votes'
import ParseHTML from './parseHTML' // @ts-ignore

interface Props {
  questionId: string
  userId: string
  totalAnswers: number
  page?: number
  filter?: string
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({
    questionId,
    sortBy: filter,
    page: page ? +page : 1,
  })

  return (
    <div className='mt-11'>
      <div className='flex items-center justify-between'>
        <h3 className='primary-text-gradient'>{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {result?.answers.map((answer) => (
          <article key={answer._id} className='light-border border-b py-10'>
            <div className='flex items-center justify-between'>
              <div
                className='mb-8 flex flex-col-reverse justify-between gap-5
              sm:flex-row sm:items-center sm:gap-2'
              >
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className='flex flex-1 items-start sm:items-center gap-1 '
                >
                  <Image
                    src={answer.author.picture}
                    className='rounded-full object-cover max-sm:mt-0.5'
                    width={18}
                    height={18}
                    alt='profile'
                  />
                  <div className='flex flex-col  sm:flex-row sm:items-center '>
                    <p className=' body-semibold text-dark300_light700'>
                      {answer.author.name}
                    </p>
                    <p className='small-regular text-dark400_light500 mt-0.5 ml-0.5 line-clamp-1'>
                      answered {getTimestamp(answer.createdAt)} ago
                    </p>
                  </div>
                </Link>
                <div className='flex justify-end '>
                  <Votes
                    type='Answer'
                    itemId={JSON.stringify(answer._id)}
                    userId={JSON.stringify(userId)}
                    upvotes={answer.upvotes.length}
                    hasupVoted={answer.upvotes.includes(userId)}
                    downvotes={answer.downvotes.length}
                    hasdownVoted={answer.downvotes.includes(userId)}
                    // hasSaved={mongoUser?.saved.includes(userId)}
                  />
                </div>
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  )
}

export default AllAnswers
