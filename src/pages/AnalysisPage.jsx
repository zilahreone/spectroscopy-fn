import React, { useEffect } from 'react'
import { useState } from 'react'
import IconButton from '../components/actions/IconButton'
import Drawer from '../components/Drawer'
import SearchInput from '../components/SearchInput'
import CheckBox from '../components/form/CheckBox'
import Button from '../components/actions/Button'
import Plot from 'react-plotly.js'
// import raw from '../assets/Arabinose%2015%25+PE85%25%20S1%20--%20FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan%20--%202024-04-05_16-03-01.0.dpt'

export default function AnalysisPage() {
  const [drawerActive, setDrawerActive] = useState(false)
  const [filter, setFilter] = useState({})
  const [x, setX] = useState([])
  const [y, setY] = useState([])

  useEffect(() => {
  }, [])


  const wave2freq = (wave) => {
    const c = 3e8 // speed of light [m/s]
    const k = wave * 1e2 // wavenumber [m-1]
    const T = 1e12 // 1 terahertz
    // equation
    const v = (c * k) / T // Frequency in Terahertz unit
    return v
  }
  const readDirectory = (directory) => {
    let dirReader = directory.createReader();
    let entries = [];

    let getEntries = () => {
      dirReader.readEntries(
        (results) => {
          if (results.length) {
            entries = entries.concat(toArray(results));
            getEntries();
          }
        },
        (error) => {
          /* handle error — error is a FileError object */
        },
      );
    };

    getEntries();
    return entries;
  }
  const showFile = () => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      var preview = document.getElementById('show-text');
      var file = document.querySelector('input[type=file]').files[0];
      var reader = new FileReader()

      var textFile = /asd./;

      // console.log(file);

      reader.onload = function (event) {
        const arrKV = event.target.result.split(/\r?\n/)
        const obj = {}
        arrKV.forEach(element => {
          const freq = wave2freq(element.split(/\,/)[0])
          obj[freq] = element.split(/\,/)[1]
        });
        setX(Object.keys(obj))
        setY(Object.values(obj))
        // console.log((obj));
        // console.log(obj.keys());
        // kv.forEach(element => {
        //   console.log(element);
        // });
        // preview.innerHTML = event.target.result;
      }
      if (file.type.match(textFile)) {
      } else {
        preview.innerHTML = "<span class='error'>It doesn't seem to be a text file!</span>";
      }
      reader.readAsText(file);

    } else {
      alert("Your browser is too old to support HTML5 File API");
    }
  }
  return (
    <>
      <Drawer drawerActive={drawerActive} onEmit={() => setDrawerActive(!drawerActive)}
        children={
          <>
            <IconButton
              onEmit={(val) => setDrawerActive(!drawerActive)}
              icon={
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
                </svg>

              }
            />
            <div>
              <Plot
                layout={{ title: '', xaxis: { title: 'Frequency [THz]' }, yaxis: { title: 'Absorption [A.U.]' } }}
                data={[
                  {
                    x: x,
                    y: y,
                    type: 'scatter',
                    // mode: 'lines+markers',
                    // marker: { color: 'red' },
                  },
                  // {
                  //   x: x,
                  //   y: y,
                  //   type: 'scatter',
                  //   // mode: 'lines+markers',
                  //   marker: { color: 'red' },
                  // },
                  // { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
                ]}
              // layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
              />
            </div>
            <div>
              <input type="file" onChange={showFile} />
              <div id="show-text">Choose text File</div>
            </div>
          </>
        }
        sideBar={
          <>
            <div className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
              <SearchInput />
              <CheckBox label={'asdasd'} />
              <CheckBox label={'asdasd'} />
              <button className='bg-slate-300'>sdasdf</button>
              <ul>
                {/* Sidebar content here */}
                <div>
                </div>
                <button className='lg:hidden' onClick={() => setDrawerActive(!drawerActive)}>close</button>
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
              </ul>
              <Button name={'Upload new spectra'}
                color={'primary'}
                icon={
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01" />
                  </svg>

                }
              />
            </div>
          </>
        }
      />
      <div>
      </div>
    </>
  )
}
