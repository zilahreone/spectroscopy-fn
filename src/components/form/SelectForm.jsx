import React from 'react'

export default function SelectForm({ selected, options, onEmit }) {
  return (
    <select onChange={(e) => onEmit(e.target.value)} value={selected} className="select select-primary select-sm w-full">
      <option disabled value={null}>Please select...</option>
      {
        options && options.map((option, index) => (
          <option key={index} value={option.value}>{option.name}</option>
        ))
      }
    </select>
  )
}
