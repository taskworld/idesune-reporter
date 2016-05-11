'use strict'

class IdesunePlugin {
  constructor (ProgressPlugin, appName) {
    this._ProgressPlugin = ProgressPlugin
    this._appName = appName

    const createReporter = require('./')
    this._reporter = createReporter()
  }
  apply (compiler) {
    const progressPlugin = new (this._ProgressPlugin)(this._createProgressHandler())
    progressPlugin.apply(compiler)
    compiler.plugin('done', this._createDoneHandler())
  }
  _createProgressHandler () {
    return (progress, message) => {
      if (progress < 1) {
        this._report('running', message)
      }
    }
  }
  _createDoneHandler () {
    return (stats) => {
      if (stats.hasErrors()) {
        this._report('error')
      } else {
        this._report('completed')
      }
    }
  }
  _report (status, message) {
    this._reporter.report({
      type: 'RECEIVE_STATUS',
      app: this._appName,
      status: status,
      message: message
    })
  }
}

module.exports = IdesunePlugin
