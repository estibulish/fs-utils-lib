/**
 * @jsonDoc
 * @description 数学工具函数库
 */

/**
 * @jsonDoc
 * @description 将数字限制在指定范围内
 * @param {number} value - 要限制的数字
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 限制后的数字
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * @jsonDoc
 * @description 线性插值
 * @param {number} start - 起始值
 * @param {number} end - 结束值
 * @param {number} t - 插值因子 (0-1)
 * @returns {number} 插值结果
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * clamp(t, 0, 1);
}

/**
 * @jsonDoc
 * @description 将角度转换为弧度
 * @param {number} degrees - 角度
 * @returns {number} 弧度
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * @jsonDoc
 * @description 将弧度转换为角度
 * @param {number} radians - 弧度
 * @returns {number} 角度
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * @jsonDoc
 * @description 计算两点之间的距离
 * @param {number} x1 - 第一个点的x坐标
 * @param {number} y1 - 第一个点的y坐标
 * @param {number} x2 - 第二个点的x坐标
 * @param {number} y2 - 第二个点的y坐标
 * @returns {number} 两点之间的距离
 */
export function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * @jsonDoc
 * @description 计算两点之间的曼哈顿距离
 * @param {number} x1 - 第一个点的x坐标
 * @param {number} y1 - 第一个点的y坐标
 * @param {number} x2 - 第二个点的x坐标
 * @param {number} y2 - 第二个点的y坐标
 * @returns {number} 曼哈顿距离
 */
export function manhattanDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

/**
 * @jsonDoc
 * @description 生成指定范围内的随机整数
 * @param {number} min - 最小值（包含）
 * @param {number} max - 最大值（包含）
 * @returns {number} 随机整数
 */
export function randomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @jsonDoc
 * @description 生成指定范围内的随机浮点数
 * @param {number} min - 最小值（包含）
 * @param {number} max - 最大值（包含）
 * @returns {number} 随机浮点数
 */
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * @jsonDoc
 * @description 将数字四舍五入到指定小数位
 * @param {number} value - 要四舍五入的数字
 * @param {number} [decimals=0] - 小数位数
 * @returns {number} 四舍五入后的数字
 */
export function round(value: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * @jsonDoc
 * @description 将数字向上舍入到指定小数位
 * @param {number} value - 要向上舍入的数字
 * @param {number} [decimals=0] - 小数位数
 * @returns {number} 向上舍入后的数字
 */
export function ceil(value: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.ceil(value * factor) / factor;
}

/**
 * @jsonDoc
 * @description 将数字向下舍入到指定小数位
 * @param {number} value - 要向下舍入的数字
 * @param {number} [decimals=0] - 小数位数
 * @returns {number} 向下舍入后的数字
 */
export function floor(value: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.floor(value * factor) / factor;
}

/**
 * @jsonDoc
 * @description 计算数组的平均值
 * @param {number[]} numbers - 数字数组
 * @returns {number} 平均值
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
}

/**
 * @jsonDoc
 * @description 计算数组的总和
 * @param {number[]} numbers - 数字数组
 * @returns {number} 总和
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, val) => acc + val, 0);
}

/**
 * @jsonDoc
 * @description 计算数组的中位数
 * @param {number[]} numbers - 数字数组
 * @returns {number} 中位数
 */
export function median(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  
  return sorted[middle];
}

/**
 * @jsonDoc
 * @description 计算数组的众数
 * @param {number[]} numbers - 数字数组
 * @returns {number[]} 众数（可能有多个）
 */
export function mode(numbers: number[]): number[] {
  if (numbers.length === 0) return [];
  
  const counts = new Map<number, number>();
  let maxCount = 0;
  
  // 计算每个数字出现的次数
  for (const num of numbers) {
    const count = (counts.get(num) || 0) + 1;
    counts.set(num, count);
    if (count > maxCount) {
      maxCount = count;
    }
  }
  
  // 找出出现次数最多的数字
  const modes: number[] = [];
  for (const [num, count] of counts.entries()) {
    if (count === maxCount) {
      modes.push(num);
    }
  }
  
  return modes;
}

/**
 * @jsonDoc
 * @description 计算数组的标准差
 * @param {number[]} numbers - 数字数组
 * @param {boolean} [population=true] - 是否为总体标准差，false为样本标准差
 * @returns {number} 标准差
 */
export function standardDeviation(numbers: number[], population: boolean = true): number {
  if (numbers.length === 0) return 0;
  if (numbers.length === 1) return 0;
  
  const avg = average(numbers);
  const squareDiffs = numbers.map(num => Math.pow(num - avg, 2));
  const variance = sum(squareDiffs) / (population ? numbers.length : numbers.length - 1);
  
  return Math.sqrt(variance);
}

/**
 * @jsonDoc
 * @description 计算数组的方差
 * @param {number[]} numbers - 数字数组
 * @param {boolean} [population=true] - 是否为总体方差，false为样本方差
 * @returns {number} 方差
 */
export function variance(numbers: number[], population: boolean = true): number {
  if (numbers.length === 0) return 0;
  if (numbers.length === 1) return 0;
  
  const avg = average(numbers);
  const squareDiffs = numbers.map(num => Math.pow(num - avg, 2));
  
  return sum(squareDiffs) / (population ? numbers.length : numbers.length - 1);
}

/**
 * @jsonDoc
 * @description 计算阶乘
 * @param {number} n - 非负整数
 * @returns {number} 阶乘结果
 */
export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('阶乘只接受非负整数');
  }
  
  if (n === 0 || n === 1) {
    return 1;
  }
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  
  return result;
}

