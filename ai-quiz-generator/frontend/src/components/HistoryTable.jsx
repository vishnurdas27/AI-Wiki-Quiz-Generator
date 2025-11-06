import React from 'react'

export default function HistoryTable({rows, onDetails}){
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-3">Past Quizzes</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="w-20">ID</th>
            <th>Title</th>
            <th>URL</th>
            <th className="w-52">Generated</th>
            <th className="w-28">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td className="truncate max-w-[16rem]">{r.title}</td>
              <td className="truncate max-w-[24rem]">{r.url}</td>
              <td>{new Date(r.date_generated).toLocaleString()}</td>
              <td>
                <button className="btn" onClick={()=> onDetails(r.id)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}