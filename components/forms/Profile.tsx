'use client'
import { IUser } from '@/database/user.model'
import React, { useState } from 'react'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Textarea } from '../ui/textarea'
import { usePathname, useRouter } from 'next/navigation'
import { updateUser } from '@/lib/actions/user.action'
import { profileSchema } from '@/lib/validation'

interface Props {
  clerkId: string
  user: string
}

const Profile = ({ clerkId, user }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const parsedUser = JSON.parse(user) as IUser

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: parsedUser.username || '',
      name: parsedUser.name || '',
      portfolioWebsite: parsedUser.portfolioWebsite || '',
      location: parsedUser.location || '',
      bio: parsedUser.bio || '',
    },
  })

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsSubmitting(true)
    try {
      // update user
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          portfolioWebsite: values.portfolioWebsite,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      })
      router.back()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-9 flex flex-col w-full gap-9'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='space-y-3.5'>
                <FormLabel>
                  Name<span className='text-primary-500'></span>
                </FormLabel>
                <FormControl>
                  <Input
                    className='no-focus paragraph-regular light-border-2 background-light700_dark300
                    text-dark300_light700 min-h-[56px] '
                    placeholder='Full Name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem className='space-y-3.5'>
                <FormLabel>
                  Username<span className='text-primary-500'></span>
                </FormLabel>
                <FormControl>
                  <Input
                    className='no-focus paragraph-regular light-border-2 background-light700_dark300
                    text-dark300_light700 min-h-[56px] '
                    placeholder='Your Username'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='portfolioWebsite'
            render={({ field }) => (
              <FormItem className='space-y-3.5'>
                <FormLabel>Portfolio Link</FormLabel>
                <FormControl>
                  <Input
                    type='url'
                    className='no-focus paragraph-regular light-border-2 background-light700_dark300
                    text-dark300_light700 min-h-[56px] '
                    placeholder='Your Portfolio URL'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem className='space-y-3.5'>
                <FormLabel>
                  Location <span className='text-primary-500'></span>
                </FormLabel>
                <FormControl>
                  <Input
                    className='no-focus paragraph-regular light-border-2 background-light700_dark300
                    text-dark300_light700 min-h-[56px] '
                    placeholder='Location'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem className='space-y-3.5'>
                <FormLabel>
                  Bio<span className='text-primary-500'></span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    className='no-focus paragraph-regular light-border-2 background-light700_dark300
                    text-dark300_light700 min-h-[56px] '
                    placeholder={`What's special about you?`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='mt-7 flex justify-end '>
            <Button
              type='submit'
              className='primary-gradient w-fit'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Profile
