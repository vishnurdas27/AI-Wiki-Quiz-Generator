import React, { useEffect, useState } from 'react'
import { fetchQuiz, listHistory } from '../services/api'
import HistoryTable from '../components/HistoryTable'
import Modal from '../components/Modal'
import QuizDisplay from '../components/QuizDisplay'


const Spinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);


const ErrorMessage = ({ message }) => (
  <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300">
    <p className="font-semibold">Error</p>
    <p>{message}</p>
  </div>
);

export default function HistoryTab() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [curr, setCurr] = useState(null);

  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        setRows(await listHistory());
      } catch (e) {
        console.error(e);
        setError(e.message || 'Failed to fetch history.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onDetails = async (id) => {
    try {
      setOpen(true);
      setModalLoading(true);
      setError(null);
      setCurr(null);
      
      const data = await fetchQuiz(id);
      setCurr(data);
    } catch (e) {
      console.error(e);
      setError(e.message || 'Failed to fetch quiz details.');
    } finally {
      setModalLoading(false);
    }
  };

  const onCloseModal = () => {
    setOpen(false);
    setCurr(null);
    setError(null);
  };

  if (loading) {
    return <Spinner />;
  }

  if (!loading && error && rows.length === 0) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="space-y-6">

      <div className="block sm:hidden space-y-3">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Quiz History</h2>
        {rows.map((row) => (
          <div key={row.id} className="card bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-sm flex items-center justify-between">
            <div>
              <div className="font-semibold text-zinc-900 dark:text-white">{row.title}</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                {new Date(row.date_generated).toLocaleDateString()}
              </div>
            </div>
            <button 
              onClick={() => onDetails(row.id)} 
              className="btn-secondary px-3 py-1.5 text-sm"
            >
              Details
            </button>
          </div>
        ))}
      </div>

      <div className="hidden sm:block">
        <HistoryTable rows={rows} onDetails={onDetails} />
      </div>

      <Modal open={open} onClose={onCloseModal} title={curr?.title || 'Quiz Details'}>
        {modalLoading ? (
          <Spinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : curr ? (
          <QuizDisplay data={curr} takeMode={false} />
        ) : null}
      </Modal>
    </div>
  );
}