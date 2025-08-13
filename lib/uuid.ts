/**
 * UUIDv7 Implementation
 *
 * Based on RFC 9562 - Universally Unique IDentifiers (UUIDs)
 * https://www.rfc-editor.org/rfc/rfc9562.html
 *
 * UUIDv7 Layout (128 bits total):
 * - 48 bits: Unix timestamp in milliseconds
 * - 4 bits: Version (0111 = 7)
 * - 12 bits: Random data A
 * - 2 bits: Variant (10)
 * - 62 bits: Random data B
 */

/**
 * Pure JavaScript Linear Congruential Generator (LCG)
 * Based on Numerical Recipes parameters: a = 1664525, c = 1013904223, m = 2^32
 * This is a simple but effective pseudorandom number generator
 */
class PureRandomGenerator {
  private seed: number;

  constructor(seed?: number) {
    // Use current timestamp with some entropy if no seed provided
    this.seed = seed ?? this.generateInitialSeed();
  }

  /**
   * Generate an initial seed using current time and some basic entropy
   */
  private generateInitialSeed(): number {
    const now = Date.now();
    // Add some entropy from the current time's microsecond precision
    const entropy = (now * 9301 + 49297) % 233280;
    return (now + entropy) >>> 0; // Convert to unsigned 32-bit integer
  }

  /**
   * Generate next pseudorandom number using LCG algorithm
   * Formula: (a * seed + c) % m
   * Where: a = 1664525, c = 1013904223, m = 2^32
   */
  private next(): number {
    const a = 1664525;
    const c = 1013904223;
    const m = 0x100000000; // 2^32

    this.seed = (a * this.seed + c) % m >>> 0;
    return this.seed;
  }

  /**
   * Generate a random byte (0-255)
   */
  nextByte(): number {
    return this.next() & 0xff;
  }

  /**
   * Generate multiple random bytes
   */
  nextBytes(length: number): Uint8Array {
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = this.nextByte();
    }
    return bytes;
  }

  /**
   * Generate a random float between 0 and 1
   */
  nextFloat(): number {
    return this.next() / 0x100000000;
  }

  /**
   * Reseed the generator
   */
  setSeed(seed: number): void {
    this.seed = seed >>> 0; // Ensure unsigned 32-bit integer
  }
}

// Global instance for generating random bytes
let globalRng: PureRandomGenerator | null = null;

/**
 * Get random bytes using pure JavaScript implementation
 * This uses a Linear Congruential Generator (LCG) - not cryptographically secure
 * but sufficient for UUID generation in most cases
 */
function getRandomBytes(length: number): Uint8Array {
  if (!globalRng) {
    globalRng = new PureRandomGenerator();
  }
  return globalRng.nextBytes(length);
}

/**
 * Convert a number to hexadecimal string with specified length
 */
function toHex(value: number, length: number): string {
  return value.toString(16).padStart(length, '0');
}

/**
 * Convert bytes array to hexadecimal string
 */
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Generate a UUIDv7
 *
 * @param timestamp Optional timestamp in milliseconds. If not provided, uses current time
 * @returns UUIDv7 string in standard format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
 */
export function uuidv7(timestamp?: number): string {
  // Get timestamp in milliseconds (48 bits)
  const ts = timestamp ?? Date.now();

  // Ensure timestamp fits in 48 bits (max value: 2^48 - 1 = 281474976710655)
  if (ts < 0 || ts > 0xffffffffffff) {
    throw new Error('Timestamp must be between 0 and 281474976710655');
  }

  // Generate 10 bytes of random data for rand_a (12 bits) and rand_b (62 bits)
  const randomBytes = getRandomBytes(10);

  // Extract timestamp bytes (48 bits = 6 bytes)
  const timestampHex = toHex(ts, 12); // 12 hex chars = 48 bits

  // Extract random_a (12 bits = 1.5 bytes)
  // We'll use the first 2 bytes and mask to get 12 bits
  const randA = (randomBytes[0]! << 4) | (randomBytes[1]! >> 4);
  const randAHex = toHex(randA & 0xfff, 3); // 3 hex chars = 12 bits

  // Extract random_b (62 bits = 7.75 bytes)
  // We'll use bytes 1-9 (9 bytes = 72 bits) and mask to get 62 bits
  const randBBytes = randomBytes.slice(1, 10); // 9 bytes

  // Convert to hex and take only 62 bits worth (15.5 hex chars)
  const randBHex = bytesToHex(randBBytes).substring(1); // Remove first hex char to get 15 chars

  // Construct the UUID parts
  const timeLow = timestampHex.substring(0, 8); // First 32 bits of timestamp
  const timeMid = timestampHex.substring(8, 12); // Next 16 bits of timestamp

  // Version and time_hi: 4 bits version (0111 = 7) + 12 bits random_a
  const versionAndRandA = '7' + randAHex;

  // Variant and random_b: 2 bits variant (10) + 62 bits random_b
  // First hex char of random_b needs to have variant bits set
  const firstRandBChar = parseInt(randBHex.charAt(0), 16);
  const variantAndFirstRandB = (0x8 | (firstRandBChar & 0x3)).toString(16); // Set variant to 10xx
  const clockSeqAndNode = variantAndFirstRandB + randBHex.substring(1);

  // Split clock_seq_and_node into two parts for standard UUID format
  const clockSeq = clockSeqAndNode.substring(0, 4);
  const node = clockSeqAndNode.substring(4, 16);

  // Format as standard UUID string
  return `${timeLow}-${timeMid}-${versionAndRandA}-${clockSeq}-${node}`.toLowerCase();
}

