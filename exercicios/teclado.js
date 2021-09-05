const env = require('../.env')
const { Telegraf, Markup } = require('telegraf')
const bot = new Telegraf(env.token)

const tecladoCarne = Markup.keyboard([
  ['🐷 Porco', '🐮 Vaca', '🐑 Carneiro'],
  ['🐔 Galinha', '🐣 Eu como é ovo'],
  ['🐟 Peixe', '🐙 Frutos do mar'],
  ['🍄 Eu sou vegetariano']
]).oneTime()
  .resize()

bot.start(async ctx => {
  const from = ctx.update.message.from
  await ctx.reply(`Seja bem vindo, ${from.first_name}!`)
  await ctx.reply(`Qual bebida você prefere?`,
    Markup.keyboard(['Coca', 'Pepsi']).resize())
})

bot.hears(['Coca', 'Pepsi'], async ctx => {
  await ctx.reply(`Nossa! Eu também gosto de ${ctx.match}`)
  await ctx.reply('Qual a sua carne predileta?', tecladoCarne)
})

bot.hears('🐮 Vaca', ctx => ctx.reply('A minha predileta também'))
bot.hears('🍄 Eu sou vegetariano',
  ctx => ctx.reply('Parabéns, mas eu ainda gosto de carne!'))
bot.on('text', ctx => ctx.reply('Legal!'))

bot.startPolling()