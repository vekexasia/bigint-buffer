import { byteBoundaries, assertIntBoundaries, assertUIntBoundaries } from '@/utils'

describe('utils', () => {
  it('boundaries', () => {
    expect(byteBoundaries(1)).toEqual({ min: -128n, max: 127n })
    expect(byteBoundaries(2)).toEqual({ min: -32768n, max: 32767n })
    expect(byteBoundaries(4)).toEqual({ min: -2147483648n, max: 2147483647n })
    expect(byteBoundaries(8)).toEqual({ min: -9223372036854775808n, max: 9223372036854775807n })
  })
  it('assertIntBoundaries', () => {
    expect(() => assertIntBoundaries(127n, 1)).not.toThrow()
    expect(() => assertIntBoundaries(128n, 1)).toThrow()
    expect(() => assertIntBoundaries(-128n, 1)).not.toThrow()
    expect(() => assertIntBoundaries(-129n, 1)).toThrow()
    expect(() => assertIntBoundaries(128n, 2)).not.toThrow()
  })
  it('assertUIntBoundaries', () => {
    expect(() => assertUIntBoundaries(127n, 1)).not.toThrow()
    expect(() => assertUIntBoundaries(255n, 1)).not.toThrow()
    expect(() => assertUIntBoundaries(256n, 1)).toThrow()
    expect(() => assertUIntBoundaries(-128n, 1)).toThrow()
    expect(() => assertUIntBoundaries(-129n, 1)).toThrow()
    expect(() => assertUIntBoundaries(256n, 2)).not.toThrow()
  })
})
