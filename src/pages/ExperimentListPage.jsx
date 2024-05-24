import React, { useState } from 'react'
import IconButton from '../components/actions/IconButton'
import Label from '../components/Label'

export default function ExperimentListPage() {
  const [experiments, setExperiments] = useState([
    {
      experiment: 'Pure measurements',
      files: [
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
      ]
    },
    {
      experiment: 'Test measurements',
      files: [
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
      ]
    },
  ])
  const handleAddFile = (experIndex) => {
    let newExperiments = [...experiments]
    newExperiments[experIndex].files.push({ name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt' })
    setExperiments(newExperiments)
  }
  const handleRemoveFile = (experIndex, fileIndex) => {
    const newExperiments = [...experiments]
    newExperiments[experIndex].files = newExperiments[experIndex].files.toSpliced(fileIndex, 1)
    setExperiments(newExperiments)
  }
  return (
    <>
      <div className='flex text-lg font-medium justify-left mb-8'>ExperimentListPage</div>
      {
        experiments.map((exper, exp_index) => (
          <div key={exp_index} className={`${exp_index > 0 && 'mt-4'}`}>
            <div className='flex gap-x-2 mb-2'>
              <div className='flex items-center'>
                <div className='font-normal mr-2'>Experiment {exp_index + 1} :</div>
                <div className='mr-0'>{exper.experiment}</div>
                <div>
                  <ul className="menu menu-xs menu-horizontal">
                    <li>
                      <a className="tooltip" data-tip="Add Experiment" onClick={() => handleAddFile(exp_index)}>
                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a className="tooltip" data-tip="Rename">
                        <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a className="tooltip" data-tip="Delete">
                        <svg className="w-5 h-5 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {
              exper.files.map((file, f_index) => (
                <div key={f_index} className='flex gap-x-0 items-center'>
                  <IconButton
                    key={f_index}
                    onEmit={() => handleRemoveFile(exp_index, f_index)}
                    icon={
                      <svg className="w-6 h-6 text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    }
                  />
                  <Label name={file.name} />
                </div>
              ))
            }
          </div>
        ))
      }
    </>
  )
}
