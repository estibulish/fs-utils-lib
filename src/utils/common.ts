/**
 * @jsonDoc
 * @description 格式化日期字符串
 * @param {Date} date - 日期对象
 * @param {string} format - 格式模板，如 'YYYY-MM-DD'
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
    // 实现代码...
    return format
        .replace('YYYY', date.getFullYear().toString())
        .replace('MM', (date.getMonth() + 1).toString().padStart(2, '0'))
        .replace('DD', date.getDate().toString().padStart(2, '0'));
}

/**
 * @jsonDoc
 * @description 深拷贝对象，支持处理循环引用、日期、正则表达式等特殊对象
 * @param {any} obj - 要拷贝的对象
 * @param {Map} [cache=new Map()] - 用于处理循环引用的缓存
 * @returns {any} 拷贝后的新对象
 */
export function deepClone<T>(obj: T, cache = new Map()): T {
    // 处理基本类型和 null
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // 检查缓存，处理循环引用
    if (cache.has(obj)) {
        return cache.get(obj);
    }
    
    // 处理日期对象
    if (obj instanceof Date) {
        return new Date(obj.getTime()) as unknown as T;
    }
    
    // 处理正则表达式
    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags) as unknown as T;
    }
    
    // 处理 Map
    if (obj instanceof Map) {
        const result = new Map();
        cache.set(obj, result);
        obj.forEach((value, key) => {
            result.set(deepClone(key, cache), deepClone(value, cache));
        });
        return result as unknown as T;
    }
    
    // 处理 Set
    if (obj instanceof Set) {
        const result = new Set();
        cache.set(obj, result);
        obj.forEach(value => {
            result.add(deepClone(value, cache));
        });
        return result as unknown as T;
    }
    
    // 处理数组
    if (Array.isArray(obj)) {
        const result: any[] = [];
        // 将新数组添加到缓存
        cache.set(obj, result);
        obj.forEach((item, index) => {
            result[index] = deepClone(item, cache);
        });
        return result as unknown as T;
    }
    
    // 处理普通对象
    const result = Object.create(Object.getPrototypeOf(obj));
    // 将新对象添加到缓存
    cache.set(obj, result);
    
    // 复制所有可枚举属性
    Object.entries(obj).forEach(([key, value]) => {
        result[key] = deepClone(value, cache);
    });
    
    return result;
}

/**
 * @jsonDoc
 * @description 高级判空函数
 * @param {any} value - 需要判断的值
 * @param {Object} [options] - 配置选项
 * @param {boolean} [options.considerEmptyString=true] - 是否将空字符串视为空值
 * @param {boolean} [options.considerEmptyArray=true] - 是否将空数组视为空值
 * @param {boolean} [options.considerEmptyObject=true] - 是否将空对象视为空值
 * @param {boolean} [options.considerZero=false] - 是否将0视为空值
 * @returns {boolean} 如果值为空则返回true，否则返回false
 */
export function isEmpty<T>(value: T, options = {}): boolean {
    // 设置默认选项
    const defaultOptions = {
        considerEmptyString: true,
        considerEmptyArray: true,
        considerEmptyObject: true,
        considerZero: false
    };
    
    const opts = { ...defaultOptions, ...options };

    // 处理 null 和 undefined
    if (value == null) return true;

    // 处理数字
    if (typeof value === 'number') {
        if (opts.considerZero) {
            return value === 0;
        }
        return false;
    }

    // 处理字符串
    if (typeof value === 'string') {
        return opts.considerEmptyString ? value.trim().length === 0 : false;
    }

    // 处理数组
    if (Array.isArray(value)) {
        return opts.considerEmptyArray ? value.length === 0 : false;
    }

    // 处理对象
    if (typeof value === 'object') {
        return opts.considerEmptyObject ? Object.keys(value).length === 0 : false;
    }

    // 处理布尔值
    if (typeof value === 'boolean') {
        return false;
    }

    // 处理函数
    if (typeof value === 'function') {
        return false;
    }

    return true;
}

