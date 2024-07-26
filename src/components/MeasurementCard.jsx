import React from 'react'
import keycloak from '../service/keycloak'
import api from '../service/api'

export default function MeasurementCard({ id, item }) {
  return (
    <div className="flex flex-row gap-x-2 sm:gap-x-3 md:gap-x-5 lg:gap-x-8 border-2 rounded-md px-4 py-2 min-w-[500px]">
      <table className='basis-1/2 h-fit border-separate border-spacing-0'>
        <thead>
          {
            [{ 'Instrument': item.instrument }, { 'Resolution': 'xxxxx' }, { 'Normalization': item.normalization }, { 'Number of spectra': item.children?.length }].map((label, l_index) => (
              <tr key={`${id}_l_${l_index}`}>
                <td className='w-0 text-right text-nowrap text-sm font-medium pr-4 align-top'>{Object.keys(label)}:</td>
                <td className='text-sm'>{Object.values(label)}</td>
              </tr>
            ))
          }
        </thead>
      </table>
      <table className='basis-1/2 h-fit border-separate border-spacing-0'>
        <thead>
          {
            [{ 'Collected by': item.collected_by }, { 'Date of collection': item.date_collection }, { 'Organization': item.organization }, { 'Uploaded by': item.created_by?.preferred_username },
            {
              'Other details': <div key={`${id}_attachment`} className='flex flex-col gap-y-1'>
                {
                  item.others_attachments?.map((attachment, at_index) => (
                    <button key={`${id}_attachment_${at_index}`} className="btn btn-xs w-fit" onClick={() => attachment.attachmentFn()}>{attachment.name}</button>
                  ))
                }
              </div>
            }].map((label, l_index) => (
              <tr key={`${id}_r_${l_index}`}>
                <td className='w-0 text-right text-nowrap text-sm font-medium pr-4 align-top'>{Object.keys(label)}:</td>
                <td className='text-sm'>{Object.values(label)}</td>
              </tr>
            ))
          }
        </thead>
      </table>
    </div>
  )
}
