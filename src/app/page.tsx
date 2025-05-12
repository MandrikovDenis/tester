'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [scenario, setScenario] = useState('login');
  const [testId, setTestId] = useState('');
  const [tests, setTests] = useState<any[]>([]);

  const runTest = async () => {
    const res = await fetch('http://localhost:8000/run-test/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, scenario }),
    });
    const data = await res.json();
    setTestId(data.test_id);
  };

  const loadTests = async () => {
    const res = await fetch('http://localhost:8000/tests');
    const data = await res.json();
    setTests(data);
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Автоматическое тестирование сайта</h1>

      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="URL сайта (например, http://localhost:3001)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 w-full"
        />
        <select
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="login">Проверка логина</option>
          <option value="navigation">Переходы по ссылкам</option>
          <option value="form_check">Формы</option>
        </select>
        <button
          onClick={runTest}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Запустить тест
        </button>
      </div>

      <button
        onClick={loadTests}
        className="bg-gray-800 text-white px-4 py-2 rounded mb-4"
      >
        Обновить историю
      </button>

      <h2 className="text-xl mb-2">История тестов</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">URL</th>
            <th className="border px-2 py-1">Сценарий</th>
            <th className="border px-2 py-1">Статус</th>
            <th className="border px-2 py-1">Результат</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((t) => (
            <tr key={t.id}>
              <td className="border px-2 py-1">{t.id}</td>
              <td className="border px-2 py-1">{t.url}</td>
              <td className="border px-2 py-1">{t.scenario}</td>
              <td className="border px-2 py-1">{t.status}</td>
              <td className="border px-2 py-1">{t.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
