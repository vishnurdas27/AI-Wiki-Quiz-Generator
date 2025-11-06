import React, { useEffect, useState } from 'react'
import { fetchQuiz, listHistory } from '../services/api'
import HistoryTable from '../components/HistoryTable'
import Modal from '../components/Modal'
import QuizDisplay from '../components/QuizDisplay'

export default function HistoryTab(){
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [curr, setCurr] = useState(null)

  useEffect(()=>{
    (async()=>{
      try{ setRows(await listHistory()) }catch(e){ console.error(e) }
    })()
  },[])

  const onDetails = async (id)=>{
    try{
      setCurr(await fetchQuiz(id))
      setOpen(true)
    }catch(e){ alert(e.message) }
  }

  return (
    <div className="space-y-6">
      <HistoryTable rows={rows} onDetails={onDetails} />
      <Modal open={open} onClose={()=> setOpen(false)} title={curr?.title || 'Quiz Details'}>
        {curr? <QuizDisplay data={curr} /> : null}
      </Modal>
    </div>
  )
}