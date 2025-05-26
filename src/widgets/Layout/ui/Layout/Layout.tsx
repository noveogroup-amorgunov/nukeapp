import type { ReactNode } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Announcement } from '@/shared/ui'
import { DebugModeToggler } from '../DebugModeToggler/DebugModeToggler'
import { LayoutHeader } from '../LayoutHeader/LayoutHeader'
import css from './Layout.module.css'

type Props = {
  headerRightSlot?: ReactNode
  sidebarSlot?: ReactNode
}

export function Layout(props: Props) {
  return (
    <div className={css.root}>
      <Announcement>
        <span>
          🚀&nbsp;&nbsp;An&nbsp;open source frontend application built with
          React and Feature-Sliced&nbsp;Design.
        </span>
      </Announcement>
      <LayoutHeader rightContentSlot={props.headerRightSlot} />
      <div className={css.container}>
        <div className={css.content}>
          <Outlet />
        </div>
        {props.sidebarSlot && (
          <aside className={css.sidebar}>{props.sidebarSlot}</aside>
        )}
      </div>
      <footer className={css.footer}>
        <div className="text_sm">
          {new Date().getFullYear()}
          , see source code on
          {' '}
          <a href="https://github.com/noveogroup-amorgunov/nukeapp">
            github/noveogroup-amorgunov/nukeapp
          </a>
        </div>
      </footer>
      <DebugModeToggler />
      <ScrollRestoration />
    </div>
  )
}
