const env = require('../../.env')
const { Telegraf, Markup } = require('telegraf')
const bot = new Telegraf(env.token)

let lista = []

const gerarBotoes = () => Markup.inlineKeyboard(
  lista.map(item => Markup.button.callback(item, `delete ${item}`)),
  { columns: 3 }
)

bot.start(async ctx => {
  const name = ctx.update.message.from.first_name
  await ctx.reply(`Seja bem vindo, ${name}!`)
  await ctx.reply('Escreva os itens que você deseja adicionar...')
})

bot.on('text', ctx => {
  lista.push(ctx.update.message.text)
  ctx.reply(`${ctx.update.message.text} adicionado!`, gerarBotoes())
})

bot.action(/delete (.+)/, ctx => {
  lista = lista.filter(item => item !== ctx.match[1])
  ctx.reply(`${ctx.match[1]} deletado!`, gerarBotoes())
})

bot.startPolling()