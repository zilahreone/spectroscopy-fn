import { useEffect, useState } from "react"
import Plotly from 'plotly.js-dist-min'
import Plot from "react-plotly.js"
import { useLoaderData, useLocation, useNavigate, useNavigation, useParams } from "react-router-dom"
import api from "../service/api"
import keycloak from "../service/keycloak"

export default function GroupsDataDetailPage() {
  const experimentData = useLoaderData()
  const [menuIndex, setMenuIndex] = useState(0)
  const { id, detail } = useParams()
  const navigation = useNavigation()
  const navigator = useNavigate()
  const [plotData, setPlotData] = useState([])

  const wave2freq = (wave) => {
    const c = 3e8 // speed of light [m/s]
    const k = wave * 1e2 // wavenumber [m-1]
    const T = 1e12 // 1 terahertz
    // equation
    const v = (c * k) / T // Frequency in Terahertz unit
    return v
  }

  const fetchFile = (measurementId, filename) => {
    return new Promise((resolve, reject) => {
      api.get(`/api/measurement/${measurementId}/${filename}`, keycloak.token).then(resp => {
        if (resp.status === 200) {
          resp.text().then(text => {
            resolve(text)
            // console.log(text)
          })
          // resp.blob().then(blob => {
          //   resolve(blob)
          // })
        } else {
          reject(resp.status)
        }
      })
    })
  }

  useEffect(() => {
    (async () => {
      let plot = []
      // console.log(experimentData.measurements.length);
      for (const measurement of experimentData?.measurements) {
        const result = await fetchFile(measurement.id, measurement.attachment.name)
        const lines = result.split(/\r?\n/g).filter(res => res && !res.includes('#'))
        // console.log(lines.length);
        let plotObj = {
          x: [],
          y: [],
          type: 'scatter',
          name: measurement.name
        }
        switch (measurement?.raman?.typeData) {
          case 'single':
            lines.forEach(line => {
              const [sWave, sIntensity] = line.split(/\t/g).filter(tab => tab)
              plotObj.x.push(wave2freq(Number(sWave)))
              plotObj.y.push(Number(sIntensity))
            })
            plot.push(plotObj)
            break;
          case 'mapping':
            let axis = []
            // let names = []
            lines.forEach(line => {
              const [x, y, wave, intensity] = line.split(/\t/g).filter(tab => tab)
              const xy = `${x}|${y}`
              const name = `${measurement.name} [${xy}]`
              plotObj = {
                name: name,
                x: [],
                y: [],
                type: 'scatter'
              }
              // con
              if (!axis.includes(xy)) {
                axis.push(xy)
                // console.log(x);
                plotObj.x.push(Number(wave))
                plotObj.y.push(Number(intensity))
                plot.push(plotObj)
              } else {
                const index = axis.findIndex(a => a === xy)
                plot[index].x.push(Number(wave))
                plot[index].y.push(Number(intensity))
              }
            })
            // console.log(axis);
            break;
          default:
            break;
        }
      }
      // console.log(plot)
      setPlotData(plot)
    })()
  }, [])

  const handleDownload = () => {
    // console.log(experimentData);
    api.postJSON(`/api/download`, { experimentId: experimentData.id, userId: experimentData.user.id }, keycloak.token).then(resp => {
      if (resp.status === 201) {
        // console.log(resp);
      } else {
        resp.json().then(json => alert(JSON.stringify(json)))
      }
    })
    api.get(`/api/download/experiment/${experimentData.id}`, keycloak.token).then(resp => {
      if (resp.status === 200) {
        // console.log(...resp.headers);
        resp.blob().then(blob => {
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.setAttribute('download', `${experimentData.name}.zip`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          // clean up Url
          window.URL.revokeObjectURL(blobUrl);
        })
      } else {
        resp.json().then(json => alert(JSON.stringify(json)))
      }
    })
  }

  const convertUTCDateToLocalDate = (date) => {
    const d = new Date(date)
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
  }

  const displayFileSize = (size) => {
    if (size < 1024) {
      return `${size.toFixed(2)} Bytes`
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`
    }
  }

  return (
    <div>
      {/* <p className="font-medium text-lg">Dataset</p> */}
      <div className="flex flex-col gap-2">
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
              <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z" />
            </svg> */}
        <p className="text-xl font-medium">{experimentData.name}</p>
        <div className="flex gap-x-2">
          <div className="flex gap-x-1 badge badge-outline rounded p-2.5 cursor-pointer" onClick={() => handleDownload()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
              <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z" />
            </svg>
            <p className="text-xs font-normal">Download</p>
          </div>
          <div className="flex gap-x-1 badge badge-outline rounded p-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
              <path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z" />
            </svg>
            <p className="text-xs font-normal">{experimentData.downloads?.length} Downloaded</p>
          </div>
        </div>
      </div>
      <Plot
        className="mt-6 h-full w-full"
        divId="plotlyRef"
        layout={
          {
            // hovermode: 'closest',
            modebar: { orientation: 'h' },
            margin: { l: 50, r: 0, t: 60, b: 40 },
            legend: { orientation: 'h', x: 0, y: 1, xanchor: 'left', yanchor: 'bottom' }, // TOP LEGEND
            // legend: { orientation: 'v', x: 0, y: -0.5, xanchor: 'left', yanchor: 'top' },  // BOTTOM LEGEND
            height: 500,
            showlegend: experimentData.measurements?.length === plotData.length,
            title: '',
            xaxis: { title: experimentData.technique.name === 'raman' ? 'Raman Shift (cm^-1)' : 'Absorption [A.U.]' },
            yaxis: { title: 'Frequency [THz]' }
          }
        }
        data={plotData}
        // 'pan2d','select2d','lasso2d','resetScale2d','zoomOut2d'
        config={{ responsive: true, modeBarButtonsToRemove: [] }}
        onHover={(eventdata) => {
          const points = eventdata.points[0], pointNum = points.pointNumber
          Plotly.Fx.hover('plotlyRef', Array.from(Array(plotData.length)).map((_, index) => ({ curveNumber: index, pointNumber: pointNum })))
        }}
      />
      <div className="divider"></div>
      <div className="flex flex-col gap-y-4">
        <p className="font-medium">Metadata</p>
        {/* <pre>{ JSON.stringify(measurementData, null, 2) }</pre> */}
        <table className="table-zebra w-full text-sm">
          <tbody className="">
            <tr className="h-8">
              <td className="pl-4 font-medium">Experiment Name</td>
              <td className="pl-0"><div className="badge badge-primary cursor-pointer" onClick={() => navigator(`/experiments/${experimentData.name}`)}>{experimentData.name}</div></td>
            </tr>
            <tr className="h-8">
              <td className="pl-4 font-medium">Sample Name</td>
              <td className="pl-0"><div className="badge badge-primary cursor-pointer" onClick={() => navigator(`/samples/${experimentData.sample?.name}`)}>{experimentData.sample?.name}</div></td>
            </tr>
            <tr className="h-8">
              <td className="pl-4 font-medium">Chemical Name</td>
              <td className="pl-0">{experimentData.sample?.chemical?.name}</td>
            </tr>
            <tr className="h-8">
              <td className="pl-4 font-medium">Technique</td>
              <td className="pl-0">{experimentData.technique.name}</td>
            </tr>
            <tr className="h-8">
              <td className="pl-4 font-medium">Instrument</td>
              <td className="pl-0">{experimentData.instrument.name}</td>
            </tr>
            <tr className="h-8">
              <td className="pl-4 font-medium">Equipment Type</td>
              <td className="pl-0">{experimentData.equipmentType.name}</td>
            </tr>
            <tr className="h-8">
              <td className="pl-4 font-medium">Organization</td>
              <td className="pl-0">{experimentData.organization.name}</td>
            </tr>
            <tr className="h-8">
              <td className="pl-4 font-medium">Category</td>
              <td className="pl-0"><div className="badge badge-primary cursor-pointer" onClick={() => navigator(`/categorys/${id}`)}>{id}</div></td>
            </tr>
            <tr className="h-8">
              <td className="pl-4 font-medium">Created date</td>
              <td className="pl-0">{convertUTCDateToLocalDate(experimentData.createAt)}</td>
            </tr>
            <tr className="h-8">
              <td className="pl-4 font-medium">Updated date</td>
              <td className="pl-0">{convertUTCDateToLocalDate(experimentData.updateAt)}</td>
            </tr>
            <tr className="h-8">
              <td className="pl-4 font-medium">Measurements</td>
              {/* <td className="pl-0">{ measurementData.organization.name }</td> */}
            </tr>
          </tbody>
        </table>
        {
          experimentData.measurements?.map((measurement, index) => (
            <table key={`measurement-${index}`} className="table-zebra w-full text-sm">
              <tbody className="" >
                <tr className="h-6">
                  <td className="pl-8 text-xs font-medium">Name</td>
                  <td className="pl-0" colSpan={3}><div className="badge badge-primary cursor-pointer" onClick={() => navigator(`/measurements/${measurement.name}`)}>{measurement.name}</div></td>
                </tr>
                <tr className="h-6">
                  <td className="pl-8 text-xs font-medium">Spectrum Description</td>
                  <td className="" colSpan={3}>{measurement.spectrumDescription}</td>
                </tr>
                <tr className="h-6">
                  <td className="pl-8 text-xs font-medium">Remark</td>
                  <td className="" colSpan={3}>{measurement.remark}</td>
                </tr>
                {
                  experimentData.technique.name === 'raman' && (
                    <>
                      <tr className="h-6">
                        <td className="pl-8 text-xs font-medium" colSpan={4}>Measurement Condition</td>
                      </tr>
                      <tr className="h-6">
                        <td className="pl-16 text-xs font-medium">Wave Length</td>
                        <td className="">{measurement.raman?.measurementCondition?.waveLength}</td>
                        <td className="pl-16 text-xs font-medium">Laser Power</td>
                        <td className="">{measurement.raman?.measurementCondition?.laserPower}</td>
                      </tr>
                      <tr className="h-6">
                        <td className="pl-16 text-xs font-medium">Exposure Time</td>
                        <td className="">{measurement.raman?.measurementCondition?.exposureTime}</td>
                        <td className="pl-16 text-xs font-medium">Lens</td>
                        <td className="">{measurement.raman?.measurementCondition?.lens}</td>
                      </tr>
                      <tr className="h-6">
                        <td className="pl-16 text-xs font-medium">Accumulations</td>
                        <td className="" colSpan={3}>{measurement.raman?.measurementCondition?.accumulations}</td>
                      </tr>
                      <tr className="h-6">
                        <td className="pl-8 text-xs font-medium" colSpan={4}>Measurement Technique</td>
                      </tr>
                      <tr className="h-6">
                        <td className="pl-16 text-xs font-medium" colSpan={4}>Sers</td>
                      </tr>
                      <tr className="h-6">
                        <td className="pl-24 text-xs font-medium">Chip</td>
                        <td className="">{measurement.raman?.measurementTechnique?.sers?.chip}</td>
                        <td className="pl-24 text-xs font-medium">Nanoparticles</td>
                        <td className="">{measurement.raman?.measurementTechnique?.sers?.nanoparticles}</td>
                      </tr>
                      <tr className="h-6">
                        <td className="pl-24 text-xs font-medium">Papers</td>
                        <td className="">{measurement.raman?.measurementTechnique?.sers?.papers}</td>
                        <td className="pl-24 text-xs font-medium">Other</td>
                        <td className="">{measurement.raman?.measurementTechnique?.sers?.other}</td>
                      </tr>
                      <tr className="h-6">
                        <td className="pl-8 text-xs font-medium">Type of Data</td>
                        <td className="" colSpan={3}>{measurement.raman?.typeData}</td>
                      </tr>
                    </>
                  )
                }
                {/* { JSON.stringify(measurement, null, 2) } */}
                <tr className="h-6">
                  <td className="pl-8 text-xs font-medium">File name</td>
                  <td className="" colSpan={3}>{measurement.attachment.name}</td>
                </tr>
                <tr className="h-6">
                  <td className="pl-8 text-xs font-medium">File Format</td>
                  <td className="" colSpan={3}>{measurement.attachment.fileExt}</td>
                </tr>
                <tr className="h-6">
                  <td className="pl-8 text-xs font-medium">File size</td>
                  <td className="" colSpan={3}>{displayFileSize(parseInt(measurement.attachment.size))}</td>
                </tr>
                <tr className="h-6">
                  <td className="pl-8 text-xs font-medium">File created</td>
                  <td className="" colSpan={3}>{convertUTCDateToLocalDate(measurement.createAt)}</td>
                </tr>
                <tr className="h-6">
                  <td className="pl-8 text-xs font-medium">File updated</td>
                  <td className="" colSpan={3}>{convertUTCDateToLocalDate(measurement.updateAt)}</td>
                </tr>
              </tbody>
            </table>
          ))
        }
      </div>
    </div>
  )
}
