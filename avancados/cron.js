
const env = require('../.env')
const schedule = require('node-schedule')
const { Telegraf, Telegram, Markup } = require('telegraf')
const telegram = new Telegram(env.token)
const bot = new Telegraf(env.token)

let contador = 1

const botoes = Markup.inlineKeyboard([
  Markup.button.callback('Cancelar', `cancel`)
])

const notificar = () => {
  telegram.sendMessage(env.userID, `Essa é uma mensagem de evento [${contador++}]`, botoes)
}

const notificacao = new schedule.scheduleJob('*/5 * * * * *', notificar)

bot.action('cancel', ctx => {
  notificacao.cancel()
  ctx.reply('Ok! Parei de pertubar...')
})

bot.startPolling()