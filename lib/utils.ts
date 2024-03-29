import { BADGE_CRITERIA } from '@/constants'
import { BadgeCounts } from '@/types'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import queryString from 'query-string'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date()
  const diff = now.getTime() - createdAt.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30) // Assuming 30 days per month (simplified)
  const years = Math.floor(months / 12) // Assuming 12 months per year (simplified)

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`
  }
}
export const formatAndDivideNumber = (num: number): string => {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1)
    return `${formattedNum}M`
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1)
    return `${formattedNum}K`
  } else {
    return num.toString()
  }
}

export const getJoinedDate = (date: Date): string => {
  console.log(date)
  // Extract the month and year from the Date object
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()

  // Create the joined date string (e.g., "September 2023")
  const joinedDate = `${month} ${year}`

  return joinedDate
}

interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA
    count: number
  }[]
}

export const assignBadges = (params: BadgeParam) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  }

  const { criteria } = params

  criteria.forEach((item) => {
    const { type, count } = item
    const badgeLevels: any = BADGE_CRITERIA[type]

    Object.keys(badgeLevels).forEach((level: any) => {
      if (count >= badgeLevels[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1
      }
    })
  })

  return badgeCounts
}
// import queryString from 'query-string';

interface UrlQueryParams {
  params: string
  key: string
  value: string | null
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = queryString.parse(params)
  const updatedUrl = { ...currentUrl, [key]: value }

  // Construct the URL manually to ensure proper encoding
  const finalUrl =
    window.location.pathname +
    '?' +
    queryString.stringify(updatedUrl, { skipNull: true })

  console.log(finalUrl)

  return finalUrl
}

interface RemoveUrlQueryParams {
  params: string
  keysToRemove: string[]
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = queryString.parse(params)
  console.log(currentUrl)
  keysToRemove.forEach((key) => {
    delete currentUrl[key]
  })

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}
