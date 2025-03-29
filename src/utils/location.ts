/**
 * @jsonDoc
 * @description 获取当前 URL 的查询参数对象
 * @returns {Record<string, string>} 包含所有查询参数的对象
 */
export function getQueryParams(): Record<string, string> {
  const params: Record<string, string> = {};
  const queryString = window.location.search.substring(1);
  
  if (!queryString) {
    return params;
  }
  
  const pairs = queryString.split('&');
  
  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    if (key) {
      params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
    }
  }
  
  return params;
}

/**
 * @jsonDoc
 * @description 获取指定查询参数的值
 * @param {string} name - 参数名
 * @param {string} [defaultValue=''] - 当参数不存在时返回的默认值
 * @returns {string} 参数值或默认值
 */
export function getQueryParam(name: string, defaultValue: string = ''): string {
  const params = getQueryParams();
  return name in params ? params[name] : defaultValue;
}

/**
 * @jsonDoc
 * @description 更新 URL 的查询参数，不刷新页面
 * @param {Record<string, string>} params - 要更新的参数对象
 * @param {Object} [options] - 配置选项
 * @param {boolean} [options.replace=false] - 是否替换当前历史记录而不是添加新记录
 * @param {boolean} [options.removeEmpty=true] - 是否移除空值参数
 */
export function updateQueryParams(
  params: Record<string, string | null | undefined>,
  options: { replace?: boolean; removeEmpty?: boolean } = {}
): void {
  const { replace = false, removeEmpty = true } = options;
  
  // 获取当前所有参数
  const currentParams = getQueryParams();
  
  // 更新参数
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined || (removeEmpty && value === '')) {
      delete currentParams[key];
    } else {
      currentParams[key] = value;
    }
  }
  
  // 构建新的查询字符串
  const queryString = Object.entries(currentParams)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  
  // 构建新的 URL
  const newUrl = window.location.pathname + (queryString ? `?${queryString}` : '') + window.location.hash;
  
  // 更新 URL，不刷新页面
  if (replace) {
    window.history.replaceState({}, '', newUrl);
  } else {
    window.history.pushState({}, '', newUrl);
  }
}

/**
 * @jsonDoc
 * @description 从 URL 中移除指定的查询参数
 * @param {string|string[]} names - 要移除的参数名或参数名数组
 * @param {boolean} [replace=true] - 是否替换当前历史记录而不是添加新记录
 */
export function removeQueryParams(names: string | string[], replace: boolean = true): void {
  const params: Record<string, null> = {};
  const nameArray = Array.isArray(names) ? names : [names];
  
  for (const name of nameArray) {
    params[name] = null;
  }
  
  updateQueryParams(params, { replace });
}

/**
 * @jsonDoc
 * @description 解析 URL 字符串
 * @param {string} url - 要解析的 URL 字符串
 * @returns {URL} 解析后的 URL 对象
 */
export function parseUrl(url: string): URL {
  try {
    return new URL(url);
  } catch (error) {
    // 如果 URL 不完整，尝试添加当前域名
    if (!url.match(/^https?:\/\//)) {
      const base = `${window.location.protocol}//${window.location.host}`;
      return new URL(url.startsWith('/') ? `${base}${url}` : `${base}/${url}`);
    }
    throw error;
  }
}

/**
 * @jsonDoc
 * @description 获取 URL 的域名部分
 * @param {string} [url=window.location.href] - URL 字符串，默认为当前页面 URL
 * @returns {string} URL 的域名部分
 */
export function getDomain(url: string = window.location.href): string {
  const parsedUrl = parseUrl(url);
  return parsedUrl.hostname;
}

/**
 * @jsonDoc
 * @description 检查当前页面是否在 iframe 中
 * @returns {boolean} 如果在 iframe 中则返回 true，否则返回 false
 */
export function isInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch (e) {
    // 如果访问 window.top 出错，说明当前页面在跨域 iframe 中
    return true;
  }
}

/**
 * @jsonDoc
 * @description 获取当前页面的路径名，不包含查询参数和哈希
 * @returns {string} 当前页面的路径名
 */
export function getPathname(): string {
  return window.location.pathname;
}

/**
 * @jsonDoc
 * @description 获取当前页面的哈希值（不包含 # 符号）
 * @returns {string} 当前页面的哈希值
 */
export function getHash(): string {
  return window.location.hash.substring(1);
}

/**
 * @jsonDoc
 * @description 更新当前页面的哈希值
 * @param {string} hash - 新的哈希值（不需要包含 # 符号）
 */
export function setHash(hash: string): void {
  window.location.hash = hash;
}

/**
 * @jsonDoc
 * @description 重定向到指定 URL
 * @param {string} url - 目标 URL
 * @param {boolean} [newTab=false] - 是否在新标签页中打开
 */
export function redirect(url: string, newTab: boolean = false): void {
  if (newTab) {
    window.open(url, '_blank');
  } else {
    window.location.href = url;
  }
}

/**
 * @jsonDoc
 * @description 刷新当前页面
 * @param {boolean} [forceFetch=false] - 是否强制从服务器获取新内容而不是使用缓存
 */
export function refreshPage(forceFetch: boolean = false): void {
  if (forceFetch) {
    window.location.reload(true);
  } else {
    window.location.reload();
  }
}

/**
 * @jsonDoc
 * @description 构建 URL，自动处理查询参数
 * @param {string} baseUrl - 基础 URL
 * @param {Record<string, string|number|boolean|null|undefined>} [params] - 查询参数对象
 * @returns {string} 构建好的完整 URL
 */
export function buildUrl(
  baseUrl: string,
  params?: Record<string, string | number | boolean | null | undefined>
): string {
  if (!params || Object.keys(params).length === 0) {
    return baseUrl;
  }
  
  const url = new URL(baseUrl, window.location.origin);
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  }
  
  return url.toString();
}

/**
 * @jsonDoc
 * @description 判断 URL 是否为绝对 URL（以 http:// 或 https:// 开头）
 * @param {string} url - 要检查的 URL
 * @returns {boolean} 如果是绝对 URL 则返回 true，否则返回 false
 */
export function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

/**
 * @jsonDoc
 * @description 获取当前页面的完整 URL
 * @returns {string} 当前页面的完整 URL
 */
export function getCurrentUrl(): string {
  return window.location.href;
}

/**
 * @jsonDoc
 * @description 获取当前页面的基础 URL（协议 + 主机名 + 端口）
 * @returns {string} 当前页面的基础 URL
 */
export function getBaseUrl(): string {
  return `${window.location.protocol}//${window.location.host}`;
} 