import { toBufferLE, toBufferBE, toBigIntLE as _toBigIntLE, toBigIntBE as _toBigIntBE } from 'bigint-buffer'
import { assertIntBoundaries, assertUIntBoundaries } from './utils'

/**
 * Convert a signed BigInt to a little-endian buffer.
 * @param num The BigInt to convert.
 * @param bytes The number of bytes that the resulting buffer should be.
 * @throws if the number is out of bounds
 */
export function toBufferBigIntLE (num: bigint, bytes: number): Buffer {
  return toIntBuf(
    assertIntBoundaries(num, bytes),
    bytes,
    toBufferLE
  )
}

/**
 * Convert a signed BigInt to a big-endian buffer.
 * @param num The BigInt to convert.
 * @param bytes The number of bytes that the resulting buffer should be.
 * @throws if the number is out of bounds
 */
export function toBufferBigIntBE (num: bigint, bytes: number): Buffer {
  return toIntBuf(
    assertIntBoundaries(num, bytes),
    bytes,
    toBufferBE
  )
}

/**
 * Convert an unsigned BigInt to a little-endian buffer.
 * @param num The BigInt to convert.
 * @param bytes The number of bytes that the resulting buffer should be.
 * @throws if the number is out of bounds
 */
export function toBufferBigUIntLE (num: bigint, bytes: number): Buffer {
  return toBufferLE(
    assertUIntBoundaries(num, bytes),
    bytes
  )
}

/**
 * Convert an unsigned BigInt to a big-endian buffer.
 * @param num  The BigInt to convert.
 * @param bytes The number of bytes that the resulting buffer should be.
 * @throws if the number is out of bounds
 */
export function toBufferBigUIntBE (num: bigint, bytes: number): Buffer {
  return toBufferBE(
    assertUIntBoundaries(num, bytes),
    bytes
  )
}

/**
 * Convert a little-endian buffer into a signed BigInt.
 * @param buf buffer to convert
 * @param bytes number of bytes to read
 */
export function toBigIntLE (buf: Buffer, bytes: number): bigint {
  return fromIntBuf(buf.subarray(0, bytes), _toBigIntLE)
}

/**
 * Convert a big-endian buffer into a signed BigInt.
 * @param buf buffer to convert
 * @param bytes number of bytes to read
 */
export function toBigIntBE (buf: Buffer, bytes: number): bigint {
  return fromIntBuf(buf.subarray(0, bytes), _toBigIntBE)
}

/**
 * Convert a little-endian buffer into an unsigned BigInt.
 * @param buf data holding buffer
 * @param bytes (optional) number of bytes to read defaults to full buffer
 */
export function toBigUIntLE (buf: Buffer, bytes = buf.length): bigint {
  return _toBigIntLE(buf.subarray(0, bytes))
}

/**
 * Convert a big-endian buffer into an unsigned BigInt.
 * @param buf data holding buffer
 * @param bytes number of bytes to read
 */
export function toBigUIntBE (buf: Buffer, bytes = buf.length): bigint {
  return _toBigIntBE(buf.subarray(0, bytes))
}

// private functions

function toIntBuf (num: bigint, bytes: number, a: (x: bigint, width: number) => Buffer): Buffer {
  if (num >= 0n) {
    return a(num, bytes)
  }
  return a(2n ** BigInt(bytes * 8) + num, bytes)
}

function fromIntBuf (buf: Buffer, a: (x: Buffer) => bigint): bigint {
  const conv = a(buf)
  const mid = 2n ** BigInt(buf.length * 8 - 1)
  if (conv < mid) {
    return conv
  }
  return conv - (mid << 1n)
}
