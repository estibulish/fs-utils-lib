import { average, sum } from './math';

/**
 * @jsonDoc
 * @description 数组去重，返回一个新数组
 * @param {Array<T>} array - 需要去重的数组
 * @returns {Array<T>} 去重后的新数组
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * @jsonDoc
 * @description 数组扁平化，将多维数组转为一维数组
 * @param {Array<any>} array - 需要扁平化的数组
 * @param {number} [depth=Infinity] - 扁平化的深度
 * @returns {Array<any>} 扁平化后的新数组
 */
export function flatten(array: any[], depth: number = Infinity): any[] {
  return array.flat(depth);
}

/**
 * @jsonDoc
 * @description 获取数组中的最大值
 * @param {Array<number>} array - 数字数组
 * @returns {number} 数组中的最大值
 */
export function max(array: number[]): number {
  if (array.length === 0) {
    return NaN;
  }
  return Math.max(...array);
}

/**
 * @jsonDoc
 * @description 获取数组中的最小值
 * @param {Array<number>} array - 数字数组
 * @returns {number} 数组中的最小值
 */
export function min(array: number[]): number {
  if (array.length === 0) {
    return NaN;
  }
  return Math.min(...array);
}

/**
 * @jsonDoc
 * @description 对数组进行分组
 * @param {Array<T>} array - 需要分组的数组
 * @param {Function} keySelector - 分组键选择器函数
 * @returns {Object} 分组后的对象，键为分组键，值为分组后的数组
 */
export function groupBy<T>(array: T[], keySelector: (item: T) => string | number): Record<string, T[]> {
  return array.reduce((result, item) => {
    const key = keySelector(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * @jsonDoc
 * @description 将数组分割成指定大小的块
 * @param {Array<T>} array - 需要分割的数组
 * @param {number} size - 每个块的大小
 * @returns {Array<Array<T>>} 分割后的二维数组
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    return [];
  }
  
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * @jsonDoc
 * @description 从数组中随机获取一个元素
 * @param {Array<T>} array - 源数组
 * @returns {T|undefined} 随机元素，如果数组为空则返回 undefined
 */
export function sample<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined;
  }
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

/**
 * @jsonDoc
 * @description 从数组中随机获取多个元素
 * @param {Array<T>} array - 源数组
 * @param {number} n - 要获取的元素数量
 * @returns {Array<T>} 包含随机元素的新数组
 */
export function sampleSize<T>(array: T[], n: number): T[] {
  if (n <= 0 || array.length === 0) {
    return [];
  }
  
  // 创建数组副本以避免修改原数组
  const arrayCopy = [...array];
  const result: T[] = [];
  const count = Math.min(n, arrayCopy.length);
  
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * arrayCopy.length);
    result.push(arrayCopy[index]);
    // 从副本中移除已选元素，确保不会重复选择
    arrayCopy.splice(index, 1);
  }
  
  return result;
}

/**
 * @jsonDoc
 * @description 打乱数组顺序（Fisher-Yates 洗牌算法）
 * @param {Array<T>} array - 需要打乱的数组
 * @returns {Array<T>} 打乱顺序后的新数组
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * @jsonDoc
 * @description 获取两个数组的交集
 * @param {Array<T>} array1 - 第一个数组
 * @param {Array<T>} array2 - 第二个数组
 * @returns {Array<T>} 两个数组的交集
 */
export function intersection<T>(array1: T[], array2: T[]): T[] {
  return array1.filter(item => array2.includes(item));
}

/**
 * @jsonDoc
 * @description 获取两个数组的并集
 * @param {Array<T>} array1 - 第一个数组
 * @param {Array<T>} array2 - 第二个数组
 * @returns {Array<T>} 两个数组的并集
 */
export function union<T>(array1: T[], array2: T[]): T[] {
  return unique([...array1, ...array2]);
}

/**
 * @jsonDoc
 * @description 获取第一个数组中存在但第二个数组中不存在的元素
 * @param {Array<T>} array1 - 第一个数组
 * @param {Array<T>} array2 - 第二个数组
 * @returns {Array<T>} 差集数组
 */
