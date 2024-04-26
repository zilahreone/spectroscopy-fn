import React, { useState } from 'react'
import InputForm from '../components/form/InputForm'
import FileInputForm from '../components/form/FileInputForm'
import SelectForm from '../components/form/SelectForm'
import Button from '../components/actions/Button'

export default function MeasurementsPage() {
  const [measurements, setMeasurements] = useState({})
  const handleSetMeasurements = (key, value) => {
    let k = key.split('\.')
    let tempObj = {}
    for (let i = k.length - 1; i >= 0; i--) {
      if (i === k.length - 1) {
        Object.assign(tempObj, { [k[i]]: value })
      } else {
        tempObj = {
          // ...measurements,
          // ...tempObj,
          [k[i]]: tempObj
          
        }
      }
      // tempObj = {
        //   [k[i]]: i == k.length - 1 ? value : tempObj
        // }
      }
    // console.log(tempObj);
    const s = Object.assign(measurements, tempObj)
    console.log(s);
    // setMeasurements(Object.assign(measurements, tempObj))
  }
  return (
    <>
      <div className='flex flex-row'>
        <div className='grow'>
          { JSON.stringify(measurements) }
          <InputForm tlLabel={'Chemical name'}
            onEmit={(val) => handleSetMeasurements('instrument.type.data', val)}
            />
          <InputForm tlLabel={'Instrument'}
            onEmit={(val) => handleSetMeasurements('instrument.type.test', val)}
          />
          <InputForm tlLabel={'Type'}
            children={
              <SelectForm
                // selected={measurements.type}
                options={[{ name: 'a', value: 'ant'}, { name: 'b', value: 'bat' }]}
                onEmit={(val) => handleSetMeasurements('type', val)} 
              />
            }
          />
          {/* <InputForm tlLabel={'Normalization'} children={<SelectForm />} /> */}
          {/* <InputForm tlLabel={'Uploaded spectra'} children={<FileInputForm />} /> */}
        </div>
        <div className='grow'>
          {/* <InputForm tlLabel={'Collected by'} /> */}
          {/* <div className='flex'>
            <InputForm
              tlLabel={'Date of collection'}
              children={
                <input type='date' />
              }
            />
            <InputForm
              tlLabel={'Date of collection'}
              children={
                <input type='date' />
              }
            />
          </div> */}
          {/* <InputForm tlLabel={'Organization'} />
          <InputForm tlLabel={'Other details'} /> */}
        </div>
      </div>
      <div>
        <Button name={'Save'}

          icon={
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M11 16h2m6.707-9.293-2.414-2.414A1 1 0 0 0 16.586 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7.414a1 1 0 0 0-.293-.707ZM16 20v-6a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v6h8ZM9 4h6v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4Z" />
            </svg>
          }
        />
        <Button name={'Clear'}
          color='warning'
          icon={
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z" />
            </svg>
          }
        />
      </div>
    </>
  )
}
