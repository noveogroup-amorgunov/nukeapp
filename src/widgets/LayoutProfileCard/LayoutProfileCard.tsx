import { skipToken } from '@reduxjs/toolkit/dist/query'
import { Link } from 'react-router-dom'
import { selectIsAuthorize, useMeQuery } from '@/entities/session'
import { LogoutButton } from '@/features/authentication/Logout/ui/LogoutButton/LogoutButton'
import { useFeatureSlicedDebug } from '@/shared/lib/useFeatureSlicedDebug'
import { useAppSelector } from '@/shared/model/hooks'

export function LayoutProfileCard() {
  const { rootAttributes } = useFeatureSlicedDebug('widget/LayoutProfileCard')
  const isAuthorized = useAppSelector(selectIsAuthorize)
  const { data: profileData } = useMeQuery(
    isAuthorized ? undefined : skipToken,
    {
      skip: !isAuthorized,
    }
  )

  if (!isAuthorized) {
    return (
      <div {...rootAttributes}>
        <Link to="/login">login</Link>
      </div>
    )
  }

  return (
    <div {...rootAttributes}>
      Hello, {profileData?.email}!&nbsp;
      {isAuthorized && <LogoutButton />}
    </div>
  )
}
