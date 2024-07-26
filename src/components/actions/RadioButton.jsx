import React from 'react'

export default function RadioButton({ name, label, value, checked, onEmit }) {
  return (
    <>
      <div className="form-control">
        <label className="label cursor-pointer" style={{justifyContent: 'left'}}>
          <input onChange={(e) => onEmit && onEmit(e.target.value)} type="radio" name={name} value={value} className="radio checked:bg-blue-500" checked={value === checked} />
          <span className="label-text px-2">{label}</span>
        </label>
      </div>
    </>
  )
}
