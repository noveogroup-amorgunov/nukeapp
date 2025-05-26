import type { AdOfferDto } from '../api/types'
import type { AdOffer } from '../model/types'

export function mapAdOffer(dto: AdOfferDto): AdOffer {
  return {
    id: dto.id,
    text: dto.text,
    image: dto.imageUrl,
    link: dto.offerLink,
  }
}
