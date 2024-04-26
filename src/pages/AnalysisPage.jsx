import React from 'react'
import { useState } from 'react'
import IconButton from '../components/actions/IconButton'
import Drawer from '../components/Drawer'
import SearchInput from '../components/SearchInput'
import CheckBox from '../components/form/CheckBox'

export default function AnalysisPage() {
  const [drawerActive, setDrawerActive] = useState(false)
  return (
    <>
      <Drawer drawerActive={drawerActive} onEmit={() => setDrawerActive(!drawerActive)}
        children={
          <IconButton
            onEmit={(val) => setDrawerActive(!drawerActive)}
            icon={
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
              </svg>

            }
          />
        }
        sideBar={
          <>
            <div className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
              <SearchInput />
              <CheckBox />
              <ul>
                {/* Sidebar content here */}
                <div>
                </div>
                <button className='lg:hidden' onClick={() => onEmit()}>close</button>
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
              </ul>
            </div>
          </>
        }
      />
      <div>
      </div>
    </>
  )
}
