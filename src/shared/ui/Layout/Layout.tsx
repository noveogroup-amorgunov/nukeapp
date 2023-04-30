import { type ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import css from './Layout.module.css'

type Props = {
  navbarSlot?: ReactNode
  headerSlot: ReactNode
  bottomSlot?: ReactNode
  announcementSlot?: ReactNode
  sidebarSlot?: ReactNode
}

export function Layout(props: Props) {
  return (
    <div className={css.root}>
      {props.announcementSlot}
      {props.navbarSlot}
      {props.headerSlot}
      <div className={css.container}>
        <div className={css.content}>
          <Outlet />
        </div>
        {props.sidebarSlot}
      </div>
      <footer className={css.footer}>
        <div className="text_sm">
          {new Date().getFullYear()}, see source code on{' '}
          <a href="https://github.com/noveogroup-amorgunov/nukeapp">
            github/noveogroup-amorgunov/nukeapp
          </a>
        </div>
      </footer>
      {props.bottomSlot}
    </div>
  )
}
