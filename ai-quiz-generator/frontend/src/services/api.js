const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function generateQuiz(url, force=false){
  const res = await fetch(`${BASE_URL}/generate_quiz`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({url, force})
  })
  if(!res.ok){
    const err = await res.json().catch(()=>({detail: res.statusText}))
    throw new Error(err.detail || 'Failed to generate quiz')
  }
  return await res.json()
}

export async function listHistory(){
  const res = await fetch(`${BASE_URL}/history`)
  if(!res.ok) throw new Error('Failed to fetch history')
  return await res.json()
}

export async function fetchQuiz(id){
  const res = await fetch(`${BASE_URL}/quiz/${id}`)
  if(!res.ok) throw new Error('Quiz not found')
  return await res.json()
}