/**
 * @jsonDoc
 * @description 计算排列数 P(n,k)
 * @param {number} n - 总数
 * @param {number} k - 选取数
 * @returns {number} 排列数
 */
export function permutation(n: number, k: number): number {
  if (n < 0 || k < 0 || !Number.isInteger(n) || !Number.isInteger(k)) {
    throw new Error('排列数计算只接受非负整数');
  }
  
  if (k > n) {
    return 0;
  }
  
  let result = 1;
  for (let i = n - k + 1; i <= n; i++) {
    result *= i;
  }
  
  return result;
}

/**
 * @jsonDoc
 * @description 计算组合数 C(n,k)
 * @param {number} n - 总数
 * @param {number} k - 选取数
 * @returns {number} 组合数
 */
export function combination(n: number, k: number): number {
  if (n < 0 || k < 0 || !Number.isInteger(n) || !Number.isInteger(k)) {
    throw new Error('组合数计算只接受非负整数');
  }
  
  if (k > n) {
    return 0;
  }
  
  // 优化：选取较小的k值计算
  if (k > n / 2) {
    k = n - k;
  }
  
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result *= (n - (i - 1));
    result /= i;
  }
  
  return result;
}

/**
 * @jsonDoc
 * @description 判断一个数是否为素数
 * @param {number} n - 要判断的数
 * @returns {boolean} 是否为素数
 */
export function isPrime(n: number): boolean {
  if (n <= 1 || !Number.isInteger(n)) {
    return false;
  }
  
  if (n <= 3) {
    return true;
  }
  
  if (n % 2 === 0 || n % 3 === 0) {
    return false;
  }
  
  const sqrtN = Math.sqrt(n);
  for (let i = 5; i <= sqrtN; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }
  
  return true;
}

/**
 * @jsonDoc
 * @description 计算最大公约数
 * @param {number} a - 第一个数
 * @param {number} b - 第二个数
 * @returns {number} 最大公约数
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new Error('最大公约数计算只接受整数');
  }
  
  if (b === 0) {
    return a;
  }
  
  return gcd(b, a % b);
}

/**
 * @jsonDoc
 * @description 计算最小公倍数
 * @param {number} a - 第一个数
 * @param {number} b - 第二个数
 * @returns {number} 最小公倍数
 */
export function lcm(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new Error('最小公倍数计算只接受整数');
  }
  
  return (a * b) / gcd(a, b);
}

/**
 * @jsonDoc
 * @description 将数字格式化为千分位表示
 * @param {number} num - 要格式化的数字
 * @param {number|string} [decimals=2] - 小数位数或格式化选项
 * @returns {string} 千分位格式的字符串
 */
