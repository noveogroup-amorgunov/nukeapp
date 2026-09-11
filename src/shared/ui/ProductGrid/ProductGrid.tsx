import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import cn from 'classnames'
import { ProductCardV2 } from '../ProductCardV2/ProductCardV2'
import type { ProductCompactView } from '../ProductCardV2/ProductCardV2'
import css from './ProductGrid.module.css'

export type ProductGridColumns = 2 | 3 | 4 | 'auto'

export type ProductGridProps = {
  products: ProductCompactView[]
  columns?: ProductGridColumns
  quantityByProductId?: Readonly<Record<string, number>>
  actions?: (product: ProductCompactView) => ReactNode
  onProductClick?: (productId: string) => void
}

const OVERSCAN = 5
const GRID_GAP_PX = 12
const CARD_DESCRIPTION_BLOCK_HEIGHT_PX = 86

// Mirrors the responsive column layout of widgets/BaseProductList
// (src/shared/breakpoints.css), clamped to the 2/3/4 variants the Figma
// ProductGrid component set defines.
function getAutoColumns(windowWidth: number) {
  if (windowWidth <= 599)
    return 2
  if (windowWidth <= 767)
    return 3
  if (windowWidth <= 1023)
    return 4
  if (windowWidth <= 1439)
    return 3
  return 4
}

function calculateRowEstimatedHeight(gridWidth = 0, columns = 2) {
  const cardWidth = (gridWidth - GRID_GAP_PX * (columns - 1)) / columns
  const cardHeight = cardWidth + CARD_DESCRIPTION_BLOCK_HEIGHT_PX

  return cardHeight
}

export function ProductGrid({
  products,
  columns: columnsProp = 2,
  quantityByProductId,
  actions,
  onProductClick,
}: ProductGridProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth)

  const columns = columnsProp === 'auto' ? getAutoColumns(windowWidth) : columnsProp
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

  const measureFrameRef = useRef(0)

  useEffect(() => {
    const handleResize = () => {
      if (measureFrameRef.current) {
        return
      }

      measureFrameRef.current = requestAnimationFrame(() => {
        measureFrameRef.current = 0
        setWindowWidth(window.innerWidth)
        virtualizer.measure()
      })
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(measureFrameRef.current)
    }
  }, [virtualizer])

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
              className={cn(
                css.Row,
                columnsProp === 'auto'
                  ? css.AutoColumns
                  : columns === 3 && css.Columns3,
                columnsProp !== 'auto' && columns === 4 && css.Columns4,
              )}
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
                    actionSlot={actions?.(product)}
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
