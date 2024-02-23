'use client'
import { Button } from '@/components/ui/button'
import { HomePageFilters } from '@/constants/filters'
import { formUrlQuery } from '@/lib/utils'
import { useSearchParams, useRouter } from 'next/navigation'

import React, { useState } from 'react'

const HomeFilter = () => {
  // const active = 'newest'
  const searchParams = useSearchParams()
  const [active, setActive] = useState('')
  const router = useRouter()

  const handleTypeClick = (item: string) => {
    if (item === active) {
      setActive('')
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: null,
      })
      // console.log(newUrl)

      router.push(newUrl, { scroll: false })
    } else {
      setActive(item)
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: item.toLowerCase(),
      })

      router.push(newUrl, { scroll: false })
    }
  }

  return (
    <div
      className='mt-10 hidden flex-wrap
  gap-3 md:flex md:flex-row'
    >
      {HomePageFilters.map((item) => {
        return (
          <Button
            key={item.value}
            onClick={() => {
              handleTypeClick(item.value)
            }}
            className={`body-medium rounded-lg px-6 py-3 
          capitalize shadow-none ${
            active === item.value
              ? 'bg-primary-100 text-primary-500'
              : 'bg-light-800 text-light-500 hover:bg-light-900 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300'
          } `}
          >
            {item.name}
          </Button>
        )
      })}
    </div>
  )
}

export default HomeFilter
