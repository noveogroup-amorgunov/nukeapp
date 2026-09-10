import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import cn from 'classnames'
import { ProductCardV2 } from '../ProductCardV2/ProductCardV2'
import type { ProductCompactView } from '../ProductCardV2/ProductCardV2'
import css from './ProductGrid.module.css'

export type ProductGridProps = {
  products: ProductCompactView[]
  columns?: 2 | 3 | 4
  quantityByProductId?: Readonly<Record<string, number>>
  onProductClick?: (productId: string) => void
}

const OVERSCAN = 5
const GRID_GAP_PX = 12
const CARD_DESCRIPTION_BLOCK_HEIGHT_PX = 86

function calculateRowEstimatedHeight(gridWidth = 0, columns = 2) {
  const cardWidth = (gridWidth - GRID_GAP_PX * (columns - 1)) / columns
  const cardHeight = cardWidth + CARD_DESCRIPTION_BLOCK_HEIGHT_PX

  return cardHeight
}

export function ProductGrid({
  products,
  columns = 2,
  quantityByProductId,
  onProductClick,
}: ProductGridProps) {
  const listRef = useRef<HTMLDivElement>(null)

  const rowCount = Math.ceil(products.length / columns)
  const ROW_ESTIMATED_SIZE = calculateRowEstimatedHeight(
    listRef.current?.clientWidth,
    columns,
  )

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => ROW_ESTIMATED_SIZE,
    overscan: OVERSCAN,
    gap: GRID_GAP_PX,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  })

  const handleResize = useCallback(() => {
    virtualizer.measure()
  }, [virtualizer])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  useLayoutEffect(() => {
    virtualizer.measure()
  }, [ROW_ESTIMATED_SIZE, virtualizer])

  return (
    <div className={css.ProductGrid} ref={listRef}>
      <div
        className={css.VirtualSpace}
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * columns

          return (
            <div
              className={cn(css.Row, columns === 3 && css.Columns3, columns === 4 && css.Columns4)}
              key={virtualRow.key}
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin}px)`,
              }}
            >
              {Array.from({ length: columns }, (_, i) => {
                const product = products[startIndex + i]

                if (!product) {
                  return null
                }

                return (
                  <ProductCardV2
                    key={`${virtualRow.index}-${i}`}
                    product={product}
                    quantity={quantityByProductId?.[product.id]}
                    onProductClick={onProductClick}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
