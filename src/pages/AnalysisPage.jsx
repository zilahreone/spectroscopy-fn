import React, { useEffect, useMemo, useRef } from 'react'
import { useState } from 'react'
import IconButton from '../components/actions/IconButton'
import Drawer from '../components/Drawer'
import SearchInput from '../components/SearchInput'
import CheckBox from '../components/form/CheckBox'
import Button from '../components/actions/Button'
import Plot from 'react-plotly.js'
import api from '../service/api'
import keycloak from '../service/keycloak'
import CollapSubmenu from '../components/CollapSubmenu'
import DrawerTest from '../components/DrawerTest'
import MeasurementCard from '../components/MeasurementCard'
// import raw from '../assets/Arabinose%2015%25+PE85%25%20S1%20--%20FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan%20--%202024-04-05_16-03-01.0.dpt'

export default function AnalysisPage({ children }) {
  const [drawerActive, setDrawerActive] = useState(false)
  const [filter, setFilter] = useState({})
  const [x, setX] = useState([])
  const [y, setY] = useState([])
  const [ployData, setPlotData] = useState([])
  const [experiments, setExperiments] = useState([])

  const [experimentForm, setExperimentForm] = useState({
    instrument: null,
    collected_by: null,
    resolution: null,
    date_collection: null,
    type: null,
    organization: null,
    normalization: null,
    uploaded_by: null,
    number_spectra: null,
    other_details: null
  })

  useEffect(() => {
    api.get(`/api/experiments/all`, keycloak.token).then(resp => {
      resp.json().then(json => {
        setExperiments(json.map(experiment => ({
          ...experiment,
          name: experiment.chemical_name,
          isActive: false,
          files: [
            ...experiment.files.map(file => ({ ...file, isActive: false }))
          ],
          children: experiment.files.map(file => ({ name: file.name, isActive: false }))
        })))
      })
    })
  }, [])

  const wave2freq = (wave) => {
    const c = 3e8 // speed of light [m/s]
    const k = wave * 1e2 // wavenumber [m-1]
    const T = 1e12 // 1 terahertz
    // equation
    const v = (c * k) / T // Frequency in Terahertz unit
    return v
  }

  const showInOtherTab = (blob) => {
    const url = window.URL.createObjectURL(blob);
    // console.log(`${url}.pdf`);
    window.open(url, '_blank');
    // window.open(url);
  }

  const experimentMemo = useMemo(() => (
    experiments.filter((experiment, ex_index) => (experiment.isActive || experiment.children.some(child => child.isActive))).map(exFilter => (
      {
        ...exFilter,
        others_attachments: exFilter.others_attachments?.map(attachment => (
          {
            ...attachment,
            attachmentFn: (() => api.get(`/api/experiments/attachment/${exFilter.id}/${encodeURI(attachment.name)}`, keycloak.token).then(resp => resp.blob()).then(blob => showInOtherTab(blob)))
          }
        ))
      }
    ))
  ), [experiments])

  const fetchFile = async (id, name) => {
    const resp = await api.get(`/api/experiments/file/${id}/${encodeURI(name)}`, keycloak.token)
    const text = await resp.text()
    const arrKV = text.split(/\r?\n/)
    const obj = {}
    arrKV.forEach(element => {
      // const freq = wave2freq(element.split(/\,/)[0])
      // obj[freq] = element.split(/\,/)[1]
      // element && Object.assign(obj, { [wave2freq(element.split(/\,/)[0])]: element.split(/\,/)[1] })
      Object.assign(obj, { [wave2freq(element.split(/\,/)[0])]: element.split(/\,/)[1] })
    })
    return {
      x: Object.keys(obj),
      y: Object.values(obj),
      type: 'scatter'
    }
  }

  const plotMemo = useMemo(() => {
    // return experiments.map(experiment => experiment.children.filter(child => child.isActive))
    let arrFetch = []
    experiments.forEach(experiment => {
      experiment.children.forEach(child => {
        child.isActive && arrFetch.push(fetchFile(experiment.id, child.name))
      })
    })
    Promise.all(arrFetch).then(resp => {
      // return resp
      setPlotData(resp)
    })
  }, [experiments])

  const download = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    console.log(url);
    // const a = document.createElement('a');
    // a.style.display = 'none';
    // a.href = url;
    // // the filename you want
    // a.download = filename;
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // window.URL.revokeObjectURL(url);
  }

  const handleClickTest = () => {
    const ddd = api.get(`/api/experiments/file/2241dcd2-d5b4-4e6b-9c81-c2d0e7149952/${encodeURI('Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt')}`, keycloak.token)
      .then(resp => resp.text().then(text => {
        // console.log(text);
        if (text.length > 0) {
          const arrKV = text.split(/\r?\n/)
          const obj = {}
          arrKV.forEach(element => {
            const freq = wave2freq(element.split(/\,/)[0])
            obj[freq] = element.split(/\,/)[1]
          });
          // return obj
          setX(Object.keys(obj))
          setY(Object.values(obj))
        }
      }))
  }
  return (
    <>
      <DrawerTest
        id={'drawer-test'}
        sidebar={
          <>
            <SearchInput />
            <CollapSubmenu id={'test'} items={experiments} onEmit={(items) => setExperiments(items)} />
          </>
        }
        content={
          <>
            {children}
            <div className='h-[450px]'>
              <Plot
                // className='w-[400px] sm:w-[640px] md:w-[780px] lg:w-[800px] xl:w-[1000px]'
                className='w-full'
                layout={{ title: '', xaxis: { title: 'Frequency [THz]' }, yaxis: { title: 'Absorption [A.U.]' } }}
                data={ployData}
                config={{ responsive: true }}
              />
            </div>
            <div className='flex flex-col gap-y-2 p-4'>
              {
                experimentMemo.map((experiment, ex_index) => (
                  <MeasurementCard id={`measurememt_${ex_index}`} key={`experiment_${ex_index}`} item={experiment} />
                ))
              }
            </div>
          </>
        }
      />
    </>
  )
}
