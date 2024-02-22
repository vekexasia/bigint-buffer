import { toBufferLE, toBufferBE, toBigIntLE as _toBigIntLE, toBigIntBE as _toBigIntBE } from 'bigint-buffer'
import { assertIntBoundaries, assertUIntBoundaries } from './utils'

function toBuf (num: bigint, bytes: number, a: (x: bigint, width: number) => Buffer): Buffer {
  if (num >= 0n) {
    return a(num, bytes)
  }
  return a(2n ** BigInt(bytes * 8) + num, bytes)
}

function fromBuf (buf: Buffer, width: number, a: (x: Buffer) => bigint): bigint {
  const conv = a(buf)
  const mid = 2n ** BigInt(width * 8 - 1)
  if (conv < mid) {
    return conv
  }
  return conv - (mid << 1n)
}

export function toBufferBigIntLE (num: bigint, bytes: number): Buffer {
  return toBuf(
    assertIntBoundaries(num, bytes),
    bytes,
    toBufferLE
  )
}

export function toBufferBigIntBE (num: bigint, bytes: number): Buffer {
  return toBuf(
    assertIntBoundaries(num, bytes),
    bytes,
    toBufferBE
  )
}
export function toBufferBigUIntLE (num: bigint, bytes: number): Buffer {
  return toBufferLE(
    assertUIntBoundaries(num, bytes),
    bytes
  )
}

export function toBufferBigUIntBE (num: bigint, bytes: number): Buffer {
  return toBufferBE(
    assertUIntBoundaries(num, bytes),
    bytes
  )
}

export function toBigIntLE (buf: Buffer, bytes: number): bigint {
  return assertIntBoundaries(
    fromBuf(buf, bytes, _toBigIntLE),
    bytes
  )
}
export function toBigIntBE (buf: Buffer, bytes: number): bigint {
  return assertIntBoundaries(
    fromBuf(buf, bytes, _toBigIntBE),
    bytes
  )
}

export function toBigUIntLE (buf: Buffer, bytes: number): bigint {
  return assertUIntBoundaries(
    _toBigIntLE(buf),
    bytes
  )
}
export function toBigUIntBE (buf: Buffer, bytes: number): bigint {
  return assertUIntBoundaries(
    _toBigIntBE(buf),
    bytes
  )
}
