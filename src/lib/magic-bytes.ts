/**
 * Validates file content by checking magic bytes against known signatures.
 * This prevents file type spoofing via Content-Type header manipulation.
 */

const SIGNATURES: Record<string, number[][]> = {
  'image/jpeg': [
    [0xFF, 0xD8, 0xFF],
  ],
  'image/png': [
    [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
  ],
  'image/webp': [
    // RIFF....WEBP — bytes 0-3 must be RIFF, bytes 8-11 must be WEBP
  ],
  'application/pdf': [
    [0x25, 0x50, 0x44, 0x46], // %PDF
  ],
};

export function validateMagicBytes(buffer: ArrayBuffer, claimedMime: string): boolean {
  const bytes = new Uint8Array(buffer);

  if (bytes.length < 12) return false;

  switch (claimedMime) {
    case 'image/jpeg':
      return bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF;

    case 'image/png':
      return (
        bytes[0] === 0x89 &&
        bytes[1] === 0x50 &&
        bytes[2] === 0x4E &&
        bytes[3] === 0x47 &&
        bytes[4] === 0x0D &&
        bytes[5] === 0x0A &&
        bytes[6] === 0x1A &&
        bytes[7] === 0x0A
      );

    case 'image/webp':
      // RIFF at offset 0, WEBP at offset 8
      return (
        bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
        bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
      );

    case 'application/pdf':
      return (
        bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46
      );

    default:
      return false;
  }
}