/**
 * @jsonDoc
 * @description 生成指定长度的随机字符串
 * @param {number} length - 随机字符串的长度
 * @returns {string} 随机字符串
 */
export function randomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
 * @jsonDoc
 * @description 截断字符串到指定长度，并添加省略号
 * @param {string} str - 要截断的字符串
 * @param {number} maxLength - 最大长度
 * @param {string} [ellipsis='...'] - 省略号字符串
 * @returns {string} 截断后的字符串
 */
export function truncate(str: string, maxLength: number, ellipsis: string = '...'): string {
  if (!str || str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength - ellipsis.length) + ellipsis;
}

/**
 * @jsonDoc
 * @description 将驼峰命名转换为短横线命名
 * @param {string} str - 驼峰命名的字符串
 * @returns {string} 短横线命名的字符串
 */
export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * @jsonDoc
 * @description 将短横线命名转换为驼峰命名
 * @param {string} str - 短横线命名的字符串
 * @param {boolean} [pascalCase=false] - 是否转换为帕斯卡命名（首字母大写）
 * @returns {string} 驼峰命名的字符串
 */
export function kebabToCamel(str: string, pascalCase: boolean = false): string {
  const camelCase = str.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
  return pascalCase ? camelCase.charAt(0).toUpperCase() + camelCase.slice(1) : camelCase;
}

/**
 * @jsonDoc
 * @description 将下划线命名转换为驼峰命名
 * @param {string} str - 下划线命名的字符串
 * @param {boolean} [pascalCase=false] - 是否转换为帕斯卡命名（首字母大写）
 * @returns {string} 驼峰命名的字符串
 */
export function snakeToCamel(str: string, pascalCase: boolean = false): string {
  const camelCase = str.replace(/_([a-z0-9])/g, (_, char) => char.toUpperCase());
  return pascalCase ? camelCase.charAt(0).toUpperCase() + camelCase.slice(1) : camelCase;
}

/**
 * @jsonDoc
 * @description 将驼峰命名转换为下划线命名
 * @param {string} str - 驼峰命名的字符串
 * @returns {string} 下划线命名的字符串
 */
export function camelToSnake(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
}

/**
 * @jsonDoc
 * @description 将字符串首字母大写
 * @param {string} str - 要处理的字符串
 * @returns {string} 首字母大写的字符串
 */
export function capitalize(str: string): string {
  if (!str || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * @jsonDoc
 * @description 将字符串首字母小写
 * @param {string} str - 要处理的字符串
 * @returns {string} 首字母小写的字符串
 */
export function uncapitalize(str: string): string {
  if (!str || str.length === 0) return str;
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * @jsonDoc
 * @description 检查对象是否为纯对象（使用对象字面量或Object创建）
 * @param {any} obj - 要检查的对象
 * @returns {boolean} 如果是纯对象则返回true
 */
export function isPlainObject(obj: any): boolean {
  if (typeof obj !== 'object' || obj === null) return false;
  
  let proto = Object.getPrototypeOf(obj);
  if (proto === null) return true; // Object.create(null)
  
  let baseProto = proto;
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }
  
  return proto === baseProto;
}

/**
 * @jsonDoc
 * @description 安全地获取嵌套对象属性值，避免空引用错误
 * @param {Object} obj - 要获取属性的对象
 * @param {string|Array<string>} path - 属性路径，可以是点分隔的字符串或字符串数组
 * @param {any} [defaultValue=undefined] - 如果路径不存在，返回的默认值
 * @returns {any} 属性值或默认值
 */
export function get(obj: any, path: string | string[], defaultValue?: any): any {
  const keys = Array.isArray(path) ? path : path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === null || result === undefined || typeof result !== 'object') {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result === undefined ? defaultValue : result;
}

/**
 * @jsonDoc
 * @description 安全地设置嵌套对象属性值，自动创建不存在的路径
 * @param {Object} obj - 要设置属性的对象
 * @param {string|Array<string>} path - 属性路径，可以是点分隔的字符串或字符串数组
 * @param {any} value - 要设置的值
 * @returns {Object} 修改后的对象
 */
export function set(obj: any, path: string | string[], value: any): any {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  
  const keys = Array.isArray(path) ? path : path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] === undefined || current[key] === null || typeof current[key] !== 'object') {
      // 如果下一个键是数字，则创建数组，否则创建对象
      current[key] = /^\d+$/.test(keys[i + 1]) ? [] : {};
    }
    current = current[key];
  }
  
  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;
  
  return obj;
}

