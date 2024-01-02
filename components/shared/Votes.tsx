'use client'
import { formatAndDivideNumber } from '@/lib/utils'
import Image from 'next/image'
import React, { useEffect } from 'react'

import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action'
import { usePathname, useRouter } from 'next/navigation'

import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action'
import { toggleSaveQuestion } from '@/lib/actions/user.action'
import { ViewQuestion } from '@/lib/actions/interaction.action'
interface Props {
  type: string
  itemId: string
  userId: string
  upvotes: number
  downvotes: number
  hasdownVoted: boolean
  hasupVoted: boolean
  hasSaved?: boolean
}
const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasdownVoted,
  hasupVoted,
  hasSaved,
}: Props) => {
  const pathname = usePathname()
  const router = useRouter()
  const handleSave = async () => {
    // if (!userId) {
    //   router.push('/auth/signin')
    //   return
    // }
    await toggleSaveQuestion({
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path: pathname,
    })
  }

  const handleVote = async (action: string) => {
    if (!userId) {
      return
    }
    if (action === 'upvote') {
      if (type === 'Question') {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      } else if (type === 'Answer') {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      }
      // TODO: Add Toast
    }

    if (action === 'downvote') {
      if (type === 'Question') {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      } else if (type === 'Answer') {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      }
      // TODO: Add Toast
    }
  }

  useEffect(() => {
    ViewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    })
    // alert('viewed')
  }, [itemId, userId, pathname, router])

  return (
    <div className='flex gap-5'>
      <div className='flex-center gap-2'>
        <div className='flex-center gap-1.5'>
          <Image
            src={
              hasupVoted
                ? '/assets/icons/upvoted.svg'
                : '/assets/icons/upvote.svg'
            }
            width={18}
            height={18}
            alt='upvote'
            className='cursor-pointer'
            onClick={() => handleVote('upvote')}
          />
          <div className='flex-center background-light700_dark400 gap-1.5 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>

          <Image
            src={
              hasdownVoted
                ? '/assets/icons/downvoted.svg'
                : '/assets/icons/downvote.svg'
            }
            width={18}
            height={18}
            alt='downvote'
            onClick={() => handleVote('downvote')}
          />
          <div className='flex-center background-light700_dark400 gap-1.5 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      <Image
        src={
          hasSaved
            ? '/assets/icons/star-filled.svg'
            : '/assets/icons/star-red.svg'
        }
        width={18}
        height={18}
        alt='downvote'
        onClick={handleSave}
      />
    </div>
  )
}

export default Votes
