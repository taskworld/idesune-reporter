'use strict'

function createReporter () {
  const url = process.env.IDESUNE_URL
  return url ? createIdesuneReporter(url) : createNullReporter()
}

function createIdesuneReporter (url) {
  const connection = require('socket.io-client')(url)
  return {
    report (action) {
      connection.emit('dispatch', action)
    },
    unref () {
      connection.disconnect()
    }
  }
}

function createNullReporter () {
  return {
    report () { },
    unref () { }
  }
}

module.exports = createReporter
