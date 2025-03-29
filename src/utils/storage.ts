/**
 * @jsonDoc
 * @description 将数据存储到 localStorage
 * @param {string} key - 存储键名
 * @param {any} value - 要存储的数据
 * @returns {void}
 */
export function setLocalStorage(key: string, value: any): void {
  try {
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
    localStorage.setItem(key, stringValue);
  } catch (error) {
    console.error('存储数据到 localStorage 失败:', error);
  }
}

/**
 * @jsonDoc
 * @description 从 localStorage 获取数据
 * @param {string} key - 存储键名
 * @param {any} [defaultValue=null] - 当键不存在时返回的默认值
 * @returns {any} 存储的数据或默认值
 */
export function getLocalStorage(key: string, defaultValue: any = null): any {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return defaultValue;
    
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch (error) {
    console.error('从 localStorage 获取数据失败:', error);
    return defaultValue;
  }
}

/**
 * @jsonDoc
 * @description 从 localStorage 移除数据
 * @param {string} key - 要移除的存储键名
 * @returns {void}
 */
export function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('从 localStorage 移除数据失败:', error);
  }
}

/**
 * @jsonDoc
 * @description 清空 localStorage 中的所有数据
 * @returns {void}
 */
export function clearLocalStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('清空 localStorage 失败:', error);
  }
}

/**
 * @jsonDoc
 * @description 将数据存储到 sessionStorage
 * @param {string} key - 存储键名
 * @param {any} value - 要存储的数据
 * @returns {void}
 */
export function setSessionStorage(key: string, value: any): void {
  try {
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
    sessionStorage.setItem(key, stringValue);
  } catch (error) {
    console.error('存储数据到 sessionStorage 失败:', error);
  }
}

/**
 * @jsonDoc
 * @description 从 sessionStorage 获取数据
 * @param {string} key - 存储键名
 * @param {any} [defaultValue=null] - 当键不存在时返回的默认值
 * @returns {any} 存储的数据或默认值
 */
export function getSessionStorage(key: string, defaultValue: any = null): any {
  try {
    const value = sessionStorage.getItem(key);
    if (value === null) return defaultValue;
    
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch (error) {
    console.error('从 sessionStorage 获取数据失败:', error);
    return defaultValue;
  }
}

/**
 * @jsonDoc
 * @description 从 sessionStorage 移除数据
 * @param {string} key - 要移除的存储键名
 * @returns {void}
 */
export function removeSessionStorage(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error('从 sessionStorage 移除数据失败:', error);
  }
}

/**
 * @jsonDoc
 * @description 清空 sessionStorage 中的所有数据
 * @returns {void}
 */
export function clearSessionStorage(): void {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.error('清空 sessionStorage 失败:', error);
  }
}

/**
 * @jsonDoc
 * @description 设置带有过期时间的 localStorage 数据
 * @param {string} key - 存储键名
 * @param {any} value - 要存储的数据
 * @param {number} expiryInSeconds - 过期时间（秒）
 * @returns {void}
 */
export function setLocalStorageWithExpiry(key: string, value: any, expiryInSeconds: number): void {
  try {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + expiryInSeconds * 1000,
    };
    setLocalStorage(key, item);
  } catch (error) {
    console.error('设置带过期时间的 localStorage 数据失败:', error);
  }
}

/**
 * @jsonDoc
 * @description 获取带有过期时间的 localStorage 数据，如果已过期则返回默认值
 * @param {string} key - 存储键名
 * @param {any} [defaultValue=null] - 当键不存在或已过期时返回的默认值
 * @returns {any} 存储的数据或默认值
 */
export function getLocalStorageWithExpiry(key: string, defaultValue: any = null): any {
  try {
    const itemStr = getLocalStorage(key);
    if (!itemStr) return defaultValue;
    
    // 检查是否有 expiry 字段
    if (!itemStr.expiry) return itemStr;
    
    const now = new Date();
    // 比较当前时间和过期时间
    if (now.getTime() > itemStr.expiry) {
      // 如果已过期，删除并返回默认值
      removeLocalStorage(key);
      return defaultValue;
    }
    return itemStr.value;
  } catch (error) {
    console.error('获取带过期时间的 localStorage 数据失败:', error);
    return defaultValue;
  }
}

