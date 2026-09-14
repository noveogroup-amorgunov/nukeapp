import { skipToken } from '@reduxjs/toolkit/query'
import { useNavigate } from 'react-router-dom'
import { selectIsAuthorized } from '@/entities/session'
import { LogoutButton } from '@/features/session/logout'
import { useGetMeQuery } from '@/shared/api'
import { useAppSelector } from '@/shared/redux'
import { DropdownMenu, Icon, IconButton } from '@/shared/ui'
import css from './LayoutUserProfile.module.css'

export function LayoutUserProfile() {
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const navigate = useNavigate()
  const { data: profileData } = useGetMeQuery(isAuthorized ? undefined : skipToken)

  const onSelect = (value: string) => {
    if (value === 'login') {
      navigate('/login')
    }
  }

  return (
    <div data-fsd="app/LayoutUserProfile" className={css.root}>
      <DropdownMenu
        align="end"
        header={isAuthorized ? profileData?.email : undefined}
        items={
          isAuthorized
            ? [{ value: 'logout', label: <LogoutButton /> }]
            : [{ value: 'login', label: 'Login' }]
        }
        onSelect={onSelect}
        trigger={<IconButton><Icon type="user" /></IconButton>}
      />
    </div>
  )
}
