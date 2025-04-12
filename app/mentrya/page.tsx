'use client';

import { useState } from 'react';

export default function MentryaPage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch('/api/mentrya', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setResponse(data.reply ?? null);
      if (!data.reply) setError('⚠️ Nessuna risposta ricevuta da Mentrya.');
    } catch {
      setError('❌ Errore nella comunicazione con Mentrya.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">👩‍🏫 Mentrya</h1>
      <p className="text-gray-700 mb-8 max-w-2xl">
        Fai una domanda a Mentrya. Può aiutarti con riassunti, studio, concetti difficili e molto altro!
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-xl"
          placeholder="Scrivi la tua domanda..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-xl"
          disabled={loading}
        >
          {loading ? 'Sto pensando...' : 'Chiedi a Mentrya'}
        </button>
      </form>

      <section className="mt-8 max-w-xl">
        {error && <div className="text-red-600 mt-4">{error}</div>}
        {response && (
          <div className="bg-gray-100 p-4 mt-4 rounded-lg border border-gray-300 whitespace-pre-line">
            <strong>Risposta:</strong>
            <div>{response}</div>
          </div>
        )}
      </section>
    </main>
  );
}
