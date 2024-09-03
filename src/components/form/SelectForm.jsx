import React from 'react'

export default function SelectForm({className, required, blLabel, brLabel, tlLabel, trLabel, selected, options, onEmit }) {
  return (
    <div className={className}>
      <label className="form-control w-full">
        <div className="label font-medium">
          <span className="label-text">{tlLabel}</span>
          <span className="label-text-alt">{trLabel}</span>
        </div>
        <select required={required} onChange={(e) => onEmit(e.target.value)} value={selected} className="select select-primary select-sm w-full">
          <option value={''}>Please select...</option>
          {
            options && options.map((option, index) => (
              <option key={index} value={option.value}>{option.name}</option>
            ))
          }
        </select>

        <div className="label font-medium">
          <span className="label-text-alt">{blLabel}</span>
          <span className="label-text-alt">{brLabel}</span>
        </div>
      </label>
    </div>
  )
}