/**
 * @jsonDoc
 * @description 从对象中选择指定的属性创建新对象
 * @param {Object} obj - 源对象
 * @param {Array<string>} keys - 要选择的属性名数组
 * @returns {Object} 包含选定属性的新对象
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
    return result;
  }, {} as Pick<T, K>);
}

/**
 * @jsonDoc
 * @description 从对象中排除指定的属性创建新对象
 * @param {Object} obj - 源对象
 * @param {Array<string>} keys - 要排除的属性名数组
 * @returns {Object} 不包含排除属性的新对象
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result as Omit<T, K>;
}

/**
 * @jsonDoc
 * @description 合并对象，支持深度合并
 * @param {Object} target - 目标对象
 * @param {...Object} sources - 源对象
 * @returns {Object} 合并后的对象
 */
export function merge<T extends object>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length) return target;
  
  const source = sources.shift();
  if (source === undefined) return target;
  
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach(key => {
      const targetValue = (target as any)[key];
      const sourceValue = (source as any)[key];
      
      if (Array.isArray(sourceValue)) {
        (target as any)[key] = sourceValue.slice();
      } else if (isPlainObject(sourceValue)) {
        if (!isPlainObject(targetValue)) {
          (target as any)[key] = {};
        }
        merge((target as any)[key], sourceValue);
      } else {
        (target as any)[key] = sourceValue;
      }
    });
  }
  
  return merge(target, ...sources);
}

/**
 * @jsonDoc
 * @description 防抖函数，延迟执行函数直到一段时间内没有再次调用
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @param {boolean} [immediate=false] - 是否在触发事件后立即执行
 * @returns {Function} 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>): void {
    const context = this;
    
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
    
    if (callNow) func.apply(context, args);
  };
}

/**
 * @jsonDoc
 * @description 节流函数，限制函数在一段时间内只执行一次
 * @param {Function} func - 要节流的函数
 * @param {number} wait - 等待时间（毫秒）
 * @param {Object} [options] - 配置选项
 * @param {boolean} [options.leading=true] - 是否在开始时执行
 * @param {boolean} [options.trailing=true] - 是否在结束时执行
 * @returns {Function} 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;
  const { leading = true, trailing = true } = options;
  
  return function(this: any, ...args: Parameters<T>): void {
    const now = Date.now();
    if (!previous && !leading) previous = now;
    
    const remaining = wait - (now - previous);
    const context = this;
    
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      
      previous = now;
      func.apply(context, args);
    } else if (!timeout && trailing) {
      timeout = setTimeout(() => {
        previous = !leading ? 0 : Date.now();
        timeout = null;
        func.apply(context, args);
      }, remaining);
    }
  };
}

/**
 * @jsonDoc
 * @description 生成唯一ID
 * @param {string} [prefix=''] - ID前缀
 * @param {number} [length=8] - 随机部分的长度
 * @returns {string} 唯一ID
 */
export function uniqueId(prefix: string = '', length: number = 8): string {
  const id = randomString(length);
  return prefix ? `${prefix}_${id}` : id;
}

