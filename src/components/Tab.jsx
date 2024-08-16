import React, { useState } from 'react'

export default function Tab({ children, className, tabs = [], onEmit }) {
  const [tabIndex, setTabIndex] = useState(0)
  const handleClickIndex = (index) => {
    setTabIndex(index)
    onEmit(index)
  }
  return (
    <div className={className}>
      <div role="tab" className="tabs tabs-lifted w-fit">
        {
          tabs.map((tab, tab_index) => (
            <a onClick={() => handleClickIndex(tab_index)} key={`${tab_index}-${tab}`} role="tab" className={`tab ${tabIndex === tab_index && 'tab-active'} [--tab-bg:yellow] [--tab-border-color:orange] [--tab-border:3px]`}>{tab}</a>
          ))
        }
      </div>
      {children}
    </div>
  )
}
