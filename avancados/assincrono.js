const env = require('../.env')
const { Telegram, Markup } = require('telegraf')
const axios = require('axios')

const enviarMensagem = msg => {
  axios.get(`${env.apiUrl}/sendMessage?chat_id=${env.userID}&text=${encodeURI(msg)}`)
    .catch(e => console.log(e))
}

enviarMensagem('Enviando a mensagem de forma assíncrona')

const teclado = Markup.keyboard([
  ['Ok', 'Cancelar']
]).oneTime().resize()

const telegram = new Telegram(env.token)
telegram.sendMessage(env.userID, 'Essa é uma mensagem com teclado', teclado)