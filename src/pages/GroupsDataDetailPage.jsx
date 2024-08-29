import { useState } from "react"
import groups from "../utils/groups"
import { useLocation, useNavigation, useParams } from "react-router-dom"

export default function GroupsDataDetailPage() {
  const [menuIndex, setMenuIndex] = useState(0)
  const param = useParams()
  const navigation = useNavigation()
  const handleDownload = () => {
    console.log('asdadasd');
  }
  const menus = [
    {
      name: 'Dataset',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-8 h-8">
        <path d="M384 480l48 0c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224l-400 0c-11.4 0-21.9 6-27.6 15.9L48 357.1 48 96c0-8.8 7.2-16 16-16l117.5 0c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8L416 144c8.8 0 16 7.2 16 16l0 32 48 0 0-32c0-35.3-28.7-64-64-64L298.5 96c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l23.7 0L384 480z" />
      </svg>,
      content: <div>
        <p className="font-medium">Metadata and Resource</p>
        <div>
          <div className="flex items-center gap-x-2">
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
              <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z" />
            </svg> */}
            <p className="text-lg font-medium">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
          <div className="flex gap-x-2">
            <div className="flex gap-x-1 badge badge-outline p-2.5 cursor-pointer" onClick={() => handleDownload()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
                <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z" />
              </svg>
              <p className="text-xs font-normal">Download</p>
            </div>
            <div className="flex gap-x-1 badge badge-outline p-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                <path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z" />
              </svg>
              <p className="text-xs font-normal">12 Downloaded</p>
            </div>
          </div>
          <div className="divider"></div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-normal text-sm">Source : XXXXXXXXXXXXXXXXX</p>
          <div className="flex flex-col gap-2">
            <p className="font-normal text-sm">Detais</p>
            <p className="text-sm">
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
            </p>
          </div>
          <div className="flex flex-col font-normal text-sm gap-1">
            <div className="flex">
              <p className="flex-1">Year of data collection start</p>
              <p className="flex-1">2018</p>
            </div>
            <div className="flex">
              <p className="flex-1">Latest year of data collection</p>
              <p className="flex-1">2018</p>
            </div>
            <div className="flex">
              <p className="flex-1">Last updated date</p>
              <p className="flex-1">18 JAN 2024</p>
            </div>
            <div className="flex">
              <p className="flex-1">File format</p>
              <p className="flex-1">PDF</p>
            </div>
            <div className="flex">
              <p className="flex-1">File size</p>
              <p className="flex-1">100KB</p>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="flex flex-col gap-y-4">
          <p className="font-medium">Metadata</p>
          <table className="table-zebra w-full text-sm">
            {/* <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
        </thead> */}
            <tbody className="">
              <tr className="h-8">
                <td className="font-medium">Title</td>
                <td className="pl-8">Effect of Appropriate Starting Quantity to growth of Sea Grapes</td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">Group</td>
                <td className="pl-8"><div className="badge badge-primary">pure-samples</div></td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">Keyworld</td>
                <td className="pl-8">
                  <div className="flex gap-x-1 items-center">
                    <div className="badge badge-primary">pure-samples</div>
                    <div className="badge badge-primary">pure-samples</div>
                    <div className="badge badge-primary">pure-samples</div>
                  </div>
                </td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">Target</td>
                <td className="pl-8"><div className="badge badge-primary">XXXXX</div></td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">Component</td>
                <td className="pl-8"><div className="badge badge-primary">XXXXX</div></td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">Issue-level objectives of the master plan under the national strategy</td>
                <td className="pl-8"><div className="badge badge-primary">XXXXX</div></td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">Sustainable Development Goals</td>
                <td className="pl-8">
                  <div className="flex gap-x-1 items-center">
                    <div className="badge badge-primary">XXXXX</div>
                    <div className="badge badge-primary">XXXXX</div>
                  </div>
                </td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">The results of the work towards the national development goals (National Strategy)</td>
                <td className="pl-8">
                  1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">The results of the work towards the research objectives</td>
                <td className="pl-8">
                  1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">Target area</td>
                <td className="pl-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">Disclosure Level</td>
                <td className="pl-8">public</td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">License</td>
                <td className="pl-8">Open Government</td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">Researcher</td>
                <td className="pl-8">Ms. XXXX XXXXX</td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">Researcher Email</td>
                <td className="pl-8">xxxxxx@xxxx.com</td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">Status of dataset</td>
                <td className="pl-8">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    },
    {
      name: 'Groups',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-8 h-8">
        <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM609.3 512l-137.8 0c5.4-9.4 8.6-20.3 8.6-32l0-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2l61.4 0C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
      </svg>,
      content: <div className="flex gap-4">
        {
          groups.filter(gf => gf.id === 'pure-samples').map((group, index) => (
            <div key={`g_${index}`} className="flex flex-col border shadow-xl rounded-lg items-center w-44 min-w-[100px] cursor-pointer button-hover-animation">
              <div className="bg-saffron-800 w-full flex justify-center rounded-t-lg">
                <img src={`../../${group.src}`} className="w-20 m-4" />
              </div>
              <div className="text-center font-normal py-4">{group.title}</div>
            </div>
          ))
        }
      </div>
    },
    {
      name: 'Comment',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8">
        <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
      </svg>,
      content: <div className="text-center">Comment is not Available !!!</div>
    },
  ]
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-x-2">
        {
          menus.map((menu, index) => (
            <div key={index} onClick={() => setMenuIndex(index)} className={`flex flex-col items-center gap-1 border p-8 rounded-3xl cursor-pointer hover:bg-red-200 ${index === menuIndex && 'bg-persian_green-500'}`}>
              {menu.icon}
              <p className="font-normal">{menu.name}</p>
            </div>
          ))
        }
      </div>
      <div className="flex flex-col gap-8 bg-slate-100 mt-4">
        <p className="font-medium text-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
        <p className="text-sm">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        </p>
        <div className="flex flex-col gap-y-2 text-sm font-medium">
          <div className="flex">
            <p className="min-w-[100px] w-[200px]">Organization: </p>
            <p>NECTEC</p>
          </div>
          <div className="flex">
            <p className="min-w-[100px] w-[200px]">Modified: </p>
            <p className="w-fit flex-none">20 JAN 2024</p>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <p className="font-medium text-lg">{menus[menuIndex].name}</p>
      <div className="py-4">{menus[menuIndex].content}</div>
    </div>
  )
}