/**
 * @jsonDoc
 * @description 检查浏览器是否支持 localStorage
 * @returns {boolean} 如果支持则返回 true，否则返回 false
 */
export function isLocalStorageSupported(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * @jsonDoc
 * @description 检查浏览器是否支持 sessionStorage
 * @returns {boolean} 如果支持则返回 true，否则返回 false
 */
export function isSessionStorageSupported(): boolean {
  try {
    const testKey = '__storage_test__';
    sessionStorage.setItem(testKey, testKey);
    sessionStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * @jsonDoc
 * @description 获取 localStorage 已使用的空间大小（以字节为单位）
 * @returns {number} 已使用的空间大小
 */
export function getLocalStorageUsage(): number {
  try {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        total += key.length + (value ? value.length : 0);
      }
    }
    return total;
  } catch (error) {
    console.error('获取 localStorage 使用空间失败:', error);
    return 0;
  }
}

/**
 * @jsonDoc
 * @description 将对象存储到 IndexedDB
 * @param {string} dbName - 数据库名称
 * @param {string} storeName - 存储对象名称
 * @param {any} data - 要存储的数据对象
 * @param {string|number} [key] - 可选的键名，如果不提供则使用自动递增键
 * @returns {Promise<any>} 包含操作结果的 Promise
 */
export function saveToIndexedDB(dbName: string, storeName: string, data: any, key?: string | number): Promise<any> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    
    request.onerror = (event) => {
      reject('IndexedDB 错误: ' + (event.target as IDBOpenDBRequest).error);
    };
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    };
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      
      let saveRequest;
      if (key !== undefined) {
        data.id = key;
        saveRequest = store.put(data);
      } else {
        saveRequest = store.add(data);
      }
      
      saveRequest.onsuccess = () => {
        resolve(saveRequest.result);
      };
      
      saveRequest.onerror = () => {
        reject('保存数据到 IndexedDB 失败: ' + saveRequest.error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
}

/**
 * @jsonDoc
 * @description 从 IndexedDB 获取数据
 * @param {string} dbName - 数据库名称
 * @param {string} storeName - 存储对象名称
 * @param {string|number} key - 要获取的数据键名
 * @returns {Promise<any>} 包含获取的数据的 Promise
 */
export function getFromIndexedDB(dbName: string, storeName: string, key: string | number): Promise<any> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    
    request.onerror = (event) => {
      reject('IndexedDB 错误: ' + (event.target as IDBOpenDBRequest).error);
    };
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains(storeName)) {
        resolve(null);
        return;
      }
      
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const getRequest = store.get(key);
      
      getRequest.onsuccess = () => {
        resolve(getRequest.result);
      };
      
      getRequest.onerror = () => {
        reject('从 IndexedDB 获取数据失败: ' + getRequest.error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    };
  });
}

/**
 * @jsonDoc
 * @description 设置 cookie
 * @param {string} name - cookie 名称
 * @param {string} value - cookie 值
 * @param {Object} [options] - cookie 选项
 * @param {number} [options.days] - cookie 过期天数
 * @param {string} [options.path='/'] - cookie 路径
 * @param {string} [options.domain] - cookie 域名
 * @param {boolean} [options.secure=false] - 是否仅通过 HTTPS 传输
 * @param {boolean} [options.sameSite='Lax'] - SameSite 属性 ('Strict', 'Lax', 'None')
 * @returns {void}
 */
export function setCookie(
  name: string, 
  value: string, 
  options: {
    days?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
  } = {}
): void {
  try {
    const { days, path = '/', domain, secure = false, sameSite = 'Lax' } = options;
    
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    
    if (days !== undefined) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      cookieString += `; expires=${date.toUTCString()}`;
    }
    
    cookieString += `; path=${path}`;
    
    if (domain) {
      cookieString += `; domain=${domain}`;
    }
    
    if (secure) {
      cookieString += '; secure';
    }
    
    cookieString += `; samesite=${sameSite}`;
    
    document.cookie = cookieString;
  } catch (error) {
    console.error('设置 cookie 失败:', error);
  }
}

