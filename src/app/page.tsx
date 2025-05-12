'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleStartTest = () => {
    if (url.trim() === '') return;
    router.push(`/test?site=${encodeURIComponent(url)}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100 p-8">
      <h1 className="text-3xl font-bold">Система Автоматического Тестирования</h1>
      <input
        type="text"
        placeholder="Введите URL тестируемого сайта"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full max-w-md p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleStartTest}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Начать тестирование
      </button>
    </main>
  );
}
