
import bcrypt from 'bcryptjs';
const SALT_ROUNDS = 10;

export async function saltAndHashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
  // return '123456'
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
  // return true
}

const encryptData = async (plainData: string, encryptionKey: string, initVector:string) => {


  // Encode the data to be encrypted
  const encodedData = new TextEncoder().encode(plainData);

  console.log('cryptoKey', Buffer.from(encryptionKey, "base64"))
  // Prepare the encryption key
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    Buffer.from(encryptionKey, "base64"),
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
  // Encrypt the encoded data with the key
  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: Uint8Array.from(Buffer.from(initVector, "base64")),
    },
    cryptoKey,
    encodedData
  );

  // Return the encrypted data and the IV, both in base64 format
  return {
    encryptedData: Buffer.from(encryptedData).toString("base64"),
  };
};

export const handleEncryption = async (data: any,initVector:string) => {
  return await encryptData(
    JSON.stringify({ data }),
    process.env.NEXT_PUBLIC_ENCRYPT_KEY!,
    initVector
  );
};


const decryptData = async (
  encryptedData: string,
  initVector: string,
  encryptionKey: string
) => {
  // Prepare the decryption key
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    Buffer.from(encryptionKey, "base64"),
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );

  try {
    // Decrypt the encrypted data using the key and IV
    const decodedData = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: Buffer.from(initVector, "base64"),
      },
      cryptoKey,
      Buffer.from(encryptedData, "base64")
    );

    // Decode and return the decrypted data
    return new TextDecoder().decode(decodedData);
  } catch (error) {
    return JSON.stringify({ payload: null });
  }
};

export const handleDecryption = async ({ encryptedData, initVector }: any) => {
  const decryptedString = await decryptData(
    encryptedData!,
    initVector!,
    process.env.NEXT_PUBLIC_ENCRYPT_KEY!
  );

  const responseData = JSON.parse(decryptedString)?.data;

  return responseData;
};