export function formatThousands(num: number, decimals: number | string = 2): string {
  let decimalPlaces: number;
  
  if (typeof decimals === 'string') {
    // 如果是字符串，尝试解析为数字
    decimalPlaces = parseInt(decimals, 10);
    if (isNaN(decimalPlaces)) {
      decimalPlaces = 2; // 默认值
    }
  } else {
    decimalPlaces = decimals;
  }
  
  // 格式化数字，保留指定小数位
  const formattedNum = num.toFixed(decimalPlaces);
  
  // 分离整数部分和小数部分
  const parts = formattedNum.split('.');
  const integerPart = parts[0];
  const decimalPart = parts.length > 1 ? '.' + parts[1] : '';
  
  // 添加千分位分隔符
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const formattedInteger = integerPart.replace(regex, ',');
  
  return formattedInteger + decimalPart;
}

/**
 * @jsonDoc
 * @description 将数字格式化为指定精度的科学计数法
 * @param {number} num - 要格式化的数字
 * @param {number} [precision=2] - 小数点后的位数
 * @returns {string} 科学计数法表示的字符串
 */
export function toScientificNotation(num: number, precision: number = 2): string {
  return num.toExponential(precision);
}

/**
 * @jsonDoc
 * @description 将数字格式化为指定精度的工程计数法（指数为3的倍数）
 * @param {number} num - 要格式化的数字
 * @param {number} [precision=2] - 小数点后的位数
 * @returns {string} 工程计数法表示的字符串
 */
export function toEngineeringNotation(num: number, precision: number = 2): string {
  if (num === 0) return '0';
  
  const sign = num < 0 ? '-' : '';
  const absNum = Math.abs(num);
  const exponent = Math.floor(Math.log10(absNum));
  const engineeringExp = Math.floor(exponent / 3) * 3;
  
  const mantissa = absNum / Math.pow(10, engineeringExp);
  
  return `${sign}${mantissa.toFixed(precision)}e${engineeringExp}`;
}

/**
 * @jsonDoc
 * @description 计算斐波那契数列的第n项
 * @param {number} n - 项数（从0开始）
 * @returns {number} 斐波那契数
 */
export function fibonacci(n: number): number {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('斐波那契数列计算只接受非负整数');
  }
  
  if (n === 0) return 0;
  if (n === 1) return 1;
  
  let a = 0;
  let b = 1;
  
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  
  return b;
}

/**
 * @jsonDoc
 * @description 将数字转换为罗马数字表示
 * @param {number} num - 要转换的数字 (1-3999)
 * @returns {string} 罗马数字表示
 */
export function toRoman(num: number): string {
  if (num < 1 || num > 3999 || !Number.isInteger(num)) {
    throw new Error('罗马数字转换只支持1-3999的整数');
  }
  
  const romanNumerals = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
  ];
  
  let result = '';
  let remaining = num;
  
  for (const { value, symbol } of romanNumerals) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  
  return result;
}

/**
 * @jsonDoc
 * @description 将罗马数字转换为阿拉伯数字
 * @param {string} roman - 罗马数字字符串
 * @returns {number} 阿拉伯数字
 */
export function fromRoman(roman: string): number {
  const romanMap: Record<string, number> = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
  };
  
  let result = 0;
  let prevValue = 0;
  
  // 从右向左遍历
  for (let i = roman.length - 1; i >= 0; i--) {
    const char = roman[i];
    const value = romanMap[char];
    
    if (value === undefined) {
      throw new Error(`无效的罗马数字字符: ${char}`);
    }
    
    if (value >= prevValue) {
      result += value;
    } else {
      result -= value;
    }
    
    prevValue = value;
  }
  
  return result;
}

/**
 * @jsonDoc
 * @description 解决JavaScript浮点数精度问题的工具函数
 */

/**
 * @jsonDoc
 * @description 获取数字的小数位数
 * @param {number} num - 要检查的数字
 * @returns {number} 小数位数
 * @private
 */
function getDecimalPlaces(num: number): number {
  const str = num.toString();
  const decimalIndex = str.indexOf('.');
  return decimalIndex === -1 ? 0 : str.length - decimalIndex - 1;
}

/**
 * @jsonDoc
 * @description 精确加法，解决浮点数精度问题
 * @param {number} a - 第一个加数
 * @param {number} b - 第二个加数
 * @returns {number} 精确的加法结果
 */
