'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ReportPage() {
  const searchParams = useSearchParams();
  const testId = searchParams.get('testId');

  const [logs, setLogs] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!testId) {
      setError('Ошибка: Не указан ID теста.');
      return;
    }

    fetch(`/api/result?testId=${testId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.logs) setLogs(data.logs);
        else setError('Логи не найдены.');
      })
      .catch(() => setError('Ошибка при получении логов.'));
  }, [testId]);

  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!logs) return <div className="p-8">Загрузка логов...</div>;

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Отчет по тесту</h1>
      <ul className="list-disc list-inside">
        {logs.map((log, idx) => (
          <li key={idx}>{log}</li>
        ))}
      </ul>
    </div>
  );
}
