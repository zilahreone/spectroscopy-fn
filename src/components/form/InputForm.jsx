import React from 'react'

export default function InputForm({className, required, value, type, tlLabel, trLabel, blLabel, brLabel, placeholder, children, onEmit, onKeyDown, disabled = false}) {
  return (
    <div className={className}>
      <label className='form-control w-full'>
        <div className="label font-medium">
          <span className="label-text">{tlLabel}</span>
          <span className="label-text-alt">{trLabel}</span>
        </div>
        {
          children
            ? children
            : <input disabled={disabled} onKeyDown={(e) => onKeyDown && onKeyDown(e.code)} onInput={(e) => onEmit(e.target.value)} value={value || ''} type={`${'text' && type}`} placeholder={placeholder} className="input input-bordered input-primary input-sm" required={required} />
        }
        <div className="label font-medium">
          <span className="label-text-alt">{ blLabel }</span>
          <span className="label-text-alt">{ brLabel }</span>
        </div>
      </label>
    </div>
  )
}
