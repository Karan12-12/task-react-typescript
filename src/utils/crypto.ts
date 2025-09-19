import CryptoJS from "crypto-js";

const SECRET_KEY = "1234567890";

export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (ciphertext: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch {
    return "";
  }
};
