import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'Sei Chronya, un’AI specializzata in pianificazione, gestione del tempo e produttività. Aiuti l’utente a organizzarsi in modo intelligente e ordinato.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.6,
      }),
    });

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;

    return NextResponse.json({ reply: reply ?? '⚠️ Nessuna risposta valida da Chronya.' });
  } catch (error) {
    console.error('Chronya API error:', error);
    return NextResponse.json({ reply: '❌ Errore nella comunicazione con Chronya.' });
  }
}
