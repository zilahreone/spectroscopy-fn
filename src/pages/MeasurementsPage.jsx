import React, { useState } from 'react'
import InputForm from '../components/form/InputForm'
import FileInputForm from '../components/form/FileInputForm'
import SelectForm from '../components/form/SelectForm'
import Button from '../components/actions/Button'

export default function MeasurementsPage() {
  const [measurements, setMeasurements] = useState({})

  const handleSetMeasurements = (key, value) => {
    const nestedObject = (getObject, setObject) => {
      let newObj = getObject
      for (const [k, v] of Object.entries(setObject)) {
        if (typeof v === 'object' && v !== null) {
          newObj[k] = getObject[k] ? nestedObject(getObject[k], v) : nestedObject(setObject[k], v)
          // newObj = {
          //   ...getObject,
          //   [k]: nestedObject(getObject[k], v)
          // }
        } else {
          // newObj = {
          //   ...getObject,
          //   [k]: v
          // }
          newObj[k] = v
        }
      }
      return newObj
    }
    const convertFromStringToObject = (key, value) => {
      let k = key.split('\.')
      let tempObj = {}
      for (let i = k.length - 1; i >= 0; i--) {
        if (i === k.length - 1) {
          Object.assign(tempObj, { [k[i]]: value })
        } else {
          tempObj = {
            [k[i]]: tempObj
          }
        }
      }
      return tempObj
    }
    const conv = convertFromStringToObject(key, value)
    const merge = nestedObject(measurements, conv)
    console.log(merge);
    setMeasurements({
      ...measurements,
      ...merge
    })
    // console.log(nestedObject(
    //   {
    //     a: 0,
    //     b: {
    //       bb: 1,
    //       bc: 2,
    //       bd: {
    //         bda: 11,
    //         bdb: 12
    //       }
    //     },
    //     c: 3
    //   },
    //   {
    //     b: {
    //       bd: {
    //         cdf: 75
    //       }
    //     },
    //     d: 4
    //   }))
  }
  return (
    <>
      <form>
        <div className='flex flex-row'>
          <div className='grow'>
            {JSON.stringify(measurements)}
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
                  options={[{ name: 'a', value: 'ant' }, { name: 'b', value: 'bat' }]}
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
      </form>
      {/* <form class="max-w-sm mx-auto">
        <div class="mb-5">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <div class="mb-5">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div class="flex items-start mb-5">
          <div class="flex items-center h-5">
            <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
          </div>
          <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form> */}
    </>
  )
}
