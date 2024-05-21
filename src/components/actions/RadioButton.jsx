import React from 'react'

export default function RadioButton({ name, label }) {
  return (
    <>
      <div className="form-control">
        <label className="label cursor-pointer" style={{justifyContent: 'left'}}>
          <input type="radio" name={name} className="radio checked:bg-blue-500" />
          <span className="label-text px-2">{label}</span>
        </label>
      </div>
    </>
  )
}
