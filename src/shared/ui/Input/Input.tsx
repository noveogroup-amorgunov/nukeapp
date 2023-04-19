type Props = {
  onChange?: () => void
}

export function Input({ onChange }: Props) {
  return <input onChange={onChange} />
}
