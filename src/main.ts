import * as core from '@actions/core'
import { checkBugserveCase } from './bugserve'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const body: string = core.getInput('pull_request_body')
    const pull_request_head: string = core.getInput('pull_request_head')

    if (pull_request_head && /^(fix\/)(\S+)/.exec(pull_request_head)) {
      if (!checkBugserveCase(body)) {
        core.setFailed(
          `Can't find case id of bugserver in the pull request body`
        )
        core.setOutput('result', false)
        return
      }
    }

    core.setOutput('result', true)
    // Set outputs for other workflow steps to use
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
