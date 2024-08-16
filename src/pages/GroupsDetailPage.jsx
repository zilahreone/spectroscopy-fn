import { useEffect, useState } from "react";
import Tab from "../components/Tab";
import groups from "../utils/groups";
import { useParams } from "react-router-dom";
import Table from "../components/Table";
import SearchInput from "../components/SearchInput";

export default function GroupsDetailPage() {
  const { id } = useParams();
  const [groupDetail, setGroupDetail] = useState({})
  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    // console.log(
    //   groups.filter(group => group.id === groupId)[0]
    // );
    setGroupDetail(groups.filter(group => group.id === id)[0])
  }, [])

  const renderTabContent = () => {
    switch (tabIndex) {
      case 0:
        return <>
        <div className="flex flex-col gap-2">
          <SearchInput />
          <div className="flex justify-between">
            <p className="text-lg font-normal">found 4 datasets</p>
          </div>
          <div>adss</div>
        </div>
        </>
      case 1:
        return <>
          <div className="flex flex-col gap-4">
            <p className="text-gray-700 text-4xl font-medium">{groupDetail.title}</p>
            <p className="">
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:

              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”

              The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.

              The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.
            </p>
          </div>
        </>
      default:
        break;
    }
  }
  return (
    <div>
      {/* <div>GroupsDetailPage</div> */}
      <div className="flex flex-col border-2 gap-0">
        <Tab className="" tabs={['Datasets', 'About']} onEmit={(index) => setTabIndex(index)} >
          <div className="flex flex-col sm:flex-row gap-x-10 gap-y-0 ">
            <div className="flex flex-col gap-2 min-w-[150px] max-w-[300px]">
              <img
                className='p-2'
                src={`../${groupDetail.src}`}
                alt={groupDetail.title}
              />
              {
                tabIndex === 0 && (
                  <div>
                    <Table header={['Oganization']} body={[['dfsfd'], ['sdfsdf']]} />
                    <Table header={['Equipment Type']} body={[['Portable'], ['Bench Hook']]} />
                    <Table header={['Measurment Technique']} body={[['Raman'], ['FTIR'], ['TDS']]} />
                    <Table header={['State']} body={[['Solid'], ['Liquid'], ['Gas']]} />
                  </div>
                )
              }
            </div>
            <div className="flex-1">{renderTabContent()}</div>
          </div>
        </Tab>
      </div>
    </div>
  )
}
