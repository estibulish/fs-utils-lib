/**
 * @jsonDoc
 * @description 检测当前浏览器类型
 * @returns {string} 浏览器类型（'Chrome', 'Firefox', 'Safari', 'Edge', 'IE', 'Opera', 'Unknown'）
 */
export function detectBrowser(): string {
  const userAgent = navigator.userAgent;
  
  if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg') === -1) {
    return 'Chrome';
  }
  if (userAgent.indexOf('Firefox') > -1) {
    return 'Firefox';
  }
  if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
    return 'Safari';
  }
  if (userAgent.indexOf('Edg') > -1) {
    return 'Edge';
  }
  if (userAgent.indexOf('Trident') > -1 || userAgent.indexOf('MSIE') > -1) {
    return 'IE';
  }
  if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
    return 'Opera';
  }
  
  return 'Unknown';
}

/**
 * @jsonDoc
 * @description 检测当前设备类型
 * @returns {string} 设备类型（'Mobile', 'Tablet', 'Desktop'）
 */
export function detectDevice(): string {
  const userAgent = navigator.userAgent;
  
  // 检测移动设备
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    // 检测平板设备
    if (/iPad|Android(?!.*Mobile)/i.test(userAgent)) {
      return 'Tablet';
    }
    return 'Mobile';
  }
  
  return 'Desktop';
}

/**
 * @jsonDoc
 * @description 检测当前操作系统
 * @returns {string} 操作系统类型（'Windows', 'MacOS', 'iOS', 'Android', 'Linux', 'Unknown'）
 */
export function detectOS(): string {
  const userAgent = navigator.userAgent;
  
  if (userAgent.indexOf('Win') !== -1) {
    return 'Windows';
  }
  if (userAgent.indexOf('Mac') !== -1 && userAgent.indexOf('iPhone') === -1 && userAgent.indexOf('iPad') === -1) {
    return 'MacOS';
  }
  if (userAgent.indexOf('iPhone') !== -1 || userAgent.indexOf('iPad') !== -1) {
    return 'iOS';
  }
  if (userAgent.indexOf('Android') !== -1) {
    return 'Android';
  }
  if (userAgent.indexOf('Linux') !== -1) {
    return 'Linux';
  }
  
  return 'Unknown';
}

/**
 * @jsonDoc
 * @description 复制文本到剪贴板（增强版）
 * @param {string|Blob|Object|Array} content - 要复制的内容（文本、Blob、对象或数组）
 * @param {Object} [options] - 配置选项
 * @param {boolean} [options.formatJSON=true] - 是否格式化JSON对象
 * @param {number} [options.jsonIndent=2] - JSON格式化缩进空格数
 * @param {boolean} [options.showNotification=false] - 是否显示复制成功的通知
 * @param {string} [options.notificationText='复制成功'] - 通知文本
 * @param {number} [options.notificationDuration=2000] - 通知显示时间（毫秒）
 * @returns {Promise<boolean>} 复制成功返回 true，失败返回 false
 */
export async function copyToClipboard(
  content: string | Blob | object | any[],
  options: {
    formatJSON?: boolean;
    jsonIndent?: number;
    showNotification?: boolean;
    notificationText?: string;
    notificationDuration?: number;
  } = {}
): Promise<boolean> {
  const {
    formatJSON = true,
    jsonIndent = 2,
    showNotification = false,
    notificationText = '复制成功',
    notificationDuration = 2000
  } = options;

  try {
    let textToCopy: string;

    // 处理不同类型的内容
    if (content instanceof Blob) {
      textToCopy = await readBlobAsText(content);
    } else if (typeof content === 'object' && content !== null) {
      // 处理对象或数组
      textToCopy = formatJSON
        ? JSON.stringify(content, null, jsonIndent)
        : JSON.stringify(content);
    } else {
      // 处理字符串或其他类型
      textToCopy = String(content);
    }

    // 尝试使用现代 Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(textToCopy);
      
      if (showNotification) {
        showCopyNotification(notificationText, notificationDuration);
      }
      
      return true;
    }

    // 回退到传统方法
    return fallbackCopyToClipboard(textToCopy, showNotification, notificationText, notificationDuration);
  } catch (error) {
    console.error('复制到剪贴板失败:', error);
    return false;
  }
}

/**
 * 将Blob读取为文本
 * @param {Blob} blob - 要读取的Blob对象
 * @returns {Promise<string>} 文本内容
 */
function readBlobAsText(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(blob);
  });
}

/**
 * 传统的复制到剪贴板方法（用于不支持Clipboard API的浏览器）
 * @param {string} text - 要复制的文本
 * @param {boolean} showNotification - 是否显示通知
 * @param {string} notificationText - 通知文本
 * @param {number} notificationDuration - 通知显示时间
 * @returns {boolean} 复制是否成功
 */
