import { describe, expect, it } from 'vitest'
import { en2zh, zh2en } from '../src/utils/translate'

describe('translate', () => {
  it('zh2en', async () => {
    const res = await zh2en('你好')
    expect(res[0].dst).toBe('Hello')
  })
  it('en2zh', async () => {
    const res = await en2zh('Hello')
    expect(res).toBe('你好')
  })
  it('en to zh multiple word', async () => {
    const res = await en2zh('Hello world')
    expect(res).toBe('你好世界')
  })
})
