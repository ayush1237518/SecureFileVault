import { IconLock } from './Icons'

type Props = { size?: 'sm' | 'md' }

const sizes = {
  sm: { box: 'h-9 w-9', icon: 'h-4 w-4' },
  md: { box: 'h-12 w-12', icon: 'h-5 w-5' },
}

export function Logo({ size = 'sm' }: Props) {
  const s = sizes[size]
  return (
    <div
      className={`grid ${s.box} place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/10 ring-1 ring-violet-400/30 shadow-lg shadow-violet-500/10`}
    >
      <IconLock className={`${s.icon} text-violet-300`} />
    </div>
  )
}
