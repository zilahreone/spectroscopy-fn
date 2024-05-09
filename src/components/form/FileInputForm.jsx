import React from 'react'

export default function FileInputForm({ required, tlLabel, trLabel, blLabel, brLabel, placeholder, onEmit }) {
  return (
    <div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">{tlLabel}</span>
          <span className="label-text-alt">{trLabel}</span>
        </div>
        <input type="file" className="file-input file-input-bordered file-input-primary file-input-sm w-full" placeholder={placeholder} required={required} />
        <div className="label">
          <span className="label-text-alt">{blLabel}</span>
          <span className="label-text-alt">{brLabel}</span>
        </div>
      </label>
    </div>
  )
}
