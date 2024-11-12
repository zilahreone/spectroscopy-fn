import React from 'react'

export default function InputForm({ className, required, value, type, tlLabel, trLabel, blLabel, brLabel, placeholder, children, onEmit, onKeyDown, disabled = false, isLabelInside = false, labelInside }) {
  return (
    <div className={className}>
      <label className='form-control'>
        <div className="label font-medium">
          <span className="label-text">{tlLabel}</span>
          <span className="label-text-alt">{trLabel}</span>
        </div>
        {
          children
            ? children
            : isLabelInside ?
              <label className="input input-sm input-bordered input-primary flex items-center gap-2">
                <input className="grow w-full min-w-12" disabled={disabled} onKeyDown={(e) => onKeyDown && onKeyDown(e.code)} onInput={(e) => onEmit(e.target.value)} value={value || ''} type={`${'text' && type}`} placeholder={placeholder} required={required} />
                <span className="">{ labelInside }</span>
              </label> :
              <input className="input input-bordered input-primary input-sm w-full" disabled={disabled} onKeyDown={(e) => onKeyDown && onKeyDown(e.code)} onInput={(e) => onEmit(e.target.value)} value={value || ''} type={`${'text' && type}`} placeholder={placeholder} required={required} />
        }
        <div className="label font-medium">
          <span className="label-text-alt">{blLabel}</span>
          <span className="label-text-alt">{brLabel}</span>
        </div>
      </label>
    </div>
  )
}
