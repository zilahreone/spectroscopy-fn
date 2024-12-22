export default function TableList({ thead = [], tbody = [] }) {
  return (
    <div>
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            {
              thead.map((head) => (
                <th key={head}>{head}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            tbody.map((body, b_index) => (
              <tr key={`tr-${b_index}`}>
                {
                  body.map((b, f_index) => (
                    <td key={`${f_index}-${b}`}>
                      { b }
                      {/* <div dangerouslySetInnerHTML={{ __html: b }} /> */}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
