import React, { useState } from 'react'
import { generateQuiz } from '../services/api'
import QuizDisplay from '../components/QuizDisplay'

export default function GenerateQuizTab(){
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)
  const [takeMode, setTakeMode] = useState(true)

  const onSubmit = async (e)=>{
    e.preventDefault()
    setError('')
    if(!/^https?:\/\/.+/.test(url)){
      setError('Please enter a valid URL starting with http(s)')
      return
    }
    setLoading(true)
    try{
      const res = await generateQuiz(url)
      setData(res)
    }catch(err){
      setError(err.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="card flex flex-col gap-3">
        <label className="text-sm">Wikipedia URL</label>
        <input className="input" placeholder="https://en.wikipedia.org/wiki/Alan_Turing" value={url} onChange={e=> setUrl(e.target.value)} />
        <div className="flex items-center gap-3">
          <button className="btn" disabled={loading}>{loading? 'Generating…' : 'Generate Quiz'}</button>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={takeMode} onChange={e=> setTakeMode(e.target.checked)} /> Take Quiz mode
          </label>
        </div>
        {error? <div className="text-red-600 text-sm">{error}</div> : null}
      </form>

      {data ? <QuizDisplay data={data} takeMode={takeMode} /> : (
        <div className="card text-sm opacity-75">Enter a Wikipedia URL above to generate a quiz.</div>
      )}
    </div>
  )
}