import CryptoJS from 'crypto-js'

function wordArrayFromBuffer(buffer: ArrayBuffer): CryptoJS.lib.WordArray {
  const bytes = new Uint8Array(buffer)
  const words: number[] = []
  for (let i = 0; i < bytes.length; i++) words.push(bytes[i])
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
  mimeType?: string,
): Promise<Blob> {
  const ciphertext = await encryptedBlob.text()
  const decrypted = CryptoJS.AES.decrypt(ciphertext, passphrase)
  const bytes = wordArrayToUint8Array(decrypted)
  return new Blob([bytes.slice()], { type: mimeType || 'application/octet-stream' })
}