/**
 * @jsonDoc
 * @description 等待指定时间
 * @param {number} ms - 等待时间（毫秒）
 * @returns {Promise<void>} Promise对象
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @jsonDoc
 * @description 尝试执行函数，捕获并处理错误
 * @param {Function} fn - 要执行的函数
 * @param {any} [defaultValue] - 发生错误时返回的默认值
 * @param {Function} [errorHandler] - 错误处理函数
 * @returns {any} 函数执行结果或默认值
 */
export function tryFn<T, E = Error>(
  fn: () => T,
  defaultValue?: T,
  errorHandler?: (error: E) => void
): T {
  try {
    return fn();
  } catch (error) {
    if (errorHandler) {
      errorHandler(error as E);
    }
    return defaultValue as T;
  }
}

/**
 * @jsonDoc
 * @description 重试执行异步函数
 * @param {Function} fn - 要执行的异步函数
 * @param {Object} [options] - 配置选项
 * @param {number} [options.retries=3] - 最大重试次数
 * @param {number} [options.delay=1000] - 重试间隔（毫秒）
 * @param {Function} [options.onRetry] - 重试时的回调函数
 * @returns {Promise<any>} Promise对象
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    retries?: number;
    delay?: number;
    onRetry?: (error: Error, attempt: number) => void;
  } = {}
): Promise<T> {
  const { retries = 3, delay = 1000, onRetry } = options;
  let lastError: Error;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < retries) {
        if (onRetry) {
          onRetry(lastError, attempt + 1);
        }
        
        await sleep(delay);
      }
    }
  }
  
  throw lastError!;
}

/**
 * @jsonDoc
 * @description 将对象转换为查询字符串
 * @param {Object} obj - 要转换的对象
 * @returns {string} 查询字符串
 */
export function objectToQueryString(obj: Record<string, any>): string {
  return Object.entries(obj)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value
          .map(item => `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`)
          .join('&');
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .join('&');
}

/**
 * @jsonDoc
 * @description 将查询字符串转换为对象
 * @param {string} queryString - 查询字符串
 * @returns {Object} 转换后的对象
 */
export function queryStringToObject(queryString: string): Record<string, string | string[]> {
  if (!queryString || queryString === '?') {
    return {};
  }
  
  // 移除开头的 ? 或 #
  const search = queryString.charAt(0) === '?' || queryString.charAt(0) === '#'
    ? queryString.substring(1)
    : queryString;
  
  return search.split('&').reduce((result, param) => {
    const [key, value] = param.split('=').map(decodeURIComponent);
    
    if (key) {
      if (result[key]) {
        result[key] = Array.isArray(result[key])
          ? [...(result[key] as string[]), value]
          : [result[key] as string, value];
      } else {
        result[key] = value;
      }
    }
    
    return result;
  }, {} as Record<string, string | string[]>);
}

/**
 * @jsonDoc
 * @description 检查值是否为有效的JSON字符串
 * @param {string} str - 要检查的字符串
 * @returns {boolean} 如果是有效的JSON字符串则返回true
 */
