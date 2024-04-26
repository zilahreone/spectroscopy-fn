import React from 'react'

export default function CheckBox({ label }) {
  return (
    <label className="label cursor-pointer">
      <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
      <div className='grow px-2'>
        <span>{ label }</span>
      </div>
      {/* <div className='grow'></div> */}
    </label>
  )
}
