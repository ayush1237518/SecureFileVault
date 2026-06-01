import CryptoJS from 'crypto-js'

/** Pack raw bytes into a CryptoJS WordArray (big-endian 32-bit words). */
function wordArrayFromBuffer(buffer: ArrayBuffer): CryptoJS.lib.WordArray {
  const bytes = new Uint8Array(buffer)
  const words: number[] = []
  for (let i = 0; i < bytes.length; i += 4) {
    words.push(
      (bytes[i] << 24) |
        ((bytes[i + 1] ?? 0) << 16) |
        ((bytes[i + 2] ?? 0) << 8) |
        (bytes[i + 3] ?? 0),
    )
  }
  return CryptoJS.lib.WordArray.create(words, bytes.length)
}

function wordArrayToUint8Array(wordArray: CryptoJS.lib.WordArray): Uint8Array {
  const { words, sigBytes } = wordArray
  const result = new Uint8Array(sigBytes)
  for (let i = 0; i < sigBytes; i++) {
    result[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff
  }
  return result
}

/** Encrypt a file with AES using a user-provided passphrase (client-side only). */
export async function encryptFile(file: File, passphrase: string): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer()
  const wordArray = wordArrayFromBuffer(arrayBuffer)
  const encrypted = CryptoJS.AES.encrypt(wordArray, passphrase).toString()
  return new Blob([encrypted], { type: 'text/plain' })
}

/** Decrypt ciphertext blob back to the original file bytes. */
export async function decryptFile(
  encryptedBlob: Blob,
  passphrase: string,
  _originalName: string,
  options?: { mimeType?: string; expectedSize?: number },
): Promise<Blob> {
  const ciphertext = await encryptedBlob.text()
  const decrypted = CryptoJS.AES.decrypt(ciphertext, passphrase)
  const bytes = wordArrayToUint8Array(decrypted)

  if (bytes.length === 0) {
    throw new Error('Decryption failed. Check your passphrase.')
  }

  const expected = options?.expectedSize
  if (expected !== undefined && bytes.length !== expected) {
    throw new Error('Wrong passphrase — decrypted size does not match the original file.')
  }

  return new Blob([bytes.slice()], { type: options?.mimeType || 'application/octet-stream' })
}
