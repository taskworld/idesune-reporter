'use strict'

const createReporter = require('./')

function KarmaIdesuneReporter () {
  const _reporter = createReporter()

  function report (event) {
    _reporter.report({
      type: 'RECEIVE_TEST_EVENT',
      event
    })
  }

  this.adapters = [ ]
  this.onRunStart = () => {
    report({ type: 'RUN_START' })
  }
  this.onBrowserStart = (browser) => {
    report({
      type: 'RUNNER_START',
      runner: String(browser)
    })
  }
  this.onBrowserError = (browser, error) => {
    report({
      type: 'RUNNER_ERROR',
      runner: String(browser),
      error: String(error)
    })
  }
  this.onSpecComplete = (browser, result) => {
    report({
      type: 'TEST_COMPLETED',
      result: {
        id: result.id,
        description: result.description,
        skipped: result.skipped,
        success: result.success,
        log: result.log
      },
      runner: String(browser)
    })
  }
  this.onBrowserComplete = (browser) => {
    report({
      type: 'RUNNER_COMPLETED',
      runner: String(browser)
    })
  }
  this.onRunComplete = () => {
    report({
      type: 'RUN_COMPLETED'
    })
  }
}

KarmaIdesuneReporter.$inject = [ ]

module.exports = {
  'reporter:idesune': [ 'type', KarmaIdesuneReporter ]
}
