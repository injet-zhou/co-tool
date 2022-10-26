import { describe, expect, it } from 'vitest'
import { isChinese } from '../src/utils/string';

describe('string utils', () => {
    it('isChinese', () => {
        expect(isChinese('你好')).toBe(true);
        expect(isChinese('Hello')).toBe(false);
    });
})