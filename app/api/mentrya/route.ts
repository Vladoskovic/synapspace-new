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
              'Sei Mentrya, una mentore AI per lo studio. Spiega concetti difficili con semplicità, chiarezza ed efficacia.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;

    return NextResponse.json({ reply: reply ?? '⚠️ Nessuna risposta valida da Mentrya.' });
  } catch (error) {
    console.error('Mentrya API error:', error);
    return NextResponse.json({ reply: '❌ Errore nella comunicazione con Mentrya.' });
  }
}
