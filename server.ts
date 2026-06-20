import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsers
  app.use(express.json());

  // Initialize Gemini Client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } else {
    console.warn('GEMINI_API_KEY is not defined. AI Chatbot will run in simulation mode.');
  }

  // API router
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      if (!ai) {
        // Fallback simulation if no API key is configured
        return res.json({
          text: `Thank you for reaching out to National Housing Community! (Note: Running in offline simulation). We received your message: "${message}". Please feel free to call us directly at (323) 396-1569 or email ronebiz@gmail.com for direct assistance with housing support, volunteer opportunities, or donations!`,
        });
      }

      // Format previous history into Gemini's multi-turn content format
      // history is expected to be an array of: { role: 'user' | 'model', content: string }
      const formattedContents: any[] = [];
      if (history && Array.isArray(history)) {
        history.forEach((h: any) => {
          formattedContents.push({
            role: h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.content }],
          });
        });
      }

      // Add the latest user message
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: formattedContents,
        config: {
          systemInstruction: `You are a compassionate, professional AI assistant for the National Housing Community, a dedicated NGO that provides support for affordable housing, community development, housing assistance, and homelessness prevention. 
          Your role is to help users find relevant information and guide them to housing resources, volunteer opportunities, application pages, or donate routes, and answer questions knowledgeably and empathetically.
          Important Details about National Housing Community:
          - Phone: (323) 396-1569
          - Email: ronebiz@gmail.com
          - Website Domain: nationalhousingcommunity.net
          - Scope of action: Housing advocacy, homelessness prevention, housing locator services, down-payment counseling, community resource connections.
          Guidelines:
          1. Keep your responses structured, clear, and easy to read.
          2. Use sympathetic and encouraging tone.
          3. If someone asks how to donate, explain that we offer one-time and recurring donations that help shelter families, fund emergency rent support, and run local shelters.
          4. If someone asks to volunteer, explain that they can help with community outreach, resume reviews, food distributions, or phone banking.
          5. If someone requests housing assistance, guide them to our "Get Help" section, noting that we connect families to transitional housing, housing vouchers (HUD/Section 8 assistance), and emergency shelter programs, and ask them to fill out our Help Request Form.`,
        },
      });

      const responseText = response.text || 'I apologize, but I could not formulate a response. Please call us at (323) 396-1569 for immediate support.';
      res.json({ text: responseText });
    } catch (error: any) {
      console.error('Error in /api/chat:', error);
      res.status(500).json({
        error: 'Failed to generate a response from the AI support system.',
        details: error.message || error,
      });
    }
  });

  // Client-side static routing / Vite setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`National Housing Community Dev Server running at http://localhost:${PORT}`);
  });
}

startServer();
