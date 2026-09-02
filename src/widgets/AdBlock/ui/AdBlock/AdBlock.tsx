import { useMemo } from 'react'
import { selectCurrentTheme } from '@/entities/theme'
import { useAppSelector } from '@/shared/redux'
import { useAdOfferQuery } from '../../api/adBlockApi'
import css from './AdBlock.module.css'

export function AdBlock() {
  const { data: adOffer, isFetching } = useAdOfferQuery()
  const theme = useAppSelector(selectCurrentTheme)

  const image = useMemo(() => {
    if (theme === 'dark') {
      return adOffer?.image.replace(/^([^.]+)\.(.+)$/, '$1@dark.$2')
    }

    return adOffer?.image
  }, [adOffer, theme])

  if (isFetching || !adOffer) {
    return null
  }

  return (
    <a
      href={adOffer.link}
      target="_blank"
      style={{ backgroundImage: `url(${image})` }}
      data-fsd="widget/AdBlock"
      className={css.root}
    >
      <div className={css.content}>
        <div className={css.text}>{adOffer.text}</div>
        <div className={css.ad}>
          AD #
          {adOffer.id}
        </div>
      </div>
    </a>
  )
}
