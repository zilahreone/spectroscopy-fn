import React from 'react'

export default function SearchInput({className, keyCode = 13, iconLeft, iconRight, onEmit, onInput}) {
  const keyDown = (event) => {
    event.keyCode === keyCode && onEmit(event.target.value)
  }
  const input = (value) => {
    onInput(value)
  }
  return (
    // <label className="input input-primary input-sm input-bordered flex items-center gap-2">
    <label className={className || 'flex input input-sm input-bordered rounded-3xl input-primary items-center gap-2 lg:min-w-full'}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#4d194d" className="w-6 h-6"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
      <input className="text-sm" onKeyDown={keyDown} onInput={(e) => input(e.target.value)} placeholder="Search" />
    </label>
  )
}