function fallbackCopyToClipboard(
  text: string,
  showNotification: boolean,
  notificationText: string,
  notificationDuration: number
): boolean {
  // 创建临时文本区域
  const textarea = document.createElement('textarea');
  textarea.value = text;
  
  // 确保元素不可见
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '-9999px';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';
  
  document.body.appendChild(textarea);
  
  try {
    // 选择文本并复制
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    
    const successful = document.execCommand('copy');
    
    if (successful && showNotification) {
      showCopyNotification(notificationText, notificationDuration);
    }
    
    return successful;
  } catch (err) {
    console.error('回退复制方法失败:', err);
    return false;
  } finally {
    // 清理
    document.body.removeChild(textarea);
  }
}

/**
 * 显示复制成功的通知
 * @param {string} text - 通知文本
 * @param {number} duration - 通知显示时间
 */
function showCopyNotification(text: string, duration: number): void {
  // 创建通知元素
  const notification = document.createElement('div');
  notification.textContent = text;
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.left = '50%';
  notification.style.transform = 'translateX(-50%)';
  notification.style.padding = '8px 16px';
  notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  notification.style.color = 'white';
  notification.style.borderRadius = '4px';
  notification.style.zIndex = '9999';
  notification.style.transition = 'opacity 0.3s ease-in-out';
  
  document.body.appendChild(notification);
  
  // 淡出效果
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, duration - 300);
}

/**
 * @jsonDoc
 * @description 从剪贴板读取内容（增强版）
 * @param {Object} [options] - 配置选项
 * @param {boolean} [options.parseJSON=false] - 尝试将剪贴板内容解析为JSON
 * @param {boolean} [options.allowHTML=false] - 是否允许读取HTML内容
 * @param {boolean} [options.tryReadImage=false] - 是否尝试读取图片内容
 * @returns {Promise<{text: string, html?: string, image?: Blob, json?: any}>} 剪贴板内容
 */
export async function readFromClipboard(
  options: {
    parseJSON?: boolean;
    allowHTML?: boolean;
    tryReadImage?: boolean;
  } = {}
): Promise<{
  text: string;
  html?: string;
  image?: Blob;
  json?: any;
}> {
  const {
    parseJSON = false,
    allowHTML = false,
    tryReadImage = false
  } = options;

  const result: {
    text: string;
    html?: string;
    image?: Blob;
    json?: any;
  } = {
    text: ''
  };

  try {
    // 检查现代 Clipboard API 支持
    if (navigator.clipboard) {
      // 读取文本
      if (navigator.clipboard.readText) {
        result.text = await navigator.clipboard.readText();
      }

      // 读取富文本和图片
      if (allowHTML || tryReadImage) {
        if ('read' in navigator.clipboard) {
          try {
            const clipboardItems = await (navigator.clipboard as any).read();
            
            for (const clipboardItem of clipboardItems) {
              // 读取HTML
              if (allowHTML && clipboardItem.types.includes('text/html')) {
                const blob = await clipboardItem.getType('text/html');
                result.html = await readBlobAsText(blob);
              }
              
              // 读取图片
              if (tryReadImage) {
                const imageTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
                for (const imageType of imageTypes) {
                  if (clipboardItem.types.includes(imageType)) {
                    result.image = await clipboardItem.getType(imageType);
                    break;
                  }
                }
              }
            }
          } catch (err) {
            // 权限错误或其他问题，继续使用文本
            console.warn('无法读取剪贴板的富文本或图片内容:', err);
          }
        }
      }
    } else {
      // 回退到传统方法
      result.text = fallbackReadFromClipboard();
    }

    // 尝试解析JSON
    if (parseJSON && result.text) {
      try {
        result.json = JSON.parse(result.text);
      } catch (e) {
        // 不是有效的JSON，忽略错误
      }
    }

    return result;
  } catch (error) {
    console.error('从剪贴板读取失败:', error);
    return { text: '' };
  }
}

/**
 * 传统的从剪贴板读取方法（用于不支持Clipboard API的浏览器）
 * @returns {string} 剪贴板文本内容
 */
function fallbackReadFromClipboard(): string {
  // 创建临时文本区域
  const textarea = document.createElement('textarea');
  
  // 确保元素不可见
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '-9999px';
  textarea.style.opacity = '0';
  
  document.body.appendChild(textarea);
  
  try {
    // 聚焦并尝试粘贴
    textarea.focus();
    document.execCommand('paste');
    return textarea.value;
  } catch (err) {
    console.error('回退粘贴方法失败:', err);
    return '';
  } finally {
    // 清理
    document.body.removeChild(textarea);
  }
}