export function preciseAdd(a: number, b: number): number {
  const decimalPlacesA = getDecimalPlaces(a);
  const decimalPlacesB = getDecimalPlaces(b);
  const maxDecimalPlaces = Math.max(decimalPlacesA, decimalPlacesB);
  const multiplier = Math.pow(10, maxDecimalPlaces);
  
  return Math.round((a * multiplier + b * multiplier)) / multiplier;
}

/**
 * @jsonDoc
 * @description 精确减法，解决浮点数精度问题
 * @param {number} a - 被减数
 * @param {number} b - 减数
 * @returns {number} 精确的减法结果
 */
export function preciseSubtract(a: number, b: number): number {
  const decimalPlacesA = getDecimalPlaces(a);
  const decimalPlacesB = getDecimalPlaces(b);
  const maxDecimalPlaces = Math.max(decimalPlacesA, decimalPlacesB);
  const multiplier = Math.pow(10, maxDecimalPlaces);
  
  return Math.round((a * multiplier - b * multiplier)) / multiplier;
}

/**
 * @jsonDoc
 * @description 精确乘法，解决浮点数精度问题
 * @param {number} a - 第一个因数
 * @param {number} b - 第二个因数
 * @returns {number} 精确的乘法结果
 */
export function preciseMultiply(a: number, b: number): number {
  const decimalPlacesA = getDecimalPlaces(a);
  const decimalPlacesB = getDecimalPlaces(b);
  const multiplier = Math.pow(10, decimalPlacesA + decimalPlacesB);
  
  return Math.round(a * multiplier * b) / multiplier;
}

/**
 * @jsonDoc
 * @description 精确除法，解决浮点数精度问题
 * @param {number} a - 被除数
 * @param {number} b - 除数
 * @param {number} [precision=10] - 结果的精度（小数位数）
 * @returns {number} 精确的除法结果
 */
export function preciseDivide(a: number, b: number, precision: number = 10): number {
  if (b === 0) {
    throw new Error('除数不能为零');
  }
  
  const multiplier = Math.pow(10, precision);
  return Math.round((a / b) * multiplier) / multiplier;
}

/**
 * @jsonDoc
 * @description 精确计算，支持加减乘除四则运算
 * @param {number} a - 第一个操作数
 * @param {string} operator - 运算符 ('+', '-', '*', '/')
 * @param {number} b - 第二个操作数
 * @param {number} [precision=10] - 除法运算的精度
 * @returns {number} 精确的计算结果
 */
export function preciseCalculate(a: number, operator: '+' | '-' | '*' | '/', b: number, precision: number = 10): number {
  switch (operator) {
    case '+':
      return preciseAdd(a, b);
    case '-':
      return preciseSubtract(a, b);
    case '*':
      return preciseMultiply(a, b);
    case '/':
      return preciseDivide(a, b, precision);
    default:
      throw new Error(`不支持的运算符: ${operator}`);
  }
}

/**
 * @jsonDoc
 * @description 将数字格式化为指定小数位数，解决浮点数精度问题
 * @param {number} num - 要格式化的数字
 * @param {number} [decimals=2] - 小数位数
 * @param {boolean} [removeTrailingZeros=false] - 是否移除末尾的0
 * @returns {string} 格式化后的数字字符串
 */
export function formatNumber(num: number, decimals: number = 2, removeTrailingZeros: boolean = false): string {
  const formatted = num.toFixed(decimals);
  
  if (removeTrailingZeros) {
    return formatted.replace(/\.?0+$/, '');
  }
  
  return formatted;
}

/**
 * @jsonDoc
 * @description 数学计算器类，支持链式调用和精确计算
 */
export class Calculator {
  private value: number;

  /**
   * @jsonDoc
   * @description 创建一个新的计算器实例
   * @param {number} initialValue - 初始值
   */
  constructor(initialValue: number = 0) {
    this.value = initialValue;
  }

  /**
   * @jsonDoc
   * @description 精确加法
   * @param {number} num - 要加的数
   * @returns {Calculator} 计算器实例，用于链式调用
   */
  add(num: number): Calculator {
    this.value = preciseAdd(this.value, num);
    return this;
  }

