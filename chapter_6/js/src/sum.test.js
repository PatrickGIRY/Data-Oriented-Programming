import { expect, test } from 'vitest'
import { sum } from './sum'

test('sum 1 with 2 is eauql to 3', () => {
    expect(sum(1,2)).toBe(3)
})