/**
 * @jsonDoc
 * @description 监听剪贴板变化（需要用户授予权限）
 * @param {Function} callback - 当剪贴板内容变化时调用的回调函数
 * @param {Object} [options] - 配置选项
 * @param {boolean} [options.parseJSON=false] - 尝试将剪贴板内容解析为JSON
 * @param {boolean} [options.allowHTML=false] - 是否允许读取HTML内容
 * @param {boolean} [options.tryReadImage=false] - 是否尝试读取图片内容
 * @param {number} [options.pollingInterval=1000] - 轮询间隔（毫秒）
 * @returns {Function} 取消监听的函数
 */
export function watchClipboard(
  callback: (content: {
    text: string;
    html?: string;
    image?: Blob;
    json?: any;
  }) => void,
  options: {
    parseJSON?: boolean;
    allowHTML?: boolean;
    tryReadImage?: boolean;
    pollingInterval?: number;
  } = {}
): () => void {
  const {
    parseJSON = false,
    allowHTML = false,
    tryReadImage = false,
    pollingInterval = 1000
  } = options;

  let lastText = '';
  let timerId: number;

  const checkClipboard = async () => {
    try {
      const clipboardContent = await readFromClipboard({
        parseJSON,
        allowHTML,
        tryReadImage
      });

      // 只有当文本内容变化时才触发回调
      if (clipboardContent.text !== lastText) {
        lastText = clipboardContent.text;
        callback(clipboardContent);
      }
    } catch (error) {
      console.error('监听剪贴板失败:', error);
    }
  };

  // 开始轮询
  timerId = window.setInterval(checkClipboard, pollingInterval);

  // 立即执行一次以获取初始值
  checkClipboard();

  // 返回取消监听的函数
  return () => {
    window.clearInterval(timerId);
  };
}

/**
 * @jsonDoc
 * @description 复制图片到剪贴板
 * @param {string|Blob|HTMLImageElement|HTMLCanvasElement} image - 要复制的图片（URL、Blob、Image元素或Canvas元素）
 * @param {Object} [options] - 配置选项
 * @param {string} [options.type='image/png'] - 图片MIME类型
 * @param {number} [options.quality=0.95] - 图片质量（0-1之间，仅适用于JPEG）
 * @param {boolean} [options.showNotification=false] - 是否显示复制成功的通知
 * @param {string} [options.notificationText='图片已复制'] - 通知文本
 * @param {number} [options.notificationDuration=2000] - 通知显示时间（毫秒）
 * @returns {Promise<boolean>} 复制成功返回 true，失败返回 false
 */
export async function copyImageToClipboard(
  image: string | Blob | HTMLImageElement | HTMLCanvasElement,
  options: {
    type?: string;
    quality?: number;
    showNotification?: boolean;
    notificationText?: string;
    notificationDuration?: number;
  } = {}
): Promise<boolean> {
  const {
    type = 'image/png',
    quality = 0.95,
    showNotification = false,
    notificationText = '图片已复制',
    notificationDuration = 2000
  } = options;

  try {
    // 将各种类型的图片转换为Blob
    let imageBlob: Blob;

    if (image instanceof Blob) {
      imageBlob = image;
    } else if (typeof image === 'string') {
      // 假设是URL
      imageBlob = await fetchImageAsBlob(image);
    } else if (image instanceof HTMLCanvasElement) {
      // Canvas元素
      imageBlob = await new Promise<Blob>((resolve, reject) => {
        image.toBlob(
          blob => (blob ? resolve(blob) : reject(new Error('Canvas转Blob失败'))),
          type,
          quality
        );
      });
    } else if (image instanceof HTMLImageElement) {
      // Image元素
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('无法创建Canvas上下文');
      }
      ctx.drawImage(image, 0, 0);
      imageBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          blob => (blob ? resolve(blob) : reject(new Error('Canvas转Blob失败'))),
          type,
          quality
        );
      });
    } else {
      throw new Error('不支持的图片类型');
    }

    // 检查现代Clipboard API支持
    if (navigator.clipboard && (navigator.clipboard as any).write) {
      const clipboardItem = new (window as any).ClipboardItem({
        [imageBlob.type]: imageBlob
      });
      
      await (navigator.clipboard as any).write([clipboardItem]);
      
      if (showNotification) {
        showCopyNotification(notificationText, notificationDuration);
      }
      
      return true;
    } else {
      // 回退方法：创建一个图片并让用户手动复制
      console.warn('当前浏览器不支持直接复制图片到剪贴板');
      
      // 创建一个临时图片并显示
      const tempImage = document.createElement('img');
      tempImage.src = URL.createObjectURL(imageBlob);
      tempImage.style.position = 'fixed';
      tempImage.style.left = '0';
      tempImage.style.top = '0';
      tempImage.style.maxWidth = '100%';
      tempImage.style.maxHeight = '100%';
      tempImage.style.zIndex = '9999';
      tempImage.style.background = 'white';
      tempImage.style.border = '1px solid black';
      tempImage.style.padding = '10px';
      
      const instructions = document.createElement('div');
      instructions.textContent = '请右键点击图片并选择"复制图片"';
      instructions.style.position = 'fixed';
      instructions.style.left = '0';
      instructions.style.bottom = '0';
      instructions.style.width = '100%';
      instructions.style.padding = '10px';
      instructions.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      instructions.style.color = 'white';
      instructions.style.textAlign = 'center';
      instructions.style.zIndex = '10000';
      
      document.body.appendChild(tempImage);
      document.body.appendChild(instructions);
      
      // 点击任意位置关闭
      const cleanup = () => {
        document.body.removeChild(tempImage);
        document.body.removeChild(instructions);
        document.removeEventListener('click', cleanup);
      };
      
      document.addEventListener('click', cleanup);
      
      return false;
    }
  } catch (error) {
    console.error('复制图片到剪贴板失败:', error);
    return false;
  }
}

