import React from 'react'

export default function Label({ name }) {
  return (
    <>
      <div className="label">
        <span className="label-text">{ name }</span>
      </div>
    </>
  )
}
