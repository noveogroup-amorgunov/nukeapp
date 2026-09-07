import { delay, http, HttpResponse } from 'msw'
import type { AdOffer } from '@/shared/api'
import { env } from '@/shared/lib'

export const adBlockHandlers = [
  http.get('/ad/offer', async () => {
    const adOffer: AdOffer = {
      id: '2RanymhtqkD',
      text: 'Feature-Sliced Design architecture lessons. See a lot of examples in the github repository. Click now!',
      imageUrl: '/images/ad-demo-banner.jpg',
      offerLink: 'https://github.com/noveogroup-amorgunov/fsd-lessons',
    }

    await delay(env.VITE_API_DELAY)
    return HttpResponse.json(
      adOffer,
      { status: 200 },
    )
  }),
]
