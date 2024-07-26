import React from 'react'
import IconButton from './actions/IconButton'

export default function DrawerTest({ id, drawerActive, sidebar, content, onEmit }) {
  return (
    // <div className={`drawer lg:drawer-open ${drawerActive && 'drawer-open'}`}>
    //   <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    //   <div className="drawer-content flex flex-col">
    //     {/* Page content here */}
    //     {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
    //     {/* <div className='lg:hidden'> */}
    //     {children}

    //   </div>
    //   <div className="drawer-side">
    //     <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    //     {sideBar}
    //   </div>
    // </div>
    <>
      <div className="drawer lg:drawer-open">
        <input id={id} type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor={id} aria-label="close sidebar" className="drawer-overlay"></label>
          {/* <ul className="menu bg-base-200 text-base-content min-h-full w-80 lg:p-4 pt-20">
          Sidebar content here
          <li><a>Sidebar Item 1</a></li>
          <li><a>Sidebar Item 2</a></li>
          <li><a>Sidebar Item 3</a></li>
          <li><a>Sidebar Item 4</a></li>
        </ul> */}
          <div className="menu bg-base-200 text-base-content min-h-full w-80 lg:p-4 pt-20">{sidebar}</div>
        </div>
        <div className="drawer-content flex flex-col">
          {/* Page content here */}
          {/* {content} */}
          {/* <label htmlFor={id} className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label> */}
          <div className='min-w-[500px]'>{content}</div>
        </div>
      </div>
    </>
  )
}
