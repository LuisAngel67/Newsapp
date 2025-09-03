import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  private secretKey: string = 'MI_CLAVE_SECRETA_DEL_PROYECTO';

  constructor() {}

  // Encriptar texto (password)
  encrypt(value: string): string {
    return CryptoJS.SHA256(value + this.secretKey).toString();
  }

  // Comparar texto plano con hash en storage
  compare(value: string, hash: string): boolean {
    const encryptedValue = this.encrypt(value);
    return encryptedValue === hash;
  }
}
