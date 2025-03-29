/**
 * @jsonDoc
 * @description 获取当前日期时间的时间戳
 * @returns {number} 当前时间戳（毫秒）
 */
export function getCurrentTimestamp(): number {
  return Date.now();
}

/**
 * @jsonDoc
 * @description 将日期格式化为指定格式的字符串
 * @param {Date} date - 要格式化的日期对象
 * @param {string} format - 格式模板，支持 YYYY(年), MM(月), DD(日), HH(时), mm(分), ss(秒)
 * @returns {string} 格式化后的日期字符串
 */
export function formatDateTime(date: Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * @jsonDoc
 * @description 将字符串解析为日期对象
 * @param {string} dateString - 日期字符串
 * @param {string} [format] - 日期字符串的格式（可选，如果提供则按照指定格式解析）
 * @returns {Date} 解析后的日期对象
 */
export function parseDate(dateString: string, format?: string): Date {
  if (!format) {
    return new Date(dateString);
  }

  // 简单的格式解析实现
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let day = now.getDate();
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  // 查找年份
  const yearIndex = format.indexOf('YYYY');
  if (yearIndex !== -1) {
    year = parseInt(dateString.substring(yearIndex, yearIndex + 4), 10);
  }

  // 查找月份
  const monthIndex = format.indexOf('MM');
  if (monthIndex !== -1) {
    month = parseInt(dateString.substring(monthIndex, monthIndex + 2), 10) - 1;
  }

  // 查找日期
  const dayIndex = format.indexOf('DD');
  if (dayIndex !== -1) {
    day = parseInt(dateString.substring(dayIndex, dayIndex + 2), 10);
  }

  // 查找小时
  const hoursIndex = format.indexOf('HH');
  if (hoursIndex !== -1) {
    hours = parseInt(dateString.substring(hoursIndex, hoursIndex + 2), 10);
  }

  // 查找分钟
  const minutesIndex = format.indexOf('mm');
  if (minutesIndex !== -1) {
    minutes = parseInt(dateString.substring(minutesIndex, minutesIndex + 2), 10);
  }

  // 查找秒
  const secondsIndex = format.indexOf('ss');
  if (secondsIndex !== -1) {
    seconds = parseInt(dateString.substring(secondsIndex, secondsIndex + 2), 10);
  }

  return new Date(year, month, day, hours, minutes, seconds);
}

/**
 * @jsonDoc
 * @description 计算两个日期之间的差值
 * @param {Date} date1 - 第一个日期
 * @param {Date} date2 - 第二个日期
 * @param {string} unit - 返回差值的单位，支持 'milliseconds', 'seconds', 'minutes', 'hours', 'days'
 * @returns {number} 两个日期之间的差值
 */
export function dateDiff(date1: Date, date2: Date, unit: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' = 'days'): number {
  const diffMs = Math.abs(date2.getTime() - date1.getTime());
  
  switch (unit) {
    case 'milliseconds':
      return diffMs;
    case 'seconds':
      return Math.floor(diffMs / 1000);
    case 'minutes':
      return Math.floor(diffMs / (1000 * 60));
    case 'hours':
      return Math.floor(diffMs / (1000 * 60 * 60));
    case 'days':
      return Math.floor(diffMs / (1000 * 60 * 60 * 24));
    default:
      return diffMs;
  }
}

/**
 * @jsonDoc
 * @description 向日期添加指定的时间
 * @param {Date} date - 原始日期
 * @param {number} amount - 要添加的数量
 * @param {string} unit - 添加的时间单位，支持 'years', 'months', 'days', 'hours', 'minutes', 'seconds'
 * @returns {Date} 添加时间后的新日期
 */
export function addTime(date: Date, amount: number, unit: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds'): Date {
  const newDate = new Date(date);
  
  switch (unit) {
    case 'years':
      newDate.setFullYear(newDate.getFullYear() + amount);
      break;
    case 'months':
      newDate.setMonth(newDate.getMonth() + amount);
      break;
    case 'days':
      newDate.setDate(newDate.getDate() + amount);
      break;
    case 'hours':
      newDate.setHours(newDate.getHours() + amount);
      break;
    case 'minutes':
      newDate.setMinutes(newDate.getMinutes() + amount);
      break;
    case 'seconds':
      newDate.setSeconds(newDate.getSeconds() + amount);
      break;
  }
  
  return newDate;
}

/**
 * @jsonDoc
 * @description 获取指定日期是星期几
 * @param {Date} date - 日期对象
 * @param {boolean} [asString=false] - 是否返回字符串表示（如 '星期一'）
 * @returns {number|string} 星期几的数字（0-6，0表示星期日）或字符串表示
 */
export function getDayOfWeek(date: Date, asString: boolean = false): number | string {
  const dayIndex = date.getDay();
  
  if (!asString) {
    return dayIndex;
  }
  
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return weekdays[dayIndex];
}

/**
 * @jsonDoc
 * @description 获取指定月份的天数
 * @param {number} year - 年份
 * @param {number} month - 月份（1-12）
 * @returns {number} 该月的天数
 */
export function getDaysInMonth(year: number, month: number): number {
  // 月份需要从0开始，所以这里减1
  return new Date(year, month, 0).getDate();
}

/**
 * @jsonDoc
 * @description 检查给定年份是否为闰年
 * @param {number} year - 年份
 * @returns {boolean} 如果是闰年则返回 true，否则返回 false
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * @jsonDoc
 * @description 获取日期的开始时间（00:00:00）
 * @param {Date} date - 日期对象
 * @returns {Date} 设置为当天开始时间的新日期对象
 */
export function startOfDay(date: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

/**
 * @jsonDoc
 * @description 获取日期的结束时间（23:59:59.999）
 * @param {Date} date - 日期对象
 * @returns {Date} 设置为当天结束时间的新日期对象
 */
export function endOfDay(date: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
}

/**
 * @jsonDoc
 * @description 获取相对时间描述（如"3分钟前"，"2小时后"）
 * @param {Date} date - 要比较的日期
 * @param {Date} [baseDate=new Date()] - 基准日期，默认为当前时间
 * @returns {string} 相对时间描述
 */
export function getRelativeTimeDescription(date: Date, baseDate: Date = new Date()): string {
  const diffMs = date.getTime() - baseDate.getTime();
  const diffAbs = Math.abs(diffMs);
  const isFuture = diffMs > 0;
  
  // 不到1分钟
  if (diffAbs < 60 * 1000) {
    return isFuture ? '刚刚' : '刚刚';
  }
  
  // 不到1小时
  if (diffAbs < 60 * 60 * 1000) {
    const minutes = Math.floor(diffAbs / (60 * 1000));
    return isFuture ? `${minutes}分钟后` : `${minutes}分钟前`;
  }
  
  // 不到1天
  if (diffAbs < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diffAbs / (60 * 60 * 1000));
    return isFuture ? `${hours}小时后` : `${hours}小时前`;
  }
  
  // 不到30天
  if (diffAbs < 30 * 24 * 60 * 60 * 1000) {
    const days = Math.floor(diffAbs / (24 * 60 * 60 * 1000));
    return isFuture ? `${days}天后` : `${days}天前`;
  }
  
  // 不到12个月
  if (diffAbs < 12 * 30 * 24 * 60 * 60 * 1000) {
    const months = Math.floor(diffAbs / (30 * 24 * 60 * 60 * 1000));
    return isFuture ? `${months}个月后` : `${months}个月前`;
  }
  
  // 超过12个月
  const years = Math.floor(diffAbs / (12 * 30 * 24 * 60 * 60 * 1000));
  return isFuture ? `${years}年后` : `${years}年前`;
} 