/**
 * 从URL获取图片Blob
 * @param {string} url - 图片URL
 * @returns {Promise<Blob>} 图片Blob
 */
async function fetchImageAsBlob(url: string): Promise<Blob> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`获取图片失败: ${response.status} ${response.statusText}`);
  }
  return await response.blob();
}

/**
 * @jsonDoc
 * @description 检测浏览器是否在线
 * @returns {boolean} 如果在线则返回 true，否则返回 false
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * @jsonDoc
 * @description 监听浏览器在线状态变化
 * @param {Function} onlineCallback - 当浏览器变为在线状态时调用的回调函数
 * @param {Function} offlineCallback - 当浏览器变为离线状态时调用的回调函数
 * @returns {Function} 取消监听的函数
 */
export function watchOnlineStatus(
  onlineCallback: () => void,
  offlineCallback: () => void
): () => void {
  window.addEventListener('online', onlineCallback);
  window.addEventListener('offline', offlineCallback);
  
  // 返回取消监听的函数
  return () => {
    window.removeEventListener('online', onlineCallback);
    window.removeEventListener('offline', offlineCallback);
  };
}

/**
 * @jsonDoc
 * @description 获取设备像素比
 * @returns {number} 设备像素比
 */
export function getDevicePixelRatio(): number {
  return window.devicePixelRatio || 1;
}

/**
 * @jsonDoc
 * @description 获取浏览器的 User-Agent 字符串
 * @returns {string} User-Agent 字符串
 */
export function getUserAgent(): string {
  return navigator.userAgent;
}

/**
 * @jsonDoc
 * @description 平滑滚动到页面指定位置
 * @param {number} [top=0] - 目标垂直位置
 * @param {number} [left=0] - 目标水平位置
 * @param {string} [behavior='smooth'] - 滚动行为，可选值：'auto', 'smooth'
 */
export function scrollTo(top: number = 0, left: number = 0, behavior: ScrollBehavior = 'smooth'): void {
  window.scrollTo({
    top,
    left,
    behavior
  });
}

/**
 * @jsonDoc
 * @description 平滑滚动到指定元素
 * @param {string|HTMLElement} target - 目标元素或其选择器
 * @param {Object} [options] - 滚动选项
 * @param {string} [options.behavior='smooth'] - 滚动行为，可选值：'auto', 'smooth'
 * @param {number} [options.offset=0] - 滚动偏移量（像素）
 */
export function scrollToElement(
  target: string | HTMLElement,
  options: { behavior?: ScrollBehavior; offset?: number } = {}
): void {
  const { behavior = 'smooth', offset = 0 } = options;
  
  let element: HTMLElement | null;
  
  if (typeof target === 'string') {
    element = document.querySelector(target);
  } else {
    element = target;
  }
  
  if (element) {
    const rect = element.getBoundingClientRect();
    const top = rect.top + window.pageYOffset + offset;
    
    window.scrollTo({
      top,
      behavior
    });
  }
}

/**
 * @jsonDoc
 * @description 禁用页面滚动
 * @returns {Function} 恢复滚动的函数
 */
