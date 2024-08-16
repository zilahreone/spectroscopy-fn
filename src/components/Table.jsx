
export default function Table({ header = [], body = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="bg-base-300 border-0">
            {
              header.map((h, h_index) => (<th key={`${h_index}-${h}`} className="text-xs text-gray-700 py-2">{h}</th>))
            }
          </tr>
        </thead>
        <tbody>
          {
            body.map((bArr, bArr_index) => (
              <tr key={`${bArr_index}-Arr`} className="border-0 hover:bg-green-400 transition duration-300 ease-in-out">
                {
                  bArr.map((b, b_index) => (<td key={`${b_index}-${b}`} className="py-1 text-xs flex justify-between">
                    <div>{b}</div>
                    <div>5</div>
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