export function isValidJson(str: string): boolean {
  if (typeof str !== 'string') return false;
  
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * @jsonDoc
 * @description 安全地解析JSON字符串
 * @param {string} str - 要解析的JSON字符串
 * @param {any} [defaultValue=null] - 解析失败时返回的默认值
 * @returns {any} 解析结果或默认值
 */
export function safeJsonParse(str: string, defaultValue: any = null): any {
  try {
    return JSON.parse(str);
  } catch (e) {
    return defaultValue;
  }
}

/**
 * @jsonDoc
 * @description 安全地将值转换为JSON字符串
 * @param {any} value - 要转换的值
 * @param {any} [defaultValue='{}'] - 转换失败时返回的默认值
 * @returns {string} JSON字符串或默认值
 */
export function safeJsonStringify(value: any, defaultValue: string = '{}'): string {
  try {
    return JSON.stringify(value);
  } catch (e) {
    return defaultValue;
  }
}

/**
 * @jsonDoc
 * @description 检查值是否为空（null、undefined、空字符串、空数组、空对象）
 * @param {any} value - 要检查的值
 * @returns {boolean} 如果值为空则返回true
 */
export function isNullOrEmpty(value: any): boolean {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * @jsonDoc
 * @description 检查值是否为数字或可转换为数字的字符串
 * @param {any} value - 要检查的值
 * @returns {boolean} 如果是数字或可转换为数字的字符串则返回true
 */
export function isNumeric(value: any): boolean {
  if (typeof value === 'number') return !isNaN(value);
  if (typeof value !== 'string') return false;
  return !isNaN(Number(value)) && !isNaN(parseFloat(value));
}

/**
 * @jsonDoc
 * @description 将值转换为数字，如果转换失败则返回默认值
 * @param {any} value - 要转换的值
 * @param {number} [defaultValue=0] - 转换失败时返回的默认值
 * @returns {number} 转换后的数字或默认值
 */
export function toNumber(value: any, defaultValue: number = 0): number {
  if (value === null || value === undefined) return defaultValue;
  
  const number = Number(value);
  return isNaN(number) ? defaultValue : number;
}

/**
 * @jsonDoc
 * @description 将值转换为整数，如果转换失败则返回默认值
 * @param {any} value - 要转换的值
 * @param {number} [defaultValue=0] - 转换失败时返回的默认值
 * @returns {number} 转换后的整数或默认值
 */
export function toInteger(value: any, defaultValue: number = 0): number {
  const number = toNumber(value, defaultValue);
  return Math.floor(number);
}

/**
 * @jsonDoc
 * @description 将值转换为布尔值
 * @param {any} value - 要转换的值
 * @returns {boolean} 转换后的布尔值
 */
export function toBoolean(value: any): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const lowercased = value.toLowerCase();
    return lowercased === 'true' || lowercased === '1' || lowercased === 'yes';
  }
  return Boolean(value);
}

/**
 * @jsonDoc
 * @description 将值转换为数组
 * @param {any} value - 要转换的值
 * @returns {Array} 转换后的数组
 */
