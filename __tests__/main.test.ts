/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

// Mock the GitHub Actions core library
let debugMock: jest.SpyInstance
let errorMock: jest.SpyInstance
let getInputMock: jest.SpyInstance
let setFailedMock: jest.SpyInstance
let setOutputMock: jest.SpyInstance

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    debugMock = jest.spyOn(core, 'debug').mockImplementation()
    errorMock = jest.spyOn(core, 'error').mockImplementation()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
    setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()
  })

  it('check bugserver case id of fix pr return false', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'pull_request_head':
          return 'fix/bug'
        case 'pull_request_body':
          return 'this is a request'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(debugMock).not.toHaveBeenCalled()
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      "Can't find case id of bugserver in the pull request body"
    )
    expect(setOutputMock).toHaveBeenNthCalledWith(1, 'result', false)
    expect(errorMock).not.toHaveBeenCalled()
  })

  it('check bugserver case id of fix pr return true', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'pull_request_head':
          return 'fix/bug'
        case 'pull_request_body':
          return `
          ### 🔗 Related issue link

          &lt;!--
          1. Put the related issue or discussion links here.
          2. close #xxxx or fix #xxxx for instance.
          --&gt;### 🔗 Related PR link
          
          &lt;!-- Put the related PR links here. --&gt;### 🐞 Bugserver case id
          6572e0cb9464710a7ba9dc8f
          &lt;!-- paste the \`fileid\` field in the bugserver case url --&gt;### 💡 Background and solution
          
          &lt;!--
          1. Describe the problem and the scenario.
          2. GIF or snapshot should be provided if includes UI/interactive modification.
          3. How to fix the problem, and list the final API implementation and usage sample if that is a new feature.
          --&gt;### 📝 Changelog
`
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(debugMock).not.toHaveBeenCalled()
    expect(setFailedMock).not.toHaveBeenCalled()
    expect(setOutputMock).toHaveBeenNthCalledWith(1, 'result', true)
    expect(errorMock).not.toHaveBeenCalled()
  })

  it('no check of bugserver case id of other pr', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'pull_request_head':
          return 'feat/bug'
        case 'pull_request_body':
          return 'this is a request'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(debugMock).not.toHaveBeenCalled()
    expect(setFailedMock).not.toHaveBeenCalled()
    expect(setOutputMock).toHaveBeenNthCalledWith(1, 'result', true)
    expect(errorMock).not.toHaveBeenCalled()
  })
})
