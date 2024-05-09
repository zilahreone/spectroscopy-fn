import React from 'react'

export default function InputForm({required, type, tlLabel, trLabel, blLabel, brLabel, placeholder, children, onEmit}) {
  return (
    <div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">{tlLabel}</span>
          <span className="label-text-alt">{trLabel}</span>
        </div>
        {
          children
            ? children
            : <input onInput={(e) => onEmit(e.target.value)} type={`${'text' && type}`} placeholder={placeholder} className="input input-bordered input-primary input-sm" required={required} />
        }
        <div className="label">
          <span className="label-text-alt">{ blLabel }</span>
          <span className="label-text-alt">{ brLabel }</span>
        </div>
      </label>
    </div>
  )
}
