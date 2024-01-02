import UserCard from '@/components/cards/UserCard'
import Filter from '@/components/shared/Filter'
import LocalSearch from '@/components/shared/LocalSearch'
import { UserFilters } from '@/constants/filters'
import { getAllUsers } from '@/lib/actions/user.action'
import Link from 'next/link'

const page = async () => {
  const result = await getAllUsers({})

  return (
    <>
      <h1 className='h1-bold text-dark100_light900 font-medium'>All Users</h1>

      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearch
          route='/community'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for amazing minds'
          otherClasses='flex-1 w-full'
        />{' '}
        <Filter
          filters={UserFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
        />
      </div>
      <section className='mt-11 flex flex-wrap gap-4'>
        {result.users.length > 0 ? (
          result.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className='paragraph-regular mx-auto text-dark200_light800  max-w-4xl text-center'>
            <p>No Users Yet</p>
            <Link
              href='/sign-up'
              className='text-accent-blue hover:cursor-pointer mt-2 font-bold'
            >
              Join to be first!
            </Link>
          </div>
        )}
      </section>
    </>
  )
}

export default page
