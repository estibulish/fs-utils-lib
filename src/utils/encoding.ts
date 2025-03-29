/**
 * @jsonDoc
 * @description 编码相关的工具函数
 */

/**
 * @jsonDoc
 * @description 将字符串转换为Base64编码
 * @param {string} str - 要编码的字符串
 * @returns {string} Base64编码的字符串
 */
export function encodeBase64(str: string): string {
  if (typeof window !== 'undefined') {
    // 浏览器环境
    return window.btoa(unescape(encodeURIComponent(str)));
  } else if (typeof Buffer !== 'undefined') {
    // Node.js环境
    return Buffer.from(str).toString('base64');
  }
  throw new Error('当前环境不支持Base64编码');
}

/**
 * @jsonDoc
 * @description 将Base64编码的字符串解码
 * @param {string} base64Str - Base64编码的字符串
 * @returns {string} 解码后的字符串
 */
export function decodeBase64(base64Str: string): string {
  if (typeof window !== 'undefined') {
    // 浏览器环境
    return decodeURIComponent(escape(window.atob(base64Str)));
  } else if (typeof Buffer !== 'undefined') {
    // Node.js环境
    return Buffer.from(base64Str, 'base64').toString();
  }
  throw new Error('当前环境不支持Base64解码');
}

/**
 * @jsonDoc
 * @description 将字符串转换为URL安全的Base64编码
 * @param {string} str - 要编码的字符串
 * @returns {string} URL安全的Base64编码字符串
 */
export function encodeBase64Url(str: string): string {
  return encodeBase64(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * @jsonDoc
 * @description 将URL安全的Base64编码字符串解码
 * @param {string} base64UrlStr - URL安全的Base64编码字符串
 * @returns {string} 解码后的字符串
 */
export function decodeBase64Url(base64UrlStr: string): string {
  // 恢复标准Base64格式
  let base64 = base64UrlStr
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  // 添加缺失的填充字符
  while (base64.length % 4) {
    base64 += '=';
  }
  
  return decodeBase64(base64);
}

/**
 * @jsonDoc
 * @description 将字符串转换为URL编码
 * @param {string} str - 要编码的字符串
 * @returns {string} URL编码的字符串
 */
export function encodeUrl(str: string): string {
  return encodeURIComponent(str);
}

/**
 * @jsonDoc
 * @description 将URL编码的字符串解码
 * @param {string} urlEncodedStr - URL编码的字符串
 * @returns {string} 解码后的字符串
 */
export function decodeUrl(urlEncodedStr: string): string {
  return decodeURIComponent(urlEncodedStr);
}

/**
 * @jsonDoc
 * @description 将字符串转换为HTML实体编码
 * @param {string} str - 要编码的字符串
 * @returns {string} HTML实体编码的字符串
 */
export function encodeHtml(str: string): string {
  const el = document.createElement('div');
  el.innerText = str;
  return el.innerHTML;
}

/**
 * @jsonDoc
 * @description 将HTML实体编码的字符串解码
 * @param {string} htmlEncodedStr - HTML实体编码的字符串
 * @returns {string} 解码后的字符串
 */
export function decodeHtml(htmlEncodedStr: string): string {
  const el = document.createElement('div');
  el.innerHTML = htmlEncodedStr;
  return el.innerText;
}

/**
 * @jsonDoc
 * @description 将字符串转换为十六进制编码
 * @param {string} str - 要编码的字符串
 * @returns {string} 十六进制编码的字符串
 */
export function encodeHex(str: string): string {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16).padStart(2, '0');
  }
  return result;
}

/**
 * @jsonDoc
 * @description 将十六进制编码的字符串解码
 * @param {string} hexStr - 十六进制编码的字符串
 * @returns {string} 解码后的字符串
 */
export function decodeHex(hexStr: string): string {
  let result = '';
  for (let i = 0; i < hexStr.length; i += 2) {
    result += String.fromCharCode(parseInt(hexStr.substr(i, 2), 16));
  }
  return result;
}

/**
 * @jsonDoc
 * @description 计算字符串的MD5哈希值（仅浏览器环境）
 * @param {string} str - 要计算哈希的字符串
 * @returns {Promise<string>} MD5哈希值的Promise
 */
export async function md5(str: string): Promise<string> {
  if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
    throw new Error('当前环境不支持Web Crypto API');
  }
  
  // 将字符串转换为ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  
  // 计算哈希值
  const hashBuffer = await window.crypto.subtle.digest('MD5', data);
  
  // 将ArrayBuffer转换为十六进制字符串
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * @jsonDoc
 * @description 计算字符串的SHA-1哈希值
 * @param {string} str - 要计算哈希的字符串
 * @returns {Promise<string>} SHA-1哈希值的Promise
 */
export async function sha1(str: string): Promise<string> {
  if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
    throw new Error('当前环境不支持Web Crypto API');
  }
  
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  
  const hashBuffer = await window.crypto.subtle.digest('SHA-1', data);
  
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * @jsonDoc
 * @description 计算字符串的SHA-256哈希值
 * @param {string} str - 要计算哈希的字符串
 * @returns {Promise<string>} SHA-256哈希值的Promise
 */
export async function sha256(str: string): Promise<string> {
  if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
    throw new Error('当前环境不支持Web Crypto API');
  }
  
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * @jsonDoc
 * @description 将UTF-8字符串转换为UTF-16编码
 * @param {string} utf8Str - UTF-8字符串
 * @returns {string} UTF-16编码的字符串
 */
export function utf8ToUtf16(utf8Str: string): string {
  return utf8Str; // JavaScript字符串内部已经是UTF-16编码
}

/**
 * @jsonDoc
 * @description 将UTF-16编码的字符串转换为UTF-8字符串
 * @param {string} utf16Str - UTF-16编码的字符串
 * @returns {string} UTF-8字符串
 */
export function utf16ToUtf8(utf16Str: string): string {
  return utf16Str; // 在JavaScript中，这是一个无操作转换
}

/**
 * @jsonDoc
 * @description 将字符串转换为Unicode转义序列
 * @param {string} str - 要转换的字符串
 * @returns {string} 包含Unicode转义序列的字符串
 */
export function encodeUnicode(str: string): string {
  return str.split('').map(char => {
    const code = char.charCodeAt(0);
    return code < 128 ? char : `\\u${code.toString(16).padStart(4, '0')}`;
  }).join('');
}

/**
 * @jsonDoc
 * @description 将包含Unicode转义序列的字符串解码
 * @param {string} unicodeStr - 包含Unicode转义序列的字符串
 * @returns {string} 解码后的字符串
 */
export function decodeUnicode(unicodeStr: string): string {
  return unicodeStr.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
}

/**
 * @jsonDoc
 * @description 将字符串转换为Punycode（用于国际化域名）
 * @param {string} str - 要转换的字符串
 * @returns {string} Punycode编码的字符串
 */
export function encodePunycode(str: string): string {
  try {
    const url = new URL(`https://${str}`);
    return url.hostname.substring(4); // 移除 'xn--' 前缀
  } catch (e) {
    throw new Error('Punycode编码失败');
  }
}

/**
 * @jsonDoc
 * @description 将Punycode编码的字符串解码
 * @param {string} punycodeStr - Punycode编码的字符串
 * @returns {string} 解码后的字符串
 */
export function decodePunycode(punycodeStr: string): string {
  try {
    const url = new URL(`https://xn--${punycodeStr}`);
    return url.hostname;
  } catch (e) {
    throw new Error('Punycode解码失败');
  }
}

/**
 * @jsonDoc
 * @description 编码类，支持链式调用多种编码方法
 */
export class Encoder {
  private value: string;

  /**
   * @jsonDoc
   * @description 创建一个新的编码器实例
   * @param {string} initialValue - 初始字符串
   */
  constructor(initialValue: string = '') {
    this.value = initialValue;
  }

  /**
   * @jsonDoc
   * @description 应用Base64编码
   * @returns {Encoder} 编码器实例，用于链式调用
   */
  toBase64(): Encoder {
    this.value = encodeBase64(this.value);
    return this;
  }

  /**
   * @jsonDoc
   * @description 应用Base64解码
   * @returns {Encoder} 编码器实例，用于链式调用
   */
  fromBase64(): Encoder {
    this.value = decodeBase64(this.value);
    return this;
  }

  /**
   * @jsonDoc
   * @description 应用URL安全的Base64编码
   * @returns {Encoder} 编码器实例，用于链式调用
   */
  toBase64Url(): Encoder {
    this.value = encodeBase64Url(this.value);
    return this;
  }

  /**
   * @jsonDoc
   * @description 应用URL安全的Base64解码
   * @returns {Encoder} 编码器实例，用于链式调用
   */
  fromBase64Url(): Encoder {
    this.value = decodeBase64Url(this.value);
    return this;
  }

  /**
   * @jsonDoc
   * @description 应用URL编码
   * @returns {Encoder} 编码器实例，用于链式调用
   */
  toUrl(): Encoder {
    this.value = encodeUrl(this.value);
    return this;
  }

  /**
   * @jsonDoc
   * @description 应用URL解码
   * @returns {Encoder} 编码器实例，用于链式调用
   */
  fromUrl(): Encoder {
    this.value = decodeUrl(this.value);
    return this;
  }

  /**
   * @jsonDoc
   * @description 应用HTML实体编码
   * @returns {Encoder} 编码器实例，用于链式调用
   */
  toHtml(): Encoder {
    this.value = encodeHtml(this.value);
    return this;
  }

  /**
   * @jsonDoc
   * @description 应用HTML实体解码
   * @returns {Encoder} 编码器实例，用于链式调用
   */
  fromHtml(): Encoder {
    this.value = decodeHtml(this.value);
    return this;
  }

  /**
   * @jsonDoc
   * @description 应用十六进制编码
   * @returns {Encoder} 编码器实例，用于链式调用
   */
  toHex(): Encoder {
    this.value = encodeHex(this.value);
    return this;
  }

  /**
   * @jsonDoc
   * @description 应用十六进制解码
   * @returns {Encoder} 编码器实例，用于链式调用
   */
  fromHex(): Encoder {
    this.value = decodeHex(this.value);
    return this;
  }

  /**
   * @jsonDoc
   * @description 应用Unicode转义序列编码
   * @returns {Encoder} 编码器实例，用于链式调用
   */
  toUnicode(): Encoder {
    this.value = encodeUnicode(this.value);
    return this;
  }

  /**
   * @jsonDoc
   * @description 应用Unicode转义序列解码
   * @returns {Encoder} 编码器实例，用于链式调用
   */
  fromUnicode(): Encoder {
    this.value = decodeUnicode(this.value);
    return this;
  }

  /**
   * @jsonDoc
   * @description 获取当前编码/解码结果
   * @returns {string} 当前字符串值
   */
  result(): string {
    return this.value;
  }
}

/**
 * @jsonDoc
 * @description 创建一个新的编码器实例
 * @param {string} [initialValue=''] - 初始字符串
 * @returns {Encoder} 编码器实例
 */
export function encode(initialValue: string = ''): Encoder {
  return new Encoder(initialValue);
} 