import pako from 'pako';

export function decodeBase64Zlib(encodedString: string): any {
  try {
    // Decode Base64
    const decodedData = atob(encodedString);
    
    // Convert to Uint8Array
    const charData = decodedData.split('').map(x => x.charCodeAt(0));
    const binData = new Uint8Array(charData);
    
    // Decompress
    const decompressedData = pako.inflate(binData, { to: 'string' });
    
    // Parse JSON
    return JSON.parse(decompressedData);
  } catch (error) {
    console.error('Error decoding data:', error);
    return null;
  }
}