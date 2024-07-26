import React, { useRef } from 'react'
import { useMemo } from 'react'
import { json } from 'react-router-dom'

export default function CollapSubmenu({ className, id, items = [], onEmit }) {
  const cRef = useRef([])

  const handleParent = (e, item_index, isParent = false) => {
    onEmit(items.map((item, index) => index === item_index ? { ...item, isActive: e.target.checked } : item))
    if (isParent) onEmit(items.map((item, index) => index === item_index ? { ...item, isActive: e.target.checked, children: item.children.map((child) => ({ ...child, isActive: e.target.checked})) } : item))
  }

  const handleChildren = (e, item_index, child_index) => {
    // console.log(e.target.checked);
    const itemActiveEvery = items[item_index].children.every((child, c_index) => c_index === child_index ? e.target.checked : child.isActive)
    const itemActiveSome = items[item_index].children.some((child, c_index) => c_index === child_index ? e.target.checked : child.isActive)
    // console.log(
    //   itemActiveEvery, itemActiveSome
    // );
    cRef.current[item_index].indeterminate = !itemActiveEvery && itemActiveSome
    onEmit(
      items.map((item, index) => (
        index === item_index ?
        {
          ...item,
          children: item.children.map((child, c_index) => c_index === child_index ? { ...child, isActive: e.target.checked } : child),
          isActive: itemActiveEvery
        } : item)
      )
    )   
  }
  return (
    <ul className="menu menu-xs bg-base-400 rounded-box">
      {
        items.map((item, item_index) => (
          <li key={`${item.name}_${item_index}`}>
            {
              item.children && item.children.length > 0 ?
                <details key={`${item.name}_${item_index}_child`} open>
                  <summary>
                    <div className='flex items-center gap-x-2'>
                      <input type="checkbox" className="checkbox checkbox-sm" ref={el => cRef.current[item_index] = el} checked={item.isActive} onChange={(e) => handleParent(e, item_index, true)} />
                      <a>{item.name}</a>
                    </div>
                  </summary>
                  <ul>
                    {
                      item.children.map((child, child_index) => (
                        <li key={`${item.name}_${item_index}_${child_index}`}>
                          <label className="">
                            <input type="checkbox" className="checkbox checkbox-sm" checked={child.isActive} onChange={(e) => handleChildren(e, item_index, child_index)} />
                            <span className="label-text text-xs">{child.name}</span>
                          </label>
                        </li>
                      ))

                    }
                  </ul>
                </details> :
                <label className="">
                  <input type="checkbox" className="checkbox checkbox-sm" onChange={(e) => handleParent(e, item_index)} />
                  <span className="label-text">{item.name}</span>
                </label>
              // <div className='flex items-center'>
              //   <input type="checkbox" className="checkbox checkbox-sm" />
              //   <a>{item.name}</a>
              // </div>
            }
          </li>
        ))
      }
    </ul>
    
  )
}
