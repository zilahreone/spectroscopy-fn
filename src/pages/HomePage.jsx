import React, { useEffect } from 'react'
import Stat from '../components/Stat'
import Button from '../components/actions/Button'
import { Link, Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import keycloak from '../service/keycloak'
import SearchInput from '../components/SearchInput'

export default function HomePage() {
  const navigate = useNavigate()
  const categoryData = useLoaderData([])
  // useEffect(() => {
  //   console.log(keycloak.token);
  // }, [])
  const handleSearch = (value) => {
  }
  return (
    <div>
      <div className='flex flex-col gap-y-8 bg-[#3e1f47] bg-opacity-50 pt-[50px] pb-[25px] custom-container'>
        <div className='grow text-white'>
          <p className='text-2xl font-semibold'>
            Spectroscopy signal analysis technologies and platforms
          </p>
        </div>
        <div className='grow min-w-[200px] flex flex-col md:flex-row justify-between'>
          <div className='md:w-96'>
            <SearchInput onEmit={(value) => handleSearch(value)} />
          </div>
          <div className='flex gap-x-2 md:gap-x-8 sm:gap-x-6 pt-11 justify-center'>
            <div className='cursor-pointer button-hover-animation hover: flex flex-col items-center justify-center rounded-3xl h-[135px] w-[125px] bg-slate-100 bg-opacity-25 font-medium text-[#eae4e9] gap-y-1'>
              <div className='h-10'>
                <svg className='w-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path fill="#eae4e9" d="M0 120L0 344c0 75.1 60.9 136 136 136l320 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-320 0c-48.6 0-88-39.4-88-88l0-224c0-13.3-10.7-24-24-24S0 106.7 0 120z" />
                  <path fill="#dfe7fd" d="M160 384H512c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H394.5c-17 0-33.3-6.7-45.3-18.7L322.7 50.7c-12-12-28.3-18.7-45.3-18.7H160c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64z" />
                </svg>
              </div>
              <p>1508</p>
              <p>Data</p>
            </div>
            <div className='cursor-pointer button-hover-animation hover: flex flex-col items-center justify-center rounded-3xl h-[135px] w-[125px] bg-slate-100 bg-opacity-25 font-medium text-[#eae4e9] gap-y-1'>
              <div className='h-10'>
                <svg className='w-9' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="#eae4e9" d="M267.6 3c-7.2-4-16-4-23.2 0L17.6 128.1C6.7 134.1 0 145.5 0 157.9C0 176.8 15.2 192 34.1 192l443.9 0c18.8 0 34.1-15.2 34.1-34.1c0-12.4-6.7-23.8-17.6-29.8L267.6 3zM228.3 144L88.2 144 256 51.4 423.8 144l-140.1 0c2.7-4.7 4.3-10.2 4.3-16c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 5.8 1.6 11.3 4.3 16zM64 224l0 160c-13.3 0-24 10.7-24 24s10.7 24 24 24l392 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-8 0 0-160-48 0 0 160-64 0 0-160-48 0 0 160-64 0 0-160-48 0 0 160-64 0 0-160-48 0zM32 464c-13.3 0-24 10.7-24 24s10.7 24 24 24l456 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L32 464z" />
                </svg>
              </div>
              <p>123</p>
              <p>Organization</p>
            </div>
            <div onClick={() => navigate('/groups')} className='cursor-pointer button-hover-animation hover: flex flex-col items-center justify-center rounded-3xl h-[135px] w-[125px] bg-slate-100 bg-opacity-25 font-medium text-[#eae4e9] gap-y-1'>
              <div className='h-10'>
                <svg className='w-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path fill="#eae4e9" className="fa-secondary" d="M0 320L48 192l148 0c-2.6 10.2-4 21-4 32c0 38.2 16.8 72.5 43.3 96L0 320zM224 80A80 80 0 1 1 64 80a80 80 0 1 1 160 0zM404.7 320c26.6-23.5 43.3-57.8 43.3-96c0-11-1.4-21.8-4-32l148 0 48 128-235.3 0zM592 80A80 80 0 1 1 432 80a80 80 0 1 1 160 0z" />
                  <path fill="#dfe7fd" className="fa-primary" d="M320 320a96 96 0 1 0 0-192 96 96 0 1 0 0 192zM512 512L464 352l-288 0L128 512l384 0z" />
                </svg>
              </div>
              <p>15</p>
              <p>Groups</p>
            </div>
          </div>
        </div>
      </div>
      <div className='custom-container bg-[#0b525b] bg-opacity-75 text-white py-12'>
        <div className='flex flex-col gap-8'>
          <p className='font-normal text-2xl'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <p className='text-md'>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          </p>
        </div>
      </div>
      <div className='flex flex-col gap-8 bg-persian_green-200 bg-opacity-75 custom-container text-white py-12'>
        <div className='flex flex-col gap-4'>
          <p className='text-2xl font-medium'>Dataset Categories</p>
          <p className=''>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
        </div>
        <div className='flex flex-wrap -mx-2 -my-3'>
          {
            categoryData.map((group, index) => (
              <div onClick={() => navigate(`/groups/${group.name}`)} key={index} className='px-2 py-3 min-w-[180px] basis-1/5 cursor-pointer'>
                <div className='hover:bg-slate-300 hover:scale-110 hover:-translate-y-1 transition duration-200 rounded-2xl ease-in-out transform hover:rounded-2xl hover:text-persian_green-200'>
                <div className='flex flex-col border rounded-t-2xl'>
                  <img className='p-4' src={group.src} alt="" />
                </div>
                <p className='p-4 w-full text-center font-medium border-b border-x rounded-b-2xl'>{group.title}</p>
                </div>
                {/* <div key={index} className='min-w-[150px] basis-1/6 hover:rounded-2xl button-hover-animation cursor-pointer hover:bg-slate-300 hover:text-persian_green-200'> */}
              </div>
            ))
          }
        </div>
      </div>
      {/* <Outlet /> */}
    </div>
    // <div>
    //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm203.5-95.6c-5.6 9.4-15.8 15.6-27.5 15.6c-17.7 0-32-14.3-32-32c0-9.1 3.8-17.4 10-23.2c-3.3-.5-6.6-.8-10-.8c-35.3 0-64 28.7-64 64l0 10.3c0 16.4 13.3 29.7 29.7 29.7l68.6 0c16.4 0 29.7-13.3 29.7-29.7l0-10.3c0-8.3-1.6-16.3-4.5-23.6zM384 176c-17.7 0-32-14.3-32-32c0-8.5 3.3-16.3 8.8-22c-5.4-1.3-11-2-16.8-2c-39.8 0-72 32.2-72 72l0 7.5c0 13.5 11 24.5 24.5 24.5l95.1 0c13.5 0 24.5-11 24.5-24.5l0-7.5c0-10.4-2.2-20.2-6.1-29.1c-5.8 8-15.2 13.1-25.9 13.1zM245.5 447.8c2.7 .1 5.4 .2 8.1 .2l4.9 0c55.1 0 105.1-26.1 137-67.5c0 0 0 0 0 0c15.7-20.5 27-44.6 32.4-71.3c2.2-11-6.2-21.2-17.4-21.2c0 0 0 0 0 0l-308.8 0s0 0 0 0c-11.2 0-19.6 10.2-17.4 21.2c15.6 78.1 82.4 135 161.2 138.6zm-5.4-32.5c1.5-44.1 37.8-79.4 82.2-79.4c19.9 0 38.1 7 52.3 18.7C349 392.1 306.1 416 258.4 416l-4.9 0c-4.6 0-9.1-.2-13.5-.6z" /></svg>
    //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
    // </div>
    // <div className="hero min-h-screen">
    //   <div className="hero-overlay bg-opacity-20"></div>
    //   <div className="absolute right-1/4 bottom-16 text-center">
    //     <div className='flex gap-2'>
    //       <Stat title={'Spectra'} value={20} />
    //       <Stat title={'Chemical types'} value={2} />
    //       <Stat title={'Organizations'} value={4} />
    //     </div>
    //     <div className='pt-2'>
    //       <Link to={'list'}>
    //         <Button name={'View all Spectra'} color={'primary'} className={'w-full'} />
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  )
}
