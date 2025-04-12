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
              'Sei Scriptor, un assistente AI specializzato nella scrittura. Aiuti a generare, correggere e migliorare testi di ogni tipo, con creatività e precisione.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.75,
      }),
    });

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;

    return NextResponse.json({ reply: reply ?? '⚠️ Nessuna risposta valida da Scriptor.' });
  } catch (error) {
    console.error('Scriptor API error:', error);
    return NextResponse.json({ reply: '❌ Errore nella comunicazione con Scriptor.' });
  }
}