/**
 * Parse a UUIDv7 and extract its timestamp
 *
 * @param uuid UUIDv7 string
 * @returns Timestamp in milliseconds
 */
export function parseUuidv7Timestamp(uuid: string): number {
  // Remove dashes and validate format
  const cleanUuid = uuid.replace(/-/g, '');

  if (cleanUuid.length !== 32) {
    throw new Error('Invalid UUID format');
  }

  // Check version (should be 7)
  const version = parseInt(cleanUuid.charAt(12), 16);
  if (version !== 7) {
    throw new Error('Not a UUIDv7');
  }

  // Extract timestamp (first 48 bits = first 12 hex characters)
  const timestampHex = cleanUuid.substring(0, 12);
  const timestamp = parseInt(timestampHex, 16);

  return timestamp;
}

/**
 * Validate if a string is a valid UUIDv7
 *
 * @param uuid String to validate
 * @returns True if valid UUIDv7, false otherwise
 */
export function isValidUuidv7(uuid: string): boolean {
  try {
    // Check basic UUID format
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(uuid)) {
      return false;
    }

    // Check version
    const version = parseInt(uuid.charAt(14), 16);
    if (version !== 7) {
      return false;
    }

    // Check variant (should be 10xx)
    const variant = parseInt(uuid.charAt(19), 16);
    if ((variant & 0xc) !== 0x8) {
      return false;
    }

    // Try to parse timestamp to ensure it's valid
    parseUuidv7Timestamp(uuid);

    return true;
  } catch {
    return false;
  }
}

/**
 * Generate multiple UUIDv7s with monotonic ordering
 * Ensures that UUIDs generated in the same millisecond are monotonically increasing
 *
 * @param count Number of UUIDs to generate
 * @param timestamp Optional base timestamp. If not provided, uses current time
 * @returns Array of UUIDv7 strings in monotonic order
 */
export function generateMonotonicUuidv7s(
  count: number,
  timestamp?: number
): string[] {
  if (count <= 0) {
    return [];
  }

  const baseTimestamp = timestamp ?? Date.now();
  const uuids: string[] = [];

  // For monotonic ordering within the same millisecond, we increment the random_a part
  let currentRandA = Math.floor(Math.random() * 0x1000); // 12-bit random start

  for (let i = 0; i < count; i++) {
    // Use the same timestamp for all UUIDs in this batch
    const ts = baseTimestamp;

    // Generate random bytes for rand_b
    const randomBytes = getRandomBytes(8); // 8 bytes for rand_b (62 bits)

    // Increment rand_a for monotonic ordering, wrap around if needed
    currentRandA = (currentRandA + 1) & 0xfff;

    // Build UUID similar to uuidv7() but with controlled rand_a
    const timestampHex = toHex(ts, 12);
    const randAHex = toHex(currentRandA, 3);

    const timeLow = timestampHex.substring(0, 8);
    const timeMid = timestampHex.substring(8, 12);
    const versionAndRandA = '7' + randAHex;

    // Process rand_b with variant bits
    const randBHex = bytesToHex(randomBytes).substring(0, 15); // 15 hex chars for 60 bits
    const firstRandBChar = parseInt(randBHex.charAt(0), 16);
    const variantAndFirstRandB = (0x8 | (firstRandBChar & 0x3)).toString(16);
    const clockSeqAndNode = variantAndFirstRandB + randBHex.substring(1);

    const clockSeq = clockSeqAndNode.substring(0, 4);
    const node = clockSeqAndNode.substring(4, 16);

    const uuid =
      `${timeLow}-${timeMid}-${versionAndRandA}-${clockSeq}-${node}`.toLowerCase();
    uuids.push(uuid);
  }

  return uuids;
}

/**
 * Convert UUIDv7 to binary representation
 *
 * @param uuid UUIDv7 string
 * @returns Uint8Array containing 16 bytes
 */
export function uuidv7ToBytes(uuid: string): Uint8Array {
  if (!isValidUuidv7(uuid)) {
    throw new Error('Invalid UUIDv7');
  }

  const cleanUuid = uuid.replace(/-/g, '');
  const bytes = new Uint8Array(16);

  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(cleanUuid.substring(i * 2, i * 2 + 2), 16);
  }

  return bytes;
}

/**
 * Convert binary representation to UUIDv7 string
 *
 * @param bytes Uint8Array containing 16 bytes
 * @returns UUIDv7 string
 */
export function bytesToUuidv7(bytes: Uint8Array): string {
  if (bytes.length !== 16) {
    throw new Error('UUID bytes must be exactly 16 bytes');
  }

  const hex = bytesToHex(bytes);
  const uuid = `${hex.substring(0, 8)}-${hex.substring(8, 12)}-${hex.substring(12, 16)}-${hex.substring(16, 20)}-${hex.substring(20, 32)}`;

  if (!isValidUuidv7(uuid)) {
    throw new Error('Bytes do not represent a valid UUIDv7');
  }

  return uuid;
}

// Default export for convenience
export default uuidv7;