  /**
   * @jsonDoc
   * @description 精确减法
   * @param {number} num - 要减的数
   * @returns {Calculator} 计算器实例，用于链式调用
   */
  subtract(num: number): Calculator {
    this.value = preciseSubtract(this.value, num);
    return this;
  }

  /**
   * @jsonDoc
   * @description 精确乘法
   * @param {number} num - 要乘的数
   * @returns {Calculator} 计算器实例，用于链式调用
   */
  multiply(num: number): Calculator {
    this.value = preciseMultiply(this.value, num);
    return this;
  }

  /**
   * @jsonDoc
   * @description 精确除法
   * @param {number} num - 要除的数
   * @param {number} [precision=10] - 结果的精度（小数位数）
   * @returns {Calculator} 计算器实例，用于链式调用
   */
  divide(num: number, precision: number = 10): Calculator {
    this.value = preciseDivide(this.value, num, precision);
    return this;
  }

  /**
   * @jsonDoc
   * @description 幂运算
   * @param {number} exponent - 指数
   * @returns {Calculator} 计算器实例，用于链式调用
   */
  power(exponent: number): Calculator {
    this.value = Math.pow(this.value, exponent);
    return this;
  }

  /**
   * @jsonDoc
   * @description 平方根
   * @returns {Calculator} 计算器实例，用于链式调用
   */
  sqrt(): Calculator {
    if (this.value < 0) {
      throw new Error('不能对负数进行平方根运算');
    }
    this.value = Math.sqrt(this.value);
    return this;
  }

  /**
   * @jsonDoc
   * @description 绝对值
   * @returns {Calculator} 计算器实例，用于链式调用
   */
  abs(): Calculator {
    this.value = Math.abs(this.value);
    return this;
  }

  /**
   * @jsonDoc
   * @description 四舍五入到指定小数位
   * @param {number} [decimals=0] - 小数位数
   * @returns {Calculator} 计算器实例，用于链式调用
   */
  round(decimals: number = 0): Calculator {
    const multiplier = Math.pow(10, decimals);
    this.value = Math.round(this.value * multiplier) / multiplier;
    return this;
  }

  /**
   * @jsonDoc
   * @description 向上舍入到指定小数位
   * @param {number} [decimals=0] - 小数位数
   * @returns {Calculator} 计算器实例，用于链式调用
   */
  ceil(decimals: number = 0): Calculator {
    const multiplier = Math.pow(10, decimals);
    this.value = Math.ceil(this.value * multiplier) / multiplier;
    return this;
  }

  /**
   * @jsonDoc
   * @description 向下舍入到指定小数位
   * @param {number} [decimals=0] - 小数位数
   * @returns {Calculator} 计算器实例，用于链式调用
   */
  floor(decimals: number = 0): Calculator {
    const multiplier = Math.pow(10, decimals);
    this.value = Math.floor(this.value * multiplier) / multiplier;
    return this;
  }

  /**
   * @jsonDoc
   * @description 获取当前计算结果
   * @returns {number} 计算结果
   */
  result(): number {
    return this.value;
  }

  /**
   * @jsonDoc
   * @description 格式化当前计算结果
   * @param {number} [decimals=2] - 小数位数
   * @param {boolean} [removeTrailingZeros=false] - 是否移除末尾的0
   * @returns {string} 格式化后的结果
   */
  format(decimals: number = 2, removeTrailingZeros: boolean = false): string {
    return formatNumber(this.value, decimals, removeTrailingZeros);
  }

  /**
   * @jsonDoc
   * @description 将当前值转换为千分位格式
   * @param {number} [decimals=2] - 小数位数
   * @returns {string} 千分位格式的结果
   */
  toThousands(decimals: number = 2): string {
    return formatThousands(this.value, decimals.toString());
  }

  /**
   * @jsonDoc
   * @description 将当前值转换为科学计数法
   * @param {number} [decimals=2] - 小数位数
   * @returns {string} 科学计数法格式的结果
   */
  toScientific(decimals: number = 2): string {
    return toScientificNotation(this.value, decimals);
  }
}

/**
 * @jsonDoc
 * @description 创建一个新的计算器实例
 * @param {number} [initialValue=0] - 初始值
 * @returns {Calculator} 计算器实例
 */
export function calculate(initialValue: number = 0): Calculator {
  return new Calculator(initialValue);
} 