
export default function Table({ header = [], body = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="bg-base-300 border-0">
            <div className="flex items-center px-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
                <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
              </svg>
              {
                header.map((h, h_index) => (<th key={`${h_index}-${h}`} className="text-sm text-gray-700 py-2">{h}</th>))
              }
            </div>
          </tr>
        </thead>
        <tbody>
          {
            body.map((bArr, bArr_index) => (
              <tr key={`${bArr_index}-Arr`} className="border-0 hover:bg-green-400 transition duration-300 ease-in-out">
                {
                  bArr.map((b, b_index) => (<td key={`${b_index}-${b}`} className="py-1 text-sm flex justify-between">
                    <div>{b}</div>
                    <div className="badge [--] badge-primary badge-sm">5</div>
                  </td>))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