export function toArray<T>(value: T | T[]): T[] {
  if (value === null || value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * @jsonDoc
 * @description 将字符串转换为驼峰命名
 * @param {string} str - 要转换的字符串
 * @returns {string} 驼峰命名的字符串
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
    .replace(/^(.)/, c => c.toLowerCase());
}

/**
 * @jsonDoc
 * @description 将字符串转换为帕斯卡命名（首字母大写的驼峰命名）
 * @param {string} str - 要转换的字符串
 * @returns {string} 帕斯卡命名的字符串
 */
export function toPascalCase(str: string): string {
  const camelCase = toCamelCase(str);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

/**
 * @jsonDoc
 * @description 格式化文件大小
 * @param {number} bytes - 字节数
 * @param {number} [decimals=2] - 小数位数
 * @returns {string} 格式化后的文件大小
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * @jsonDoc
 * @description 格式化时间间隔
 * @param {number} milliseconds - 毫秒数
 * @param {Object} [options] - 配置选项
 * @param {boolean} [options.compact=false] - 是否使用紧凑格式
 * @param {string} [options.delimiter=' '] - 分隔符
 * @returns {string} 格式化后的时间间隔
 */
export function formatDuration(
  milliseconds: number,
  options: { compact?: boolean; delimiter?: string } = {}
): string {
  const { compact = false, delimiter = ' ' } = options;
  
  if (milliseconds < 0) return '0ms';
  
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  const parts = [];
  
  if (days > 0) {
    parts.push(`${days}${compact ? 'd' : ' day' + (days === 1 ? '' : 's')}`);
  }
  
  if (hours % 24 > 0) {
    parts.push(`${hours % 24}${compact ? 'h' : ' hour' + (hours % 24 === 1 ? '' : 's')}`);
  }
  
  if (minutes % 60 > 0) {
    parts.push(`${minutes % 60}${compact ? 'm' : ' minute' + (minutes % 60 === 1 ? '' : 's')}`);
  }
  
  if (seconds % 60 > 0) {
    parts.push(`${seconds % 60}${compact ? 's' : ' second' + (seconds % 60 === 1 ? '' : 's')}`);
  }
  
  if (milliseconds % 1000 > 0 && parts.length === 0) {
    parts.push(`${milliseconds % 1000}${compact ? 'ms' : ' millisecond' + (milliseconds % 1000 === 1 ? '' : 's')}`);
  }
  
  return parts.join(delimiter);
}

/**
 * @jsonDoc
 * @description 版本号比较函数，支持语义化版本和其他常见版本格式
 * @param {string} version1 - 第一个版本号
 * @param {string} version2 - 第二个版本号
 * @param {Object} [options] - 配置选项
 * @param {boolean} [options.loose=false] - 是否使用宽松模式（允许版本号前缀）
 * @param {string} [options.delimiter='.'] - 版本号分隔符
 * @param {boolean} [options.includePrerelease=false] - 是否考虑预发布版本标识
 * @returns {number} 如果version1 > version2返回1，如果version1 < version2返回-1，如果相等返回0
 */
export function compareVersions(
  version1: string,
  version2: string,
  options: {
    loose?: boolean;
    delimiter?: string;
    includePrerelease?: boolean;
  } = {}
): number {
  const {
    loose = false,
    delimiter = '.',
    includePrerelease = false
  } = options;

  // 清理版本号字符串
  const cleanVersion = (version: string): string => {
    if (loose) {
      // 宽松模式：移除版本号前缀（如 'v', 'version', 'ver' 等）
      version = version.replace(/^[^0-9]*/, '');
    }
    return version;
  };

  const v1 = cleanVersion(version1);
  const v2 = cleanVersion(version2);

  // 解析版本号
  const parseVersion = (version: string): { parts: number[]; prerelease: string | null } => {
    // 分离主版本号和预发布版本标识
    const [versionPart, prereleaseTag] = version.split(/[-+]/);
    
    // 分割版本号部分
    const parts = versionPart
      .split(delimiter)
      .map(part => {
        const num = parseInt(part, 10);
        return isNaN(num) ? 0 : num;
      });
    
    return {
      parts,
      prerelease: prereleaseTag || null
    };
  };

  const v1Info = parseVersion(v1);
  const v2Info = parseVersion(v2);

  // 比较主版本号部分
  const maxLength = Math.max(v1Info.parts.length, v2Info.parts.length);
  for (let i = 0; i < maxLength; i++) {
    const part1 = i < v1Info.parts.length ? v1Info.parts[i] : 0;
    const part2 = i < v2Info.parts.length ? v2Info.parts[i] : 0;

    if (part1 > part2) return 1;
    if (part1 < part2) return -1;
  }

  // 如果主版本号相同，且需要考虑预发布版本
  if (includePrerelease && v1Info.prerelease !== v2Info.prerelease) {
    // 没有预发布标识的版本大于有预发布标识的版本
    if (v1Info.prerelease === null) return 1;
    if (v2Info.prerelease === null) return -1;

    // 比较预发布版本标识
    const prerelease1 = v1Info.prerelease;
    const prerelease2 = v2Info.prerelease;

    // 尝试将预发布版本解析为数字进行比较
    const num1 = parseInt(prerelease1, 10);
    const num2 = parseInt(prerelease2, 10);

    if (!isNaN(num1) && !isNaN(num2)) {
      return num1 > num2 ? 1 : (num1 < num2 ? -1 : 0);
    }

    // 字母顺序比较
    return prerelease1.localeCompare(prerelease2);
  }

  return 0;
}

/**
 * @jsonDoc
 * @description 检查版本号是否在指定范围内
 * @param {string} version - 要检查的版本号
 * @param {string} range - 版本范围（如 '>1.0.0', '>=2.0.0 <3.0.0', '~1.2.3'）
 * @param {Object} [options] - 配置选项，与compareVersions相同
 * @returns {boolean} 如果版本在范围内则返回true
 */
export function satisfiesVersion(
  version: string,
  range: string,
  options: {
    loose?: boolean;
    delimiter?: string;
    includePrerelease?: boolean;
  } = {}
): boolean {
  // 解析范围表达式
  const parseRange = (rangeStr: string): { operator: string; version: string }[] => {
    // 支持多个范围条件（以空格分隔）
    return rangeStr.split(/\s+/).map(part => {
      const match = part.match(/^([<>=~^]*)(.+)$/);
      if (!match) {
        return { operator: '=', version: part };
      }
      
      let [, operator, version] = match;
      
      // 默认操作符为等于
      if (!operator) {
        operator = '=';
      }
      
      return { operator, version };
    });
  };

  // 检查单个条件
  const checkCondition = (
    versionToCheck: string,
    condition: { operator: string; version: string }
  ): boolean => {
    const { operator, version: rangeVersion } = condition;
    const comparison = compareVersions(versionToCheck, rangeVersion, options);

    switch (operator) {
      case '=':
        return comparison === 0;
      case '>':
        return comparison > 0;
      case '>=':
        return comparison >= 0;
      case '<':
        return comparison < 0;
      case '<=':
        return comparison <= 0;
      case '~': // 允许补丁版本更新
        const [major1, minor1] = rangeVersion.split('.').map(Number);
        const [major2, minor2] = versionToCheck.split('.').map(Number);
        return major1 === major2 && minor1 === minor2 && 
               compareVersions(versionToCheck, rangeVersion, options) >= 0;
      case '^': // 允许次版本和补丁版本更新
        const majorRange = parseInt(rangeVersion.split('.')[0], 10);
        const majorCheck = parseInt(versionToCheck.split('.')[0], 10);
        return majorRange === majorCheck && 
               compareVersions(versionToCheck, rangeVersion, options) >= 0;
      default:
        return false;
    }
  };

  const conditions = parseRange(range);
  
  // 所有条件都必须满足
  return conditions.every(condition => checkCondition(version, condition));
}

/**
 * @jsonDoc
 * @description 获取两个版本号之间的差异类型
 * @param {string} version1 - 第一个版本号
 * @param {string} version2 - 第二个版本号
 * @param {Object} [options] - 配置选项，与compareVersions相同
 * @returns {string} 差异类型：'major', 'minor', 'patch', 'prerelease' 或 'same'
 */
export function getVersionDiff(
  version1: string,
  version2: string,
  options: {
    loose?: boolean;
    delimiter?: string;
    includePrerelease?: boolean;
  } = {}
): string {
  const {
    loose = false,
    delimiter = '.',
    includePrerelease = false
  } = options;

  // 清理版本号字符串
  const cleanVersion = (version: string): string => {
    if (loose) {
      version = version.replace(/^[^0-9]*/, '');
    }
    return version;
  };

  const v1 = cleanVersion(version1);
  const v2 = cleanVersion(version2);

  // 解析版本号
  const parseVersion = (version: string): { major: number; minor: number; patch: number; prerelease: string | null } => {
    const [versionPart, prereleaseTag] = version.split(/[-+]/);
    const parts = versionPart.split(delimiter).map(part => {
      const num = parseInt(part, 10);
      return isNaN(num) ? 0 : num;
    });

    return {
      major: parts[0] || 0,
      minor: parts[1] || 0,
      patch: parts[2] || 0,
      prerelease: prereleaseTag || null
    };
  };

  const v1Info = parseVersion(v1);
  const v2Info = parseVersion(v2);

  if (v1Info.major !== v2Info.major) {
    return 'major';
  }

  if (v1Info.minor !== v2Info.minor) {
    return 'minor';
  }

  if (v1Info.patch !== v2Info.patch) {
    return 'patch';
  }

  if (includePrerelease && v1Info.prerelease !== v2Info.prerelease) {
    return 'prerelease';
  }

  return 'same';
}
