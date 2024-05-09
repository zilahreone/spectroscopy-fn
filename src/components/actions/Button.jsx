import React from 'react'

export default function Button({ name, icon, color, className }) {
  const color2 = color && `btn-${color}`
  return (
    <button className={`btn ${color2} btn-md ${className}`}>
      {
        icon && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
      }
      { name ? name : 'Button' }
    </button>
  )
}
