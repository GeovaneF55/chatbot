const env = require('../../.env')
const { Telegraf, Markup, session } = require('telegraf')
const bot = new Telegraf(env.token)

const botoes = lista => Markup.inlineKeyboard(
  lista.map(item => Markup.button.callback(item, `delete ${item}`)),
  { columns: 3 }
)

bot.use(session())

bot.start(async ctx => {
  const name = ctx.update.message.from.first_name
  await ctx.reply(`Seja bem vindo, ${name}!`)
  await ctx.reply('Escreva os itens que você deseja adicionar...')

  ctx.session = { lista: [] }
})

bot.on('text', ctx => {
  let msg = ctx.update.message.text
  ctx.session.lista.push(msg)
  ctx.reply(`${msg} adicionado!`, botoes(ctx.session.lista))
})

bot.action(/delete (.+)/, ctx => {
  ctx.session.lista = ctx.session.lista.filter(
    item => item !== ctx.match[1])
  ctx.reply(`${ctx.match[1]} deletado!`, botoes(ctx.session.lista))
})

bot.launch()