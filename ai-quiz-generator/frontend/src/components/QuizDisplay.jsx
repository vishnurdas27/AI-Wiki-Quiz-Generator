import React, {useMemo, useState} from 'react'

export default function QuizDisplay({data, takeMode=true}){
  const quiz = data?.quiz || []
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false); 

  // Calculates score based on answers
  const score = useMemo(()=>{
    let s = 0

    for(const [idx, q] of quiz.entries()){
      if(answers[idx] === q.answer) s++
    }
    return s
  }, [answers, quiz])


  const processedQuiz = useMemo(() => {
    if (!quiz || quiz.length === 0) {
      return [];
    }
    return quiz.map(q => {
      const shuffledOptions = [...q.options];
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }
      return {
        ...q, 
        options: shuffledOptions 
      };
    });
  }, [quiz, submitted]);

  const submitQuiz = () =>{
    setSubmitted(true);
  }

 
  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false); 
  }


  const isReviewMode = !takeMode || (takeMode && submitted);

  return (
    <div className="space-y-6">
      {isReviewMode ? <header className="card bg-white dark:bg-zinc-800 shadow-sm rounded-xl p-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{data?.title}</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{data?.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {data?.sections?.map((s, i)=> (
            <span key={i} className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2.5 py-0.5 rounded-full text-xs font-medium">{s}</span>
          ))}
        </div>
      </header>:null}

      <section className="grid gap-4">
        {/* We now map over processedQuiz to get the shuffled options */}
        {processedQuiz.map((q, i)=> (
          <article key={i} className="card bg-white dark:bg-zinc-800 shadow-sm rounded-xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">Q{i+1}. {q.question}</h3>
              <span className="badge capitalize bg-gray-100 text-gray-800 dark:bg-zinc-700 dark:text-zinc-200 px-2.5 py-0.5 rounded-full text-xs font-medium">{q.difficulty}</span>
            </div>

            <ul className="mt-3 grid md:grid-cols-2 gap-2">
              {/* q.options is now the shuffled array from processedQuiz */}
              {q.options.map((opt, k)=> (
                <li key={k}>
                  {takeMode && !submitted ? (
                    // --- Quiz-Taking View ---
                    <label className="flex items-center gap-3 p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700/50 cursor-pointer has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/20 has-[:checked]:border-blue-400 dark:has-[:checked]:border-blue-600">
                      <input
                        type="radio"
                        name={`q-${i}`}
                        value={opt}
                        checked={answers[i]===opt}
                        // We use the *original* question index `i` to store the answer
                        onChange={()=> setAnswers(a=>({...a, [i]: opt}))}
                        className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-zinc-800 dark:text-zinc-200">{opt}</span>
                    </label>
                  ) : (
                    // --- Review View ---
                    <div className={`px-3 py-3 rounded-xl border ${
                      opt === q.answer
                        ? 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400 font-medium' // Correct answer
                        : (answers[i] === opt ? 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400' : 'border-zinc-300 dark:border-zinc-700') // Incorrect user answer
                    }`}>
                      {opt}
                      {isReviewMode && opt === q.answer && (
                        <span className="ml-2 font-bold text-xs">(Correct)</span>
                      )}
                      {isReviewMode && answers[i] === opt && opt !== q.answer && (
                        <span className="ml-2 font-bold text-xs">(Your Answer)</span>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Show explanation if in review mode */}
            {isReviewMode ? (
              <p className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400">
                <b>Answer:</b> {q.answer}
                <br />
                <b>Explanation:</b> {q.explanation}
              </p>
            ) : null}
          </article>
        ))}
      </section>

      {/* Footer only shows in takeMode */}
      {takeMode ? (
        <footer className="card bg-white dark:bg-zinc-800 shadow-sm rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button 
            onClick={submitted ? resetQuiz : submitQuiz}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800"
          >
            {submitted ? 'Retake Quiz' : 'Submit'}
          </button>
          
          {submitted ? <div className="font-medium text-lg text-zinc-900 dark:text-white">
            Score: {score} / {quiz.length}
          </div>:<div className="font-medium text-lg text-zinc-900 dark:text-white">
            Submit to see Result
          </div>}
          
          {submitted ? (
             <div className="font-bold text-lg text-blue-600 dark:text-blue-400 text-center sm:text-right">
               Quiz Complete!
             </div>
          ) : (
            <div className="text-sm text-zinc-500 dark:text-zinc-400 text-center sm:text-right">Select your answers above.</div>
          )}
        </footer>
      ) : null}

      {/* --- Related Topics and Key Entities (No changes) --- */}
      {data?.related_topics?.length ? (
        <aside className="card bg-white dark:bg-zinc-800 shadow-sm rounded-xl p-6">
          <h4 className="font-semibold text-zinc-900 dark:text-white">Related Wikipedia topics</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.related_topics.map((t, i)=> <span key={i} className="badge bg-gray-100 text-gray-800 dark:bg-zinc-700 dark:text-zinc-200 px-2.5 py-0.5 rounded-full text-xs font-medium">{t}</span>)}
          </div>
        </aside>
      ) : null}

      
    </div>
  )
}