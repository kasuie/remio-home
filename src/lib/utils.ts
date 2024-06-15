/*
 * @Author: kasuie
 * @Date: 2024-06-15 12:23:52
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-15 16:50:19
 * @Description:
 */
import CryptoJS from "crypto-js";

export const Decrypt = (word: any, key: any) => {
  const encryptedHexStr = CryptoJS.enc.Base64.parse(word);
  const ivAndkey = CryptoJS.enc.Utf8.parse(toFixedLength(key));
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, ivAndkey, {
    iv: ivAndkey,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};

export const Encrypt = (word: any) => {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const ivAndkey = CryptoJS.enc.Utf8.parse(toFixedLength(word));
  const encrypted = CryptoJS.AES.encrypt(srcs, ivAndkey, {
    iv: ivAndkey,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
};

export const toFixedLength = (input: string, length = 16) => {
  if (input.length === length) {
    return input;
  }

  if (input.length < length) {
    return input.padEnd(length, "i");
  } else {
    const hash = CryptoJS.MD5(input);
    return CryptoJS.enc.Hex.stringify(hash).slice(0, length);
  }
};
