import logo from './logo.svg?react'

export type Props = {
  className?: string
}

export function LogoV2({ className }: Props) {
  const Svg = logo

  return <Svg className={className} />
}
