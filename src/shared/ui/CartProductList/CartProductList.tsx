import type { ReactNode } from 'react'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import type { CartLineView } from './CartProductCard'
import { CartProductCard } from './CartProductCard'
import css from './CartProductList.module.css'

const GAP = 12
const OVERSCAN = 5
const ESTIMATED_CARD_HEIGHT = 160

export type Props = {
  lines: CartLineView[]
  onIncrease?: (productId: string) => void
  onDecrease?: (productId: string) => void
  onProductClick?: (productId: string) => void
  actions?: (line: CartLineView) => ReactNode
}

export { type CartLineView } from './CartProductCard'

export function CartProductList({
  lines,
  onIncrease,
  onDecrease,
  onProductClick,
  actions,
}: Props) {
  const listRef = useRef<HTMLDivElement>(null)

  const virtualizer = useWindowVirtualizer({
    count: lines.length,
    estimateSize: () => ESTIMATED_CARD_HEIGHT,
    overscan: OVERSCAN,
    gap: GAP,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  })

  const items = virtualizer.getVirtualItems()

  const handleResize = useCallback(() => {
    virtualizer.measure()
  }, [virtualizer])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  useLayoutEffect(() => {
    virtualizer.measure()
  }, [virtualizer])

  return (
    <div className={css.root} ref={listRef}>
      <div
        className={css.space}
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {items.map((item) => {
          const line = lines[item.index]
          if (!line) {
            return null
          }

          return (
            <div
              key={item.key}
              className={css.row}
              data-index={item.index}
              ref={virtualizer.measureElement}
              style={{
                transform: `translateY(${item.start - virtualizer.options.scrollMargin}px)`,
              }}
            >
              <CartProductCard
                line={line}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onProductClick={onProductClick}
                actions={actions?.(line)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
