import { Telegraf } from 'telegraf';
import OpenAI from 'openai';
import 'dotenv/config.js';

const botToken = process.env.BOT_TOKEN || 'Not token';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const bot = new Telegraf(botToken);

const start = () => {
  try {
    bot.launch();

    console.log('⚡⚡⚡  Bot started  ⚡⚡⚡');
  } catch (e) {
    console.error(e, 'Bot');
  }
};

bot.start(async (ctx) => {
  try {
    ctx.reply('Hello')
  } catch (e) {
    await console.error(new Error(e).message, 'Bot');
  }
});

bot.on('message', async (ctx) => {
  const response = await askGPT(ctx.text);

  ctx.reply(response);
})

const askGPT = async (message: string) => {
  const response = await openai.chat.completions
  .create({ messages: [{ role: 'user', content: message }], model: 'gpt-3.5-turbo' })
  .asResponse();

 return response.text(); // access
}

start();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));