import Filter from '@/components/shared/Filter'
import LocalSearch from '@/components/shared/LocalSearch'
import NoResults from '@/components/shared/NoResults'
import { TagFilters } from '@/constants/filters'
// import User from "@/database/user.model";
import { getAllTags } from '@/lib/actions/tag.action'
// import { getAllUsers } from "@/lib/actions/user.action";

import Link from 'next/link'

import React from 'react'

const page = async () => {
  const result = await getAllTags({})
  //   const user = await getAllUsers({});

  return (
    <>
      <div>
        <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center '>
          <h1 className='h1-bold text-dark100_light900 font-medium'>
            All Tags
          </h1>
          <Link href='/ask-question' className='flex justify-end max-sm:w-full'>
            <button className='  primary-gradient min-h-[46px]  rounded-lg px-4 py-3 text-light-900'>
              Add Tag
            </button>
          </Link>
        </div>

        <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
          <LocalSearch
            route='/tags'
            iconPosition='left'
            imgSrc='/assets/icons/search.svg'
            placeholder='Search for tags'
            otherClasses='flex-1'
          />

          <Filter
            filters={TagFilters}
            otherClasses='min-h-[56px] sm:min-w-[170px]'
          />
        </div>
        <section className='mt-10 flex w-full flex-col gap-4'>
          {result.tags.length > 0 ? (
            result.tags.map((tag) => (
              <Link href={`/tags/${tag._id}`} key={tag._id}>
                <article
                  className='background-light900_dark200 light-border flex w-full
                flex-col rounded-2xl border px-8 py-10 sm:w-[260px]'
                >
                  <div className='background-light800_dark400 w-fit rounded-sm px-5 py-1.5'>
                    <p className='text-dark300_light900 paragraph-semibold'>
                      {tag.name}
                    </p>
                  </div>
                  <p className='text-dark400_light500 small-medium mt-3.5'>
                    <span className='body-semibold primary-text-gradient mr-2.5'>
                      {tag.questions.length}+
                    </span>{' '}
                    Questions
                  </p>
                </article>
              </Link>
            ))
          ) : (
            <NoResults
              title='No Tag found'
              description='Looks like no tags are found'
              link='/ask-question'
              linkTitle='Ask a Question'
            />
          )}
        </section>
      </div>
    </>
  )
}

export default page
