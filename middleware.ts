import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: [
    '/',
    '/api/webhook',
    'question/:id',
    '/tags',
    '/tags/:id',
    '/profile/:id',
    '/community',
    '/jobs',
    '/sign-up',
    '/sign-in',
  ],
  ignoredRoutes: ['/api/webhook', '/api/chatgpt'],
})

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)',
    '/api/webhook',
    '/api/chatgpt',
  ],
}
