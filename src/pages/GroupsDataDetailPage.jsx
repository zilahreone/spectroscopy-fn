import { useState } from "react"
import { useLocation, useNavigation, useParams } from "react-router-dom"

export default function GroupsDataDetailPage() {
  const [menuIndex, setMenuIndex] = useState(0)
  const param = useParams()
  const navigation = useNavigation()
  const handleDownload = () => {
    console.log('asdadasd');
  }
  return (
    <div>
      {/* <div className="flex flex-wrap items-center justify-center gap-x-2">
        {
          menus.map((menu, index) => (
            <div key={index} onClick={() => setMenuIndex(index)} className={`flex flex-col items-center gap-1 border p-8 rounded-3xl cursor-pointer hover:bg-red-200 ${index === menuIndex && 'bg-persian_green-500'}`}>
              {menu.icon}
              <p className="font-normal">{menu.name}</p>
            </div>
          ))
        }
      </div> */}
      <div className="flex flex-col gap-8 mt-4">
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
      <p className="font-medium text-lg">Dataset</p>
      <div className="py-4">
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
                <td className="pl-8"><div className="badge badge-primary cursor-pointer">pure-samples</div></td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">Keyworld</td>
                <td className="pl-8">
                  <div className="flex gap-x-1 items-center">
                    <div className="badge badge-primary cursor-pointer">pure-samples</div>
                    <div className="badge badge-primary cursor-pointer">pure-samples</div>
                    <div className="badge badge-primary cursor-pointer">pure-samples</div>
                  </div>
                </td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">Target</td>
                <td className="pl-8"><div className="badge badge-primary cursor-pointer">XXXXX</div></td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">Component</td>
                <td className="pl-8"><div className="badge badge-primary cursor-pointer">XXXXX</div></td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">Issue-level objectives of the master plan under the national strategy</td>
                <td className="pl-8"><div className="badge badge-primary cursor-pointer">XXXXX</div></td>
              </tr>
              <tr className="h-8">
                <td className="font-medium">Sustainable Development Goals</td>
                <td className="pl-8">
                  <div className="flex gap-x-1 items-center">
                    <div className="badge badge-primary cursor-pointer">XXXXX</div>
                    <div className="badge badge-primary cursor-pointer">XXXXX</div>
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
    </div>
  )
}
