import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectCartTotalPrice, selectProductsInCart } from '@/entities/cart'
import { useCartQuery } from '@/entities/cart/api/cartApi'
import { selectIsAuthorized } from '@/entities/session'
import { useAppSelector } from '@/shared/model'
import { Button } from '@/shared/ui'
import { CartProductList } from '../CartProductList/CartProductList'
import { CartSummary } from '../CartSummary/CartSummary'
import css from './Page.module.css'

export function CartPage() {
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const navigate = useNavigate()
  const totalPrice = useAppSelector(selectCartTotalPrice)
  const cartProducts = useAppSelector(selectProductsInCart)
  const { isLoading } = useCartQuery(isAuthorized ? undefined : skipToken, {
    skip: !isAuthorized,
  })

  const onLogin = useCallback(() => {
    navigate('/login', {
      state: { returnUrl: `/user/cart` },
    })
  }, [])

  if (!isAuthorized) {
    return (
      <div>
        <h1>Bag</h1>
        <div>
          <div>Login to see your cart.</div>
          <Button onClick={onLogin}>Login</Button>
        </div>
      </div>
    )
  }

  if (cartProducts.length === 0) {
    return (
      <div>
        <h1>Bag</h1>
        <div>
          {isLoading && <div>Loading...</div>}
          {!isLoading && (
            <div>
              There are no products in your bag. Add someone and return.
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={css.root}>
      <div className={css.column}>
        <h1>Bag</h1>
        <div>
          <CartProductList products={cartProducts} />
        </div>
      </div>
      <div className={css.column}>
        <h1>Summary</h1>
        <CartSummary totalPrice={totalPrice} />
      </div>
    </div>
  )
}
