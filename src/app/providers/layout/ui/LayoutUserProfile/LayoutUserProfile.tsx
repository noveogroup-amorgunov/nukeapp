import { skipToken } from '@reduxjs/toolkit/query'
import { useNavigate } from 'react-router-dom'
import { selectIsAuthorized } from '@/entities/session'
import { useLogout } from '@/features/session/logout'
import { useGetMeQuery } from '@/shared/api'
import { useAppSelector } from '@/shared/lib/redux'
import { DropdownMenu, Icon, IconButton } from '@/shared/ui'
import css from './LayoutUserProfile.module.css'

export function LayoutUserProfile() {
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const navigate = useNavigate()
  const logout = useLogout()
  const { data: profileData } = useGetMeQuery(isAuthorized ? undefined : skipToken)

  const onSelect = (value: string) => {
    if (value === 'logout') {
      logout()
    }
  }

  if (!isAuthorized) {
    return (
      <div data-fsd="app/LayoutUserProfile" className={css.root}>
        <IconButton onClick={() => navigate('/login')}>
          <Icon type="user" />
        </IconButton>
      </div>
    )
  }

  return (
    <div data-fsd="app/LayoutUserProfile" className={css.root}>
      <DropdownMenu
        align="end"
        header={profileData?.email}
        items={[{ value: 'logout', label: 'Logout' }]}
        onSelect={onSelect}
        trigger={<IconButton><Icon type="user" /></IconButton>}
      />
    </div>
  )
}
