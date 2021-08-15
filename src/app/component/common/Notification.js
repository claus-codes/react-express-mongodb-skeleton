import React from 'react'

export default function Notification(props) {
  const { message, className } = props
  if (!message) return null
  return (
    <div className={`notification ${className}`}>
      {message}
    </div>
  )
}