/**
 * @jsonDoc
 * @description 获取指定名称的 cookie 值
 * @param {string} name - cookie 名称
 * @returns {string|null} cookie 值，如果不存在则返回 null
 */
export function getCookie(name: string): string | null {
  try {
    const nameEQ = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    
    return null;
  } catch (error) {
    console.error('获取 cookie 失败:', error);
    return null;
  }
}

/**
 * @jsonDoc
 * @description 删除指定名称的 cookie
 * @param {string} name - cookie 名称
 * @param {Object} [options] - cookie 选项
 * @param {string} [options.path='/'] - cookie 路径
 * @param {string} [options.domain] - cookie 域名
 * @returns {void}
 */
export function removeCookie(
  name: string, 
  options: {
    path?: string;
    domain?: string;
  } = {}
): void {
  try {
    // 设置过期时间为过去的时间来删除 cookie
    setCookie(name, '', {
      days: -1,
      path: options.path,
      domain: options.domain
    });
  } catch (error) {
    console.error('删除 cookie 失败:', error);
  }
}

/**
 * @jsonDoc
 * @description 检查指定名称的 cookie 是否存在
 * @param {string} name - cookie 名称
 * @returns {boolean} 如果 cookie 存在则返回 true，否则返回 false
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}

/**
 * @jsonDoc
 * @description 获取所有 cookie 并以对象形式返回
 * @returns {Record<string, string>} 包含所有 cookie 的对象
 */
export function getAllCookies(): Record<string, string> {
  try {
    const cookies: Record<string, string> = {};
    const cookiesList = document.cookie.split(';');
    
    for (let i = 0; i < cookiesList.length; i++) {
      let cookie = cookiesList[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      
      const separatorIndex = cookie.indexOf('=');
      if (separatorIndex > 0) {
        const name = decodeURIComponent(cookie.substring(0, separatorIndex));
        const value = decodeURIComponent(cookie.substring(separatorIndex + 1));
        cookies[name] = value;
      }
    }
    
    return cookies;
  } catch (error) {
    console.error('获取所有 cookie 失败:', error);
    return {};
  }
}

/**
 * @jsonDoc
 * @description 设置带有 JSON 值的 cookie
 * @param {string} name - cookie 名称
 * @param {any} value - 要存储的 JSON 值
 * @param {Object} [options] - cookie 选项
 * @param {number} [options.days] - cookie 过期天数
 * @param {string} [options.path='/'] - cookie 路径
 * @param {string} [options.domain] - cookie 域名
 * @param {boolean} [options.secure=false] - 是否仅通过 HTTPS 传输
 * @param {boolean} [options.sameSite='Lax'] - SameSite 属性 ('Strict', 'Lax', 'None')
 * @returns {void}
 */
export function setJSONCookie(
  name: string, 
  value: any, 
  options: {
    days?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
  } = {}
): void {
  try {
    const jsonValue = JSON.stringify(value);
    setCookie(name, jsonValue, options);
  } catch (error) {
    console.error('设置 JSON cookie 失败:', error);
  }
}

/**
 * @jsonDoc
 * @description 获取指定名称的 JSON cookie 值
 * @param {string} name - cookie 名称
 * @param {any} [defaultValue=null] - 当 cookie 不存在或解析失败时返回的默认值
 * @returns {any} 解析后的 JSON 值，如果不存在或解析失败则返回默认值
 */
export function getJSONCookie(name: string, defaultValue: any = null): any {
  try {
    const cookieValue = getCookie(name);
    if (cookieValue === null) return defaultValue;
    
    try {
      return JSON.parse(cookieValue);
    } catch {
      return defaultValue;
    }
  } catch (error) {
    console.error('获取 JSON cookie 失败:', error);
    return defaultValue;
  }
} 