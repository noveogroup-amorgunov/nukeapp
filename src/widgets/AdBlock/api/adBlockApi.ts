import { baseApi } from '@/shared/api'
import { mapAdOffer } from '../lib/mapAdOffer'
import type { AdOffer } from '../model/types'
import type { AdOfferDto } from './types'

export const adBlockApi = baseApi.injectEndpoints({
  endpoints: build => ({
    adOffer: build.query<AdOffer, void>({
      query: () => ({
        url: `/ad/offer`,
      }),
      transformResponse: (response: AdOfferDto) => mapAdOffer(response),
    }),
  }),
})

export const { useAdOfferQuery } = adBlockApi