export function disableScroll(): () => void {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  
  // 保存当前滚动位置
  const originalStyle = document.body.style.cssText;
  
  // 固定页面
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollTop}px`;
  document.body.style.left = `-${scrollLeft}px`;
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';
  
  // 返回恢复滚动的函数
  return () => {
    document.body.style.cssText = originalStyle;
    window.scrollTo(scrollLeft, scrollTop);
  };
}

/**
 * 环境检测工具
 * 用于检测当前代码运行的环境，包括浏览器类型、操作系统、设备类型等
 */

export interface EnvironmentInfo {
  // 浏览器环境
  isBrowser: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isSafari: boolean;
  isEdge: boolean;
  isIE: boolean;
  isOpera: boolean;
  
  // 移动设备
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isIPad: boolean;
  isIPhone: boolean;
  
  // 操作系统
  isWindows: boolean;
  isMac: boolean;
  isLinux: boolean;
  
  // 特殊环境
  isWechat: boolean;
  isElectron: boolean;
  isNode: boolean;
  isWorker: boolean;
  isServiceWorker: boolean;
  
  // 其他
  userAgent: string;
}

/**
 * 检测当前代码运行的环境
 * @returns {EnvironmentInfo} 包含各种环境信息的对象
 */
export function detectEnvironment(): EnvironmentInfo {
  // 默认值设置
  const info: EnvironmentInfo = {
    isBrowser: false,
    isChrome: false,
    isFirefox: false,
    isSafari: false,
    isEdge: false,
    isIE: false,
    isOpera: false,
    
    isMobile: false,
    isIOS: false,
    isAndroid: false,
    isIPad: false,
    isIPhone: false,
    
    isWindows: false,
    isMac: false,
    isLinux: false,
    
    isWechat: false,
    isElectron: false,
    isNode: false,
    isWorker: false,
    isServiceWorker: false,
    
    userAgent: '',
  };
  
  // 检测是否在浏览器环境
  const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  info.isBrowser = isBrowser;
  
  // 如果不在浏览器环境，检测是否在Node环境
  if (!isBrowser) {
    info.isNode = typeof process !== 'undefined' && 
                  typeof process.versions !== 'undefined' && 
                  typeof process.versions.node !== 'undefined';
    
    // 检测是否在Worker环境
    info.isWorker = typeof self !== 'undefined' && typeof self.importScripts === 'function';
    
    // 检测是否在ServiceWorker环境 - 使用类型断言解决TypeScript错误
    info.isServiceWorker = info.isWorker && typeof (self as any).registration !== 'undefined';
    
    return info;
  }
  
  // 获取用户代理字符串
  const ua = navigator.userAgent;
  info.userAgent = ua;
  
  // 检测浏览器类型
  info.isChrome = /Chrome/.test(ua) && !/Edg/.test(ua);
  info.isFirefox = /Firefox/.test(ua);
  info.isSafari = /Safari/.test(ua) && !/Chrome/.test(ua);
  info.isEdge = /Edg/.test(ua);
  info.isIE = /Trident/.test(ua) || /MSIE/.test(ua);
  info.isOpera = /Opera/.test(ua) || /OPR/.test(ua);
  
  // 检测移动设备
  info.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  info.isIOS = /iPhone|iPad|iPod/i.test(ua);
  info.isAndroid = /Android/i.test(ua);
  info.isIPad = /iPad/i.test(ua);
  info.isIPhone = /iPhone/i.test(ua);
  
  // 检测操作系统
  info.isWindows = /Win/.test(ua);
  info.isMac = /Mac/.test(ua) && !/iPhone|iPad|iPod/.test(ua);
  info.isLinux = /Linux/.test(ua) && !/Android/.test(ua);
  
  // 检测特殊环境
  info.isWechat = /MicroMessenger/i.test(ua);
  info.isElectron = typeof (window as any).process === 'object' && 
                    typeof (window as any).process.type === 'string';
  
  return info;
}

/**
 * 获取浏览器信息
 * @returns {{ name: string, version: string }} 浏览器名称和版本
 */
export function getBrowserInfo(): { name: string; version: string } {
  if (typeof navigator === 'undefined') {
    return { name: 'unknown', version: 'unknown' };
  }
  
  const ua = navigator.userAgent;
  let browserName = 'unknown';
  let version = 'unknown';
  
  // 提取浏览器名称和版本的正则表达式
  const browsers = [
    { name: 'Edge', regex: /(edg|edge)\/([\d.]+)/i },
    { name: 'Chrome', regex: /(chrome|chromium|crios)\/([\d.]+)/i },
    { name: 'Firefox', regex: /(firefox|fxios)\/([\d.]+)/i },
    { name: 'Safari', regex: /version\/([\d.]+).*safari/i },
    { name: 'Opera', regex: /(opera|opr)\/([\d.]+)/i },
    { name: 'IE', regex: /(msie |rv:)([\d.]+)/i }
  ];
  
  for (const browser of browsers) {
    const match = ua.match(browser.regex);
    if (match) {
      browserName = browser.name;
      version = match[2];
      break;
    }
  }
  
  return { name: browserName, version };
}

/**
 * @jsonDoc
 * @description 检测特定Web API是否被支持
 * @param {string} feature - 特性名称，如 'localStorage', 'webgl', 'touch'
 * @returns {boolean} 如果支持则返回 true，否则返回 false
 */
export function isFeatureSupported(feature: string): boolean {
  const features = detectFeatureSupport();
  const featureKey = feature.toLowerCase() as keyof typeof features;
  
  if (featureKey in features) {
    return features[featureKey];
  }
  
  console.warn(`未知特性: ${feature}`);
  return false;
}

/**
 * @jsonDoc
 * @description 获取浏览器语言
 * @returns {string} 浏览器语言代码（如 'zh-CN', 'en-US'）
 */
export function getBrowserLanguage(): string {
  return navigator.language || (navigator as any).userLanguage || 'en-US';
}

/**
 * @jsonDoc
 * @description 获取窗口尺寸
 * @returns {{ width: number, height: number }} 窗口宽度和高度
 */
export function getWindowSize(): { width: number; height: number } {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  };
}

/**
 * @jsonDoc
 * @description 检测是否为暗色模式
 * @returns {boolean} 如果是暗色模式则返回 true，否则返回 false
 */
export function isDarkMode(): boolean {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * @jsonDoc
 * @description 监听暗色模式变化
 * @param {Function} callback - 当暗色模式变化时调用的回调函数
 * @returns {Function} 取消监听的函数
 */
export function watchDarkMode(callback: (isDark: boolean) => void): () => void {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const listener = (e: MediaQueryListEvent) => {
    callback(e.matches);
  };
  
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', listener);
  } else if ((mediaQuery as any).addListener) {
    // 兼容旧版浏览器
    (mediaQuery as any).addListener(listener);
  }
  
  // 立即调用一次回调，传递当前状态
  callback(mediaQuery.matches);
  
  // 返回取消监听的函数
  return () => {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener('change', listener);
    } else if ((mediaQuery as any).removeListener) {
      (mediaQuery as any).removeListener(listener);
    }
  };
}

/**
 * @jsonDoc
 * @description 检测浏览器是否支持某个CSS属性
 * @param {string} property - CSS属性名
 * @returns {boolean} 如果支持则返回true，否则返回false
 */
export function isCSSPropertySupported(property: string): boolean {
  return property in document.documentElement.style;
}

/**
 * @jsonDoc
 * @description 检测浏览器是否支持某个CSS选择器
 * @param {string} selector - CSS选择器
 * @returns {boolean} 如果支持则返回true，否则返回false
 */
export function isCssSelectorSupported(selector: string): boolean {
  try {
    document.querySelector(selector);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * @jsonDoc
 * @description 获取浏览器的渲染引擎
 * @returns {string} 渲染引擎名称（'Blink', 'Gecko', 'WebKit', 'Trident', 'EdgeHTML', 'Unknown'）
 */
export function getRenderingEngine(): string {
  const ua = navigator.userAgent;
  
  if (ua.indexOf('Edg/') > -1) {
    return 'Blink'; // 新版Edge使用Blink引擎
  }
  if (ua.indexOf('Chrome') > -1) {
    return 'Blink';
  }
  if (ua.indexOf('Safari') > -1) {
    return 'WebKit';
  }
  if (ua.indexOf('Firefox') > -1) {
    return 'Gecko';
  }
  if (ua.indexOf('Trident') > -1 || ua.indexOf('MSIE') > -1) {
    return 'Trident';
  }
  if (ua.indexOf('Edge') > -1) {
    return 'EdgeHTML'; // 旧版Edge
  }
  
  return 'Unknown';
}

/**
 * @jsonDoc
 * @description 检测浏览器是否支持被动事件监听器
 * @returns {boolean} 如果支持则返回true，否则返回false
 */
export function isPassiveEventListenerSupported(): boolean {
  let isSupported = false;
  
  try {
    // 尝试创建带有passive选项的事件监听器
    const options = Object.defineProperty({}, 'passive', {
      get: function() {
        isSupported = true;
        return true;
      }
    });
    
    // 使用一个测试事件
    window.addEventListener('test', () => {}, options);
    window.removeEventListener('test', () => {}, options);
  } catch (e) {
    // 不支持passive选项
  }
  
  return isSupported;
}

/**
 * @jsonDoc
 * @description 检测浏览器是否支持鼠标事件
 * @returns {boolean} 如果支持则返回true，否则返回false
 */
export function isMouseSupported(): boolean {
  return 'onmousemove' in window && !isTouchDevice();
}

/**
 * @jsonDoc
 * @description 检测浏览器是否支持指针事件
 * @returns {boolean} 如果支持则返回true，否则返回false
 */
export function isPointerSupported(): boolean {
  return 'onpointerdown' in window;
}

/**
 * @jsonDoc
 * @description 检测浏览器是否支持网络连接状态API
 * @returns {boolean} 如果支持则返回true，否则返回false
 */
export function isNetworkInformationSupported(): boolean {
  return 'connection' in navigator;
}

/**
 * @jsonDoc
 * @description 获取网络连接类型（需要浏览器支持Network Information API）
 * @returns {string} 连接类型（'wifi', 'cellular', 'ethernet', 'unknown'等）
 */
export function getNetworkConnectionType(): string {
  if (!isNetworkInformationSupported()) {
    return 'unknown';
  }
  
  const connection = (navigator as any).connection;
  return connection.type || connection.effectiveType || 'unknown';
}

/**
 * @jsonDoc
 * @description 监听网络连接类型变化
 * @param {Function} callback - 当网络连接类型变化时调用的回调函数
 * @returns {Function} 取消监听的函数
 */
export function watchNetworkConnection(callback: (type: string) => void): () => void {
  if (!isNetworkInformationSupported()) {
    console.warn('当前浏览器不支持Network Information API');
    return () => {};
  }
  
  const connection = (navigator as any).connection;
  const changeHandler = () => {
    callback(connection.type || connection.effectiveType || 'unknown');
  };
  
  connection.addEventListener('change', changeHandler);
  
  // 立即调用一次回调，传递当前状态
  callback(connection.type || connection.effectiveType || 'unknown');
  
  // 返回取消监听的函数
  return () => {
    connection.removeEventListener('change', changeHandler);
  };
}

/**
 * @jsonDoc
 * @description 检测浏览器是否支持电池状态API
 * @returns {boolean} 如果支持则返回true，否则返回false
 */
export function isBatteryStatusSupported(): boolean {
  return 'getBattery' in navigator;
}

/**
 * @jsonDoc
 * @description 获取设备电池信息（需要浏览器支持Battery Status API）
 * @returns {Promise<Object>} 包含电池信息的Promise
 */
export async function getBatteryInfo(): Promise<{
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
} | null> {
  if (!isBatteryStatusSupported()) {
    console.warn('当前浏览器不支持Battery Status API');
    return null;
  }
  
  try {
    const battery = await (navigator as any).getBattery();
    return {
      charging: battery.charging,
      level: battery.level,
      chargingTime: battery.chargingTime,
      dischargingTime: battery.dischargingTime
    };
  } catch (error) {
    console.error('获取电池信息失败:', error);
    return null;
  }
}

/**
 * @jsonDoc
 * @description 监听设备电池状态变化
 * @param {Function} callback - 当电池状态变化时调用的回调函数
 * @returns {Promise<Function>} 取消监听的函数的Promise
 */
export async function watchBatteryStatus(
  callback: (info: {
    charging: boolean;
    level: number;
    chargingTime: number;
    dischargingTime: number;
  }) => void
): Promise<() => void> {
  if (!isBatteryStatusSupported()) {
    console.warn('当前浏览器不支持Battery Status API');
    return () => {};
  }
  
  try {
    const battery = await (navigator as any).getBattery();
    
    const updateCallback = () => {
      callback({
        charging: battery.charging,
        level: battery.level,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime
      });
    };
    
    // 监听各种电池事件
    battery.addEventListener('chargingchange', updateCallback);
    battery.addEventListener('levelchange', updateCallback);
    battery.addEventListener('chargingtimechange', updateCallback);
    battery.addEventListener('dischargingtimechange', updateCallback);
    
    // 立即调用一次回调，传递当前状态
    updateCallback();
    
    // 返回取消监听的函数
    return () => {
      battery.removeEventListener('chargingchange', updateCallback);
      battery.removeEventListener('levelchange', updateCallback);
      battery.removeEventListener('chargingtimechange', updateCallback);
      battery.removeEventListener('dischargingtimechange', updateCallback);
    };
  } catch (error) {
    console.error('监听电池状态失败:', error);
    return () => {};
  }
}

/**
 * @jsonDoc
 * @description 检测浏览器是否处于全屏模式（包括F11全屏）
 * @returns {boolean} 如果是全屏模式则返回 true，否则返回 false
 */
export function isFullscreen(): boolean {
  // 检测HTML5 Fullscreen API
  const isApiFullscreen = !!(
    document.fullscreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).mozFullScreenElement ||
    (document as any).msFullscreenElement
  );
  
  // 如果已经通过API检测到全屏，直接返回true
  if (isApiFullscreen) {
    return true;
  }
  
  // 检测F11全屏模式
  // 方法1: 比较屏幕尺寸和窗口尺寸
  const isScreenSizeFullscreen = window.innerWidth === window.screen.width && 
                                window.innerHeight === window.screen.height;
                                
  // 方法2: 检测浏览器UI元素是否可见（不太可靠，但可作为辅助判断）
  const isWindowMaximized = window.outerWidth >= window.screen.availWidth && 
                           window.outerHeight >= window.screen.availHeight;
  
  return isApiFullscreen || isScreenSizeFullscreen || isWindowMaximized;
}

/**
 * @jsonDoc
 * @description 切换全屏模式
 * @param {HTMLElement} [element=document.documentElement] - 要全屏显示的元素，默认为整个页面
 * @returns {Promise<void>} 全屏操作的Promise
 */
export async function toggleFullscreen(element: HTMLElement = document.documentElement): Promise<void> {
  try {
    if (!isFullscreen()) {
      // 进入全屏模式
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        await (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen();
      }
    } else {
      // 退出全屏模式
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
    }
  } catch (error) {
    console.error('全屏操作失败:', error);
  }
}

/**
 * @jsonDoc
 * @description 监听全屏状态变化
 * @param {Function} callback - 当全屏状态变化时调用的回调函数
 * @returns {Function} 取消监听的函数
 */
export function watchFullscreen(callback: (isFullscreen: boolean) => void): () => void {
  const fullscreenChangeHandler = () => {
    callback(isFullscreen());
  };
  
  document.addEventListener('fullscreenchange', fullscreenChangeHandler);
  document.addEventListener('webkitfullscreenchange', fullscreenChangeHandler);
  document.addEventListener('mozfullscreenchange', fullscreenChangeHandler);
  document.addEventListener('MSFullscreenChange', fullscreenChangeHandler);
  
  // 返回取消监听的函数
  return () => {
    document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    document.removeEventListener('webkitfullscreenchange', fullscreenChangeHandler);
    document.removeEventListener('mozfullscreenchange', fullscreenChangeHandler);
    document.removeEventListener('MSFullscreenChange', fullscreenChangeHandler);
  };
}

/**
 * @jsonDoc
 * @description 获取设备方向
 * @returns {string} 设备方向（'portrait'或'landscape'）
 */
export function getDeviceOrientation(): 'portrait' | 'landscape' {
  if (window.matchMedia) {
    return window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';
  }
  
  // 回退方法：通过窗口尺寸判断
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
}

/**
 * @jsonDoc
 * @description 监听设备方向变化
 * @param {Function} callback - 当设备方向变化时调用的回调函数
 * @returns {Function} 取消监听的函数
 */
export function watchOrientation(callback: (orientation: 'portrait' | 'landscape') => void): () => void {
  const orientationChangeHandler = () => {
    callback(getDeviceOrientation());
  };
  
  window.addEventListener('orientationchange', orientationChangeHandler);
  
  // 立即调用一次回调，传递当前状态
  callback(getDeviceOrientation());
  
  // 返回取消监听的函数
  return () => {
    window.removeEventListener('orientationchange', orientationChangeHandler);
  };
}

/**
 * @jsonDoc
 * @description 检测浏览器是否支持触摸事件
 * @returns {boolean} 如果支持触摸事件则返回 true，否则返回 false
 */
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * 检测是否支持特定的Web API
 * @returns {Record<string, boolean>} 各种Web API的支持情况
 */
export function detectFeatureSupport(): Record<string, boolean> {
  if (typeof window === 'undefined') {
    return {};
  }
  
  return {
    localStorage: !!window.localStorage,
    sessionStorage: !!window.sessionStorage,
    webWorker: !!window.Worker,
    serviceWorker: 'serviceWorker' in navigator,
    geolocation: 'geolocation' in navigator,
    webGL: (function() {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
                 (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    })(),
    webGL2: (function() {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
      } catch (e) {
        return false;
      }
    })(),
    touchScreen: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    fetch: 'fetch' in window,
    webSocket: 'WebSocket' in window,
    webRTC: 'RTCPeerConnection' in window,
    webP: (function() {
      const elem = document.createElement('canvas');
      if (elem.getContext && elem.getContext('2d')) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      }
      return false;
    })(),
    clipboard: 'clipboard' in navigator,
    // 使用类型断言解决TypeScript错误
    bluetooth: 'bluetooth' in (navigator as any),
    battery: 'getBattery' in (navigator as any),
    notification: 'Notification' in window,
    webShare: 'share' in navigator,
    // 使用类型断言解决TypeScript错误
    webVR: 'getVRDisplays' in (navigator as any),
    webXR: 'xr' in (navigator as any),
    mediaRecorder: 'MediaRecorder' in window,
    indexedDB: 'indexedDB' in window,
    webAudio: 'AudioContext' in window || 'webkitAudioContext' in window,
  };
} 