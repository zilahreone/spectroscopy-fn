import React from 'react'

export default function CheckBox({ label }) {
  return (
    <>
      <label className="label cursor-pointer" style={{ paddingBottom: '0rem' }}>
        <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
        <span className="label-text grow px-2">{label}</span>
      </label>
    </>
  )
}
