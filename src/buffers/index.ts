import {
  toBigIntBE,
  toBigIntLE, toBigUIntBE, toBigUIntLE,
  toBufferBigIntBE,
  toBufferBigIntLE,
  toBufferBigUIntBE,
  toBufferBigUIntLE
} from '../index'
// impl start
Buffer.prototype.writeBigIntBE = function (value: bigint, width: number, offset = 0) {
  return toBufferBigIntBE(value, width).copy((this as Buffer), offset)
}
Buffer.prototype.writeBigIntLE = function (value: bigint, width: number, offset = 0) {
  return toBufferBigIntLE(value, width).copy((this as Buffer), offset)
}
Buffer.prototype.readBigIntBE = function (width: number, offset = 0): bigint {
  return toBigIntBE(
    (this as Buffer).subarray(offset, offset + width),
    width
  )
}
Buffer.prototype.readBigIntLE = function (width: number, offset = 0): bigint {
  return toBigIntLE(
    (this as Buffer).subarray(offset, offset + width),
    width
  )
}
Buffer.prototype.writeBigUIntBE = function (value: bigint, width: number, offset = 0) {
  return toBufferBigUIntBE(value, width).copy((this as Buffer), offset)
}
Buffer.prototype.writeBigUIntLE = function (value: bigint, width: number, offset = 0) {
  return toBufferBigUIntLE(value, width).copy((this as Buffer), offset)
}
Buffer.prototype.readBigUIntBE = function (width: number, offset = 0): bigint {
  return toBigUIntBE(
    (this as Buffer).subarray(offset, offset + width),
    width
  )
}
Buffer.prototype.readBigUIntLE = function (width: number, offset = 0): bigint {
  return toBigUIntLE(
    (this as Buffer).subarray(offset, offset + width),
    width
  )
}

// declaration for polyfill
declare global {
  interface Buffer {
    writeBigIntBE: (value: bigint, width: number, offset?: number) => number
    writeBigIntLE: (value: bigint, width: number, offset?: number) => number
    readBigIntBE: (width: number, offset?: number) => bigint
    readBigIntLE: (width: number, offset?: number) => bigint
    // uint
    writeBigUIntBE: (value: bigint, width: number, offset?: number) => number
    writeBigUIntLE: (value: bigint, width: number, offset?: number) => number
    readBigUIntBE: (width: number, offset?: number) => bigint
    readBigUIntLE: (width: number, offset?: number) => bigint
  }
}
