import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
const { question, summary } = await req.json();


const key = process.env.OPENAI_API_KEY;
if (!key) {
// Fallback canned coaching if no key is set
const canned = `Here’s a quick, encouraging take based on your summary:\n\n${summary}\n\nFocus on blunder moves first: look for loose pieces, back-rank issues, and missed tactics (pins/forks). When in doubt, add a blunder-check: “What’s hanging? What changed?”`;
return NextResponse.json({ answer: canned });
}


try {
const prompt = `You are a kind chess coach. Be concrete, avoid heavy jargon, and give 1–2 habits to practice.\n\nGame summary:\n${summary}\n\nQuestion: ${question}`;


const r = await fetch('https://api.openai.com/v1/chat/completions', {
method: 'POST',
headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
body: JSON.stringify({
model: 'gpt-4o-mini',
messages: [
{ role: 'system', content: 'You are a supportive chess coach. Explain ideas, not just moves. Encourage the player.' },
{ role: 'user', content: prompt }
],
temperature: 0.5,
})
});
const j = await r.json();
const answer = j.choices?.[0]?.message?.content ?? 'Sorry, I could not generate an answer.';
return NextResponse.json({ answer });
} catch (e) {
return NextResponse.json({ answer: 'Error contacting the AI coach.' }, { status: 500 });
}
}