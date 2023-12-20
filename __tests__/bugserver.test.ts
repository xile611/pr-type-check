/**
 * Unit tests for src/wait.ts
 */
import { checkBugserveCase } from '../src/bugserve'
import { expect } from '@jest/globals'

describe('bugserver.ts', () => {
  it('return false', async () => {
    expect(checkBugserveCase('')).toBeFalsy()
  })
})
