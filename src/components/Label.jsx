import React from 'react'

export default function Label({ name, className }) {
  return (
    <>
      <div className="label font-medium">
        <span className={`label-text ${className}`}>{ name }</span>
      </div>
    </>
  )
}
