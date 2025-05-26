import { delay, http, HttpResponse } from 'msw'
import { env } from '@/shared/lib'

export const adBlockHandlers = [
  http.get(`${env.VITE_API_ENDPOINT}/ad/offer`, async () => {
    // example ad offer for my another project
    const adOffer = {
      id: '2RanymhtqkD',
      text: 'Feature-Sliced Design architecture lessons. See a lot of examples in the github repository. Click now!',
      imageUrl: '/ad-demo-banner.jpg',
      offerLink: 'https://github.com/noveogroup-amorgunov/fsd-lessons',
    }

    await delay(env.VITE_API_DELAY)
    return HttpResponse.json(
      adOffer,
      { status: 200 },
    )
  }),
]
