import React from 'react'

export default function Stat({ value, title }) {
  return (
    <div className="stats shadow bg-gray-900">
      <div className="stat">
        <div className="stat-value text-white">{ value }</div>
        <div className="stat-title text-white">{ title }</div>
        {/* <div className="stat-desc">{ desc }</div> */}
      </div>

    </div>
  )
}
