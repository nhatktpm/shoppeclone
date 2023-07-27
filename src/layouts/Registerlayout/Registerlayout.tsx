import React from 'react'
interface Props {
  children?: React.ReactNode
}
export default function Registerlayout({ children }: Props) {
  return (
    <div>
      Registerlayout
      {children}
    </div>
  )
}
