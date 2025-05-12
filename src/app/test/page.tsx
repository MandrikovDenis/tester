'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function TestPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const site = searchParams.get('site');

  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!site) return;

    const runTest = async () => {
      try {
        const res = await fetch('/api/test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: site }),
        });

        const data = await res.json();

        setLogs(data.logs || []);

        setTimeout(() => {
          router.push(`/report?site=${encodeURIComponent(site)}&status=${data.status}`);
        }, 2000);
      } catch (err: any) {
        setError('Ошибка при выполнении тестов.');
        setLoading(false);
      }
    };

    runTest();
  }, [site, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white p-8">
      <h1 className="text-2xl font-bold">Запуск тестирования</h1>
      <p className="text-gray-700">Сайт: <span className="font-mono">{site}</span></p>

      {loading && (
        <div className="text-sm text-gray-500">Идёт выполнение тестов...</div>
      )}

      <div className="mt-6 w-full max-w-xl bg-gray-100 p-4 rounded shadow">
        {logs.map((log, index) => (
          <div key={index} className="mb-2 text-gray-800">
            {log}
          </div>
        ))}

        {error && <div className="text-red-600">{error}</div>}
      </div>
    </main>
  );
}
