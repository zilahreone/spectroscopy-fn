import React, { useState } from 'react'
import InputForm from '../components/form/InputForm'
import FileInputForm from '../components/form/FileInputForm'
import SelectForm from '../components/form/SelectForm'
import Button from '../components/actions/Button'

export default function MeasurementsPage() {
  const [measurements, setMeasurements] = useState({
    type: 'bat'
  })

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
    // console.log(merge);
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
        <div className='flex flex-col sm:flex-row gap-x-10 gap-y-0'>
          <div className='grow'>
            {/* {JSON.stringify(measurements)} */}
            <InputForm tlLabel={'Chemical name'}
              required
              onEmit={(val) => handleSetMeasurements('chemical_name', val)}
            />
            <InputForm tlLabel={'Instrument'}
              required
              onEmit={(val) => handleSetMeasurements('instrument', val)}
            />
            <SelectForm
              required
              tlLabel={'Type'}
              selected={measurements.type}
              options={[{ name: 'a', value: 'ant' }, { name: 'b', value: 'bat' }]}
              onEmit={(val) => handleSetMeasurements('type', val)}
            />
            <SelectForm
              required
              tlLabel={'Normalization'}
              // selected={measurements.type}
              options={[{ name: 'a', value: 'ant' }, { name: 'b', value: 'bat' }]}
              onEmit={(val) => handleSetMeasurements('normalization', val)}
            />
            <FileInputForm tlLabel={'Uploaded spectra'} />
          </div>
          <div className='grow'>
            <InputForm tlLabel={'Collected by'} onEmit={(val) => handleSetMeasurements('collected_by', val)} required />
            <InputForm tlLabel={'Date of collection'}
              required
              type={'date'}
              onEmit={(val) => handleSetMeasurements('chemical_name', val)}
            />
            <InputForm tlLabel={'Organization'} onEmit={(val) => handleSetMeasurements('organization', val)} required />
            <FileInputForm tlLabel={'Other details'} />
          </div>
        </div>
      </form>
      {/* <form>
        <div className='flex'>
          <div className=''>
            {JSON.stringify(measurements)}
            <InputForm tlLabel={'Chemical name'}
              required
              onEmit={(val) => handleSetMeasurements('chemical_name', val)}
            />
            <InputForm tlLabel={'Instrument'}
              required
              onEmit={(val) => handleSetMeasurements('instrument', val)}
            />
            <SelectForm
              required
              tlLabel={'Type'}
              selected={measurements.type}
              options={[{ name: 'a', value: 'ant' }, { name: 'b', value: 'bat' }]}
              onEmit={(val) => handleSetMeasurements('type', val)}
            />
            <SelectForm
              required
              tlLabel={'Normalization'}
              // selected={measurements.type}
              options={[{ name: 'a', value: 'ant' }, { name: 'b', value: 'bat' }]}
              onEmit={(val) => handleSetMeasurements('normalization', val)}
            />
            <FileInputForm tlLabel={'Uploaded spectra'} />
          </div>
          <div className=''>
            <InputForm tlLabel={'Collected by'} onEmit={(val) => handleSetMeasurements('collected_by', val)} required />
            <div className='flex'>
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
            </div>
            <InputForm tlLabel={'Organization'} onEmit={(val) => handleSetMeasurements('organization', val)} required />
            <FileInputForm tlLabel={'Other details'} />
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
      </form> */}
    </>
  )
}