export function difference<T>(array1: T[], array2: T[]): T[] {
  return array1.filter(item => !array2.includes(item));
}

/**
 * @jsonDoc
 * @description 检查数组是否包含指定的所有元素
 * @param {Array<T>} array - 要检查的数组
 * @param {Array<T>} values - 需要包含的元素数组
 * @returns {boolean} 如果数组包含所有指定元素则返回 true，否则返回 false
 */
export function includesAll<T>(array: T[], values: T[]): boolean {
  return values.every(value => array.includes(value));
}

/**
 * @jsonDoc
 * @description 检查数组是否包含指定的任意元素
 * @param {Array<T>} array - 要检查的数组
 * @param {Array<T>} values - 可能包含的元素数组
 * @returns {boolean} 如果数组包含任意一个指定元素则返回 true，否则返回 false
 */
export function includesAny<T>(array: T[], values: T[]): boolean {
  return values.some(value => array.includes(value));
}

/**
 * @jsonDoc
 * @description 移除数组中的 falsy 值（false, null, 0, "", undefined, NaN）
 * @param {Array<T>} array - 源数组
 * @returns {Array<T>} 移除 falsy 值后的新数组
 */
export function compact<T>(array: T[]): T[] {
  return array.filter(Boolean);
}

/**
 * @jsonDoc
 * @description 根据指定属性对对象数组进行排序
 * @param {Array<T>} array - 对象数组
 * @param {string} key - 排序的属性名
 * @param {boolean} [ascending=true] - 是否升序排序
 * @returns {Array<T>} 排序后的新数组
 */
export function sortBy<T>(array: T[], key: keyof T, ascending: boolean = true): T[] {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  });
}

/**
 * @jsonDoc
 * @description 查找数组中满足条件的第一个元素的索引
 * @param {Array<T>} array - 要搜索的数组
 * @param {Function} predicate - 判断函数
 * @returns {number} 找到的元素索引，如果没找到则返回 -1
 */
export function findIndex<T>(array: T[], predicate: (item: T) => boolean): number {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return i;
    }
  }
  return -1;
}

/**
 * @jsonDoc
 * @description 查找数组中满足条件的最后一个元素的索引
 * @param {Array<T>} array - 要搜索的数组
 * @param {Function} predicate - 判断函数
 * @returns {number} 找到的元素索引，如果没找到则返回 -1
 */
export function findLastIndex<T>(array: T[], predicate: (item: T) => boolean): number {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) {
      return i;
    }
  }
  return -1;
}

/**
 * @jsonDoc
 * @description 对象数组去重，根据指定字段或选择器函数
 * @param {Array<T>} array - 需要去重的对象数组
 * @param {string|Function} keyOrSelector - 用于去重的对象属性名或选择器函数
 * @returns {Array<T>} 去重后的新数组
 */
export function uniqueBy<T>(array: T[], keyOrSelector: keyof T | ((item: T) => any)): T[] {
  const seen = new Set();
  return array.filter(item => {
    const key = typeof keyOrSelector === 'function'
      ? keyOrSelector(item)
      : item[keyOrSelector];
    
    if (seen.has(key)) {
      return false;
    }
    
    seen.add(key);
    return true;
  });
}

/**
 * @jsonDoc
 * @description 从数组中移除指定的元素
 * @param {Array<T>} array - 要操作的数组
 * @param {T} item - 要移除的元素
 * @returns {Array<T>} 移除元素后的新数组
 * @template T
 */
export function removeItem<T>(array: T[], item: T): T[] {
  return array.filter(element => element !== item);
}

/**
 * @jsonDoc
 * @description 从数组中移除指定索引的元素
 * @param {Array<T>} array - 要操作的数组
 * @param {number} index - 要移除的元素索引
 * @returns {Array<T>} 移除元素后的新数组
 * @template T
 */
export function removeAt<T>(array: T[], index: number): T[] {
  if (index < 0 || index >= array.length) {
    return [...array];
  }
  return [...array.slice(0, index), ...array.slice(index + 1)];
} 