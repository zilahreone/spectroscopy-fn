import React from 'react'

export default function SelectForm({className, required, blLabel, brLabel, tlLabel, trLabel, selected, options, disabled = false, onEmit }) {
  const log = (log) => {
    console.log(log);
  }
  return (
    <div className={className}>
      <label className="form-control w-full">
        <div className="label font-medium">
          <span className="label-text">{tlLabel}</span>
          <span className="label-text-alt">{trLabel}</span>
        </div>
        <select required={required} onChange={(e) => onEmit(e.target)} value={selected || ''} disabled={disabled} className="select select-primary select-sm w-full">
          <option disabled value={''}>Please select...</option>
          {
            options && options.map((option, index) => (
              <option key={index} id={option.id} value={option.value}>{option.name}</option>
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
