# Prepwise

**AI-powered interview prep, tailored to the job.**

Prepwise analyzes any job description and generates a personalized 4-week interview prep plan — covering DSA topics, frontend concepts, and a daily study schedule matched to the role.

---

## How it works

1. Paste a job description
2. Hit **Generate plan**
3. Get a structured 4-week prep plan with DSA problems, frontend focus areas, and a daily breakdown

---

## Built with

- [Next.js](https://nextjs.org/) — App Router
- [Vercel AI SDK](https://sdk.vercel.ai/) — streaming AI responses
- [Anthropic Claude](https://anthropic.com/) — plan generation
- [Tailwind CSS](https://tailwindcss.com/) — styling

---

## Running locally

```bash
git clone https://github.com/KsyushaM/prepwise.git
cd prepwise
npm install
```

Create a `.env.local` file:

```
ANTHROPIC_API_KEY=your_key_here
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Live

[prepwise-io.vercel.app](https://prepwise-io.vercel.app)
