import React, {useMemo, useState} from 'react'

export default function QuizDisplay({data, takeMode=false}){
  const quiz = data?.quiz || []
  const [answers, setAnswers] = useState({})
  const score = useMemo(()=>{
    let s = 0
    for(const [idx, q] of quiz.entries()){
      if(answers[idx] === q.answer) s++
    }
    return s
  }, [answers, quiz])

  return (
    <div className="space-y-6">
      <header className="card">
        <h2 className="text-2xl font-bold">{data?.title}</h2>
        <p className="mt-2 text-sm opacity-80">{data?.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {data?.sections?.map((s, i)=> (
            <span key={i} className="badge">{s}</span>
          ))}
        </div>
      </header>

      <section className="grid gap-4">
        {quiz.map((q, i)=> (
          <article key={i} className="card">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Q{i+1}. {q.question}</h3>
              <span className="badge capitalize">{q.difficulty}</span>
            </div>

            <ul className="mt-3 grid md:grid-cols-2 gap-2">
              {q.options.map((opt, k)=> (
                <li key={k}>
                  {takeMode ? (
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q-${i}`}
                        value={opt}
                        checked={answers[i]===opt}
                        onChange={()=> setAnswers(a=>({...a, [i]: opt}))}
                      />
                      <span>{opt}</span>
                    </label>
                  ) : (
                    <div className={`px-3 py-2 rounded-xl border ${opt===q.answer? 'border-green-500':'border-zinc-300 dark:border-zinc-700'}`}>
                      {opt}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {!takeMode ? (
              <p className="mt-3 text-sm opacity-80"><b>Answer:</b> {q.answer} — {q.explanation}</p>
            ) : null}
          </article>
        ))}
      </section>

      {takeMode ? (
        <footer className="card flex items-center justify-between">
          <div className="font-medium">Score: {score} / {quiz.length}</div>
          <div className="text-sm opacity-80">Select your answers above. Answers are not shown in take mode.</div>
        </footer>
      ) : null}

      {data?.related_topics?.length ? (
        <aside className="card">
          <h4 className="font-semibold">Related Wikipedia topics</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.related_topics.map((t, i)=> <span key={i} className="badge">{t}</span>)}
          </div>
        </aside>
      ) : null}

      {data?.key_entities ? (
        <aside className="card">
          <h4 className="font-semibold">Key entities</h4>
          <div className="grid md:grid-cols-3 gap-4 mt-3">
            <div>
              <div className="text-sm opacity-70">People</div>
              <ul className="list-disc ml-5">
                {data.key_entities.people?.map((p,i)=> <li key={i}>{p}</li>)}
              </ul>
            </div>
            <div>
              <div className="text-sm opacity-70">Organizations</div>
              <ul className="list-disc ml-5">
                {data.key_entities.organizations?.map((p,i)=> <li key={i}>{p}</li>)}
              </ul>
            </div>
            <div>
              <div className="text-sm opacity-70">Locations</div>
              <ul className="list-disc ml-5">
                {data.key_entities.locations?.map((p,i)=> <li key={i}>{p}</li>)}
              </ul>
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  )
}