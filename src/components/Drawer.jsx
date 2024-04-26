import React from 'react'
import IconButton from './actions/IconButton'

export default function Drawer({ drawerActive, children, sideBar, onEmit }) {
  return (
    <div className={`drawer lg:drawer-open ${drawerActive && 'drawer-open'}`}>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
        <div className='lg:hidden'>
          { children }
        </div>

      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        { sideBar }
      </div>
    </div>
  )
}
