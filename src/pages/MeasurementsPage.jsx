import React, { useState } from 'react'
import InputForm from '../components/form/InputForm'
import FileInputForm from '../components/form/FileInputForm'
import SelectForm from '../components/form/SelectForm'
import RadioButton from '../components/actions/RadioButton'
import Label from '../components/Label'
import FileUpload from '../components/form/FileUpload'

export default function MeasurementsPage() {
  const [measurements, setMeasurements] = useState({
    type: 'bat'
  })
  const steps = ['General information', 'Measurement details', 'File upload']
  const [stepIndex, setStepIndex] = useState(0)
  const [uploadSpectra, setUploadSpectra] = useState([])
  const [uploadDetail, setUploadDetail] = useState([])

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
      {/* <div className='flex flex-col sm:flex-row gap-x-10 gap-y-0 w-full'>
        <div className='bg-slate-200 grow'>dfgdfg</div>
        <div className='bg-slate-300 grow'>zxfdfsd</div>
      </div> */}
      <div className='flex lg:flex-col flex-row'>
        <ul className="steps steps-vertical lg:steps-horizontal w-full mb-4">
          {
            steps.map((step, index) => (
              <li key={index} className={`step ${index <= stepIndex && 'step-primary'}`} >
                <div className='hidden lg:flex font-normal'>{step}</div>
              </li>
            ))
          }
          {/* <li className="step step-error" data-content="?">Sit on toilet</li> */}
        </ul>
        <div className=''>
          {
            stepIndex === 0 && (
              <div className='flex flex-col sm:flex-row gap-x-10 gap-y-0'>
                <div className='grow'>
                  {/* {JSON.stringify(measurements)} */}
                  <InputForm tlLabel={'Experiment name'}
                    required
                    onEmit={(val) => handleSetMeasurements('experiment_name', val)}
                  />
                  <InputForm tlLabel={'Date of collection'}
                    required
                    type={'date'}
                    onEmit={(val) => handleSetMeasurements('chemical_name', val)}
                  />
                  <InputForm tlLabel={'Organization'} onEmit={(val) => handleSetMeasurements('organization', val)} required />
                  <InputForm tlLabel={'Collected by'} onEmit={(val) => handleSetMeasurements('collected_by', val)} required />
                </div>
                <div className='grow'>
                  <InputForm tlLabel={'Chemical name'}
                    required
                    onEmit={(val) => handleSetMeasurements('chemical_name', val)}
                  />
                  {/* <div class="flex items-center mb-4">
                  <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                </div> */}
                  <Label name={'Measurement technique'} />
                  {/* <div className='flex flex-col grow-0'>
                  <div class="flex items-center mb-4 cursor-pointer">
                    <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                  </div>
                  <div class="flex items-center mb-4 cursor-pointer">
                    <input id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                  </div>
                </div> */}
                  <div className='w-fit'>
                    <RadioButton name={'measurement_techn'} label={'FTIR (Fourier-Transformed Infrared Spectroscopy)'} />
                    <RadioButton name={'measurement_techn'} label={'TDS (Time-Domain Spectroscopy)'} />
                    <RadioButton name={'measurement_techn'} label={'Raman Spectroscopy'} />
                  </div>
                </div>
              </div>
            )
          }
          {
            stepIndex === 1 && (
              <div className='w-[50%]'>
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
                <FileInputForm fileList={uploadDetail} onEmit={(files) => setUploadDetail(files)} id={'other'} label={'Upload details as attachment'} multiple tlLabel={'Other details'} />
              </div>
            )
          }
          {
            stepIndex === 2 && (
              <div className=''>
                <label className='font-normal'>Upload spectra</label>
                <FileUpload multiple id={'upload_spectra'}
                fileList={uploadSpectra}
                  onEmit={(files) => setUploadSpectra(files)}
                />
              </div>
            )
          }
        </div>
      </div>
      <div className=''>
        <button onClick={() => steps.length - 1 > stepIndex && setStepIndex(stepIndex + 1)}>next</button>
        <br />
        <button onClick={() => stepIndex > 0 && setStepIndex(stepIndex - 1)}>back</button>
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={() => document.getElementById('my_modal_4').showModal()}>open modal</button> */}
    </>
  )
}
