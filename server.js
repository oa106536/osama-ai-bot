const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(express.json());
app.use(cors());

// ضع مفتاح الـ API الخاص بك هنا (مخفي في السيرفر)
// استبدل السطر القديم بهذا السطر حرفياً
const apiKey = process.env.GROQ_API_KEY;

const client = new OpenAI({
  apiKey: API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "أنت مساعد ذكي ومحترف اسمك أسامة بوت. تجيب بالعربية بأسلوب تقني وجذاب." },
        { role: "user", content: message }
      ],
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "حدث خطأ في الاتصال بالذكاء الاصطناعي" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`السيرفر يعمل على http://localhost:${PORT}`));