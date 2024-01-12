import LocalSearch from '@/components/shared/LocalSearch'
import NoResults from '@/components/shared/NoResults'
import QuestionCard from '@/components/cards/QuestionCard'
import HomeFilter from '@/components/shared/homeFilter/HomeFilter'
import { HomePageFilters } from '@/constants/filters'

import Link from 'next/link'
import { getQuestions } from '@/lib/actions/question.action'
import Filter from '@/components/shared/Filter'
import { SearchParamsProps } from '@/types'

export default async function Home({ searchParams }: SearchParamsProps) {
  const result = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  })

  // Now the `questions` array matches the `QuestionProps` interface with random values.

  return (
    <>
      <div>
        <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center '>
          <h1 className='h1-bold text-dark100_light900 font-medium'>
            All Questions
          </h1>
          <Link href='/ask-question' className='flex justify-end max-sm:w-full'>
            <button className='  primary-gradient min-h-[46px]  rounded-lg px-4 py-3 text-light-900'>
              Ask Question
            </button>
          </Link>
        </div>

        <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center lg:flex-col'>
          <LocalSearch
            route='/'
            iconPosition='left'
            imgSrc='/assets/icons/search.svg'
            placeholder='Search for questions'
            otherClasses='flex-1 w-full'
          />{' '}
          <Filter
            filters={HomePageFilters}
            containerClasses='hidden max-md:flex'
            otherClasses='min-h-[56px] sm:min-w-[176px]'
          />
        </div>
        <HomeFilter />
        <div className='mt-10 flex w-full flex-col gap-6'>
          {result.questions.length > 0 ? (
            result.questions.map((question) => (
              <QuestionCard
                key={question._id}
                title={question.title}
                _id={question._id}
                tags={question.tags}
                author={question.author}
                answers={question.answers}
                views={question.views}
                upvotes={question.upvotes.length}
                createdAt={question.createdAt}
              />
            ))
          ) : (
            <NoResults
              title='There is no question to show'
              description=' Be the first to break the silence! 🚀Ask question and kickstart the
            discussion.our query could be the next big thing others can learn from.
            Get involved'
              link='/ask-question'
              linkTitle='Ask a Question'
            />
          )}
        </div>
        {/* <QuestionCard /> */}
      </div>
    </>
  )
}
