import React from 'react'
import { useEffect } from 'react'

export default function InputForm({ className, required, value, type = 'text', tlLabel, trLabel, blLabel, brLabel, placeholder, children, onEmit, onKeyDown, disabled = false, suffix = null, prefix = null }) {
  // useEffect(() => {
  //   console.log(`${'text' && type}`);

  // })
  const handleKeydown = (e) => {
    if (type === 'number') ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
    if (onKeyDown) {
      onKeyDown(e.code)
    }
  }
  const handleInput = (e) => {
    let value = e.target.value
    if (value) {
      if (prefix || suffix) {
        value = `${prefix || ''}${value}${suffix || ''}`
      } else {
        if (type === 'number' && value !== '0') {
          value = parseInt(value)
        }
      }
    }
    onEmit(value)
  }
  const handleValue = () => {
    value = value || '';
    if (prefix || suffix) {
      value = value.replace(prefix, '').replace(suffix, '')
    }
    return value
  }
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
            : suffix || prefix ?
              <label className="input input-sm input-bordered input-primary flex items-center gap-2">
                {
                  prefix && <span className="">{prefix}</span>
                }
                <input className="grow w-full min-w-12" disabled={disabled} onKeyDown={(e) => handleKeydown(e)} onInput={(e) => handleInput(e)} value={handleValue()} type={type} placeholder={placeholder} required={required} />
                <span className="">{suffix}</span>
              </label> :
              <input className="input input-bordered input-primary input-sm w-full" disabled={disabled} onKeyDown={(e) => handleKeydown(e)} onInput={(e) => handleInput(e)} value={handleValue()} type={type} placeholder={placeholder} required={required} />
        }
        <div className="label font-medium">
          <span className="label-text-alt">{blLabel}</span>
          <span className="label-text-alt">{brLabel}</span>
        </div>
      </label>
    </div>
  )
}
