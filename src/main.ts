import * as fsUtilsLib from 'fs-utils-lib';

// ===== Common 工具函数使用示例 =====
console.log('===== Common 工具函数使用示例 =====');

// 格式化日期
const date = fsUtilsLib.formatDate(new Date(), 'YYYY-MM-DD');
console.log('格式化日期:', date);

// 深拷贝对象
const originalObj = {
  name: '张三',
  age: 30,
  hobbies: ['读书', '游泳'],
  address: {
    city: '北京',
    district: '海淀区'
  }
};
const clonedObj = fsUtilsLib.deepClone(originalObj);
console.log('原始对象:', originalObj);
console.log('深拷贝对象:', clonedObj);
console.log('修改深拷贝对象不会影响原始对象:');
clonedObj.address.city = '上海';
clonedObj.hobbies.push('旅行');
console.log('原始对象:', originalObj);
console.log('修改后的深拷贝对象:', clonedObj);

// 判空函数
console.log('判空函数测试:');
console.log('null 是否为空:', fsUtilsLib.isEmpty(null));
console.log('undefined 是否为空:', fsUtilsLib.isEmpty(undefined));
console.log('空字符串是否为空:', fsUtilsLib.isEmpty(''));
console.log('空白字符串是否为空:', fsUtilsLib.isEmpty('   '));
console.log('非空字符串是否为空:', fsUtilsLib.isEmpty('hello'));
console.log('空数组是否为空:', fsUtilsLib.isEmpty([]));
console.log('非空数组是否为空:', fsUtilsLib.isEmpty([1, 2, 3]));
console.log('空对象是否为空:', fsUtilsLib.isEmpty({}));
console.log('非空对象是否为空:', fsUtilsLib.isEmpty({a: 1}));
console.log('数字0是否为空 (默认选项):', fsUtilsLib.isEmpty(0));
console.log('数字0是否为空 (considerZero=true):', fsUtilsLib.isEmpty(0, {considerZero: true}));
console.log('数字1是否为空:', fsUtilsLib.isEmpty(1));
console.log('布尔值false是否为空:', fsUtilsLib.isEmpty(false));

// 随机字符串
console.log('生成10位随机字符串:', fsUtilsLib.randomString(10));
console.log('生成20位随机字符串:', fsUtilsLib.randomString(20));
console.log('生成30位随机字符串:', fsUtilsLib.randomString(30));

// ===== Storage 工具函数使用示例 =====
console.log('===== Storage 工具函数使用示例 =====');

// localStorage 示例
fsUtilsLib.setLocalStorage('username', '张三');
console.log('从 localStorage 获取用户名:', fsUtilsLib.getLocalStorage('username'));

// 存储对象数据
const userInfo = {
  id: 1001,
  name: '张三',
  age: 28,
  roles: ['admin', 'editor']
};
fsUtilsLib.setLocalStorage('userInfo', userInfo);
console.log('从 localStorage 获取用户信息:', fsUtilsLib.getLocalStorage('userInfo'));

// 带过期时间的 localStorage
fsUtilsLib.setLocalStorageWithExpiry('tempData', { message: '临时数据' }, 60); // 60秒后过期
console.log('从 localStorage 获取临时数据:', fsUtilsLib.getLocalStorageWithExpiry('tempData'));

// sessionStorage 示例
fsUtilsLib.setSessionStorage('sessionUser', '李四');
console.log('从 sessionStorage 获取用户:', fsUtilsLib.getSessionStorage('sessionUser'));

// Cookie 示例
fsUtilsLib.setCookie('cookieUser', '王五', { days: 7 });
console.log('从 Cookie 获取用户:', fsUtilsLib.getCookie('cookieUser'));

// JSON Cookie 示例
fsUtilsLib.setJSONCookie('cookieUserInfo', userInfo, { days: 7 });
console.log('从 Cookie 获取用户信息:', fsUtilsLib.getJSONCookie('cookieUserInfo'));

// 获取所有 Cookie
console.log('所有 Cookie:', fsUtilsLib.getAllCookies());

// IndexedDB 示例 (异步操作)
async function testIndexedDB() {
  try {
    await fsUtilsLib.saveToIndexedDB('testDB', 'users', userInfo, userInfo.id);
    console.log('数据已保存到 IndexedDB');
    
    const retrievedData = await fsUtilsLib.getFromIndexedDB('testDB', 'users', userInfo.id);
    console.log('从 IndexedDB 获取的数据:', retrievedData);
  } catch (error) {
    console.error('IndexedDB 操作失败:', error);
  }
}

// 执行 IndexedDB 测试
testIndexedDB();

// ===== Date 工具函数使用示例 =====
console.log('===== Date 工具函数使用示例 =====');

// 获取当前时间戳
console.log('当前时间戳:', fsUtilsLib.getCurrentTimestamp());

// 格式化日期时间
const now = new Date();
console.log('格式化日期时间:', fsUtilsLib.formatDateTime(now, 'YYYY年MM月DD日 HH:mm:ss'));

// 解析日期字符串
const dateStr = '2023-05-15 14:30:00';
const parsedDate = fsUtilsLib.parseDate(dateStr);
console.log('解析的日期:', parsedDate);

// 日期差值计算
const pastDate = new Date(2023, 0, 1); // 2023年1月1日
const daysDiff = fsUtilsLib.dateDiff(now, pastDate, 'days');
console.log(`距离 2023 年 1 月 1 日已经过去了 ${daysDiff} 天`);

// 添加时间
const nextWeek = fsUtilsLib.addTime(now, 7, 'days');
console.log('一周后的日期:', fsUtilsLib.formatDateTime(nextWeek));

// 获取星期几
console.log('今天是:', fsUtilsLib.getDayOfWeek(now, true));

// 获取月份天数
const year = now.getFullYear();
const month = now.getMonth() + 1;
console.log(`${year}年${month}月有 ${fsUtilsLib.getDaysInMonth(year, month)} 天`);

// 检查闰年
console.log(`${year} 年是闰年吗?`, fsUtilsLib.isLeapYear(year) ? '是' : '否');

// 获取一天的开始和结束
console.log('今天的开始时间:', fsUtilsLib.formatDateTime(fsUtilsLib.startOfDay(now)));
console.log('今天的结束时间:', fsUtilsLib.formatDateTime(fsUtilsLib.endOfDay(now)));

// 相对时间描述
const hourAgo = fsUtilsLib.addTime(now, -1, 'hours');
const dayAhead = fsUtilsLib.addTime(now, 1, 'days');
console.log('一小时前:', fsUtilsLib.getRelativeTimeDescription(hourAgo));
console.log('一天后:', fsUtilsLib.getRelativeTimeDescription(dayAhead));

// ===== Array 工具函数使用示例 =====
console.log('===== Array 工具函数使用示例 =====');

// 数组去重
const duplicateArray = [1, 2, 2, 3, 4, 4, 5];
console.log('原始数组:', duplicateArray);
console.log('去重后的数组:', fsUtilsLib.unique(duplicateArray));

// 数组扁平化
const nestedArray = [1, [2, 3], [4, [5, 6]]];
console.log('嵌套数组:', nestedArray);
console.log('扁平化后的数组:', fsUtilsLib.flatten(nestedArray));

// 数组最大值和最小值
const numbersArray = [15, 7, 23, 9, 4, 18];
console.log('数字数组:', numbersArray);
console.log('最大值:', fsUtilsLib.max(numbersArray));
console.log('最小值:', fsUtilsLib.min(numbersArray));

// 数组求和和平均值
console.log('数组求和:', fsUtilsLib.sum(numbersArray));
console.log('数组平均值:', fsUtilsLib.average(numbersArray));

// 数组分组
const people = [
  { name: '张三', age: 25, city: '北京' },
  { name: '李四', age: 30, city: '上海' },
  { name: '王五', age: 25, city: '广州' },
  { name: '赵六', age: 30, city: '北京' }
];
console.log('按年龄分组:', fsUtilsLib.groupBy(people, person => person.age));
console.log('按城市分组:', fsUtilsLib.groupBy(people, person => person.city));

// 数组分块
console.log('数组分块 (大小为2):', fsUtilsLib.chunk(numbersArray, 2));
console.log('数组分块 (大小为3):', fsUtilsLib.chunk(numbersArray, 3));

// 随机取样
console.log('随机取一个元素:', fsUtilsLib.sample(numbersArray));
console.log('随机取3个元素:', fsUtilsLib.sampleSize(numbersArray, 3));

// 打乱数组
console.log('打乱后的数组:', fsUtilsLib.shuffle(numbersArray));

// 数组集合操作
const array1 = [1, 2, 3, 4, 5];
const array2 = [4, 5, 6, 7, 8];
console.log('数组1:', array1);
console.log('数组2:', array2);
console.log('交集:', fsUtilsLib.intersection(array1, array2));
console.log('并集:', fsUtilsLib.union(array1, array2));
console.log('差集 (array1 - array2):', fsUtilsLib.difference(array1, array2));

// 包含检查
console.log('数组是否包含所有元素 [3, 5]:', fsUtilsLib.includesAll(array1, [3, 5]));
console.log('数组是否包含所有元素 [3, 7]:', fsUtilsLib.includesAll(array1, [3, 7]));
console.log('数组是否包含任意元素 [3, 7]:', fsUtilsLib.includesAny(array1, [3, 7]));
console.log('数组是否包含任意元素 [6, 7]:', fsUtilsLib.includesAny(array1, [6, 7]));

// 移除 falsy 值
const arrayWithFalsy = [0, 1, false, 2, '', 3, null, undefined, NaN];
console.log('包含 falsy 值的数组:', arrayWithFalsy);
console.log('移除 falsy 值后的数组:', fsUtilsLib.compact(arrayWithFalsy));

// 按属性排序
console.log('按年龄升序排序:', fsUtilsLib.sortBy(people, 'age'));
console.log('按年龄降序排序:', fsUtilsLib.sortBy(people, 'age', false));

// 查找索引
console.log('查找第一个大于10的元素索引:', fsUtilsLib.findIndex(numbersArray, num => num > 10));
console.log('查找最后一个大于10的元素索引:', fsUtilsLib.findLastIndex(numbersArray, num => num > 10));

// 对象数组去重
const duplicatePeople = [
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
  { id: 3, name: '王五', age: 25 },
  { id: 1, name: '张三', age: 25 }, // 重复的 id 和 name
  { id: 4, name: '李四', age: 35 }  // 重复的 name，但 id 和 age 不同
];
console.log('原始对象数组:', duplicatePeople);
console.log('按 id 去重后的数组:', fsUtilsLib.uniqueBy(duplicatePeople, 'id'));
console.log('按 name 去重后的数组:', fsUtilsLib.uniqueBy(duplicatePeople, 'name'));
console.log('按 age 去重后的数组:', fsUtilsLib.uniqueBy(duplicatePeople, 'age'));

// 使用选择器函数去重
console.log('按 name+age 组合去重:', fsUtilsLib.uniqueBy(duplicatePeople, 
  item => `${item.name}-${item.age}`
));

// ===== Location 工具函数使用示例 =====
console.log('===== Location 工具函数使用示例 =====');

// 获取当前 URL 信息
console.log('当前完整 URL:', fsUtilsLib.getCurrentUrl());
console.log('当前基础 URL:', fsUtilsLib.getBaseUrl());
console.log('当前路径名:', fsUtilsLib.getPathname());
console.log('当前哈希值:', fsUtilsLib.getHash());
console.log('当前域名:', fsUtilsLib.getDomain());

// 查询参数操作
console.log('所有查询参数:', fsUtilsLib.getQueryParams());
console.log('特定查询参数 "id":', fsUtilsLib.getQueryParam('id', '默认值'));

// URL 构建和解析
const builtUrl = fsUtilsLib.buildUrl('https://example.com/api', {
  page: 1,
  limit: 10,
  search: '测试',
  empty: null // 这个会被忽略
});
console.log('构建的 URL:', builtUrl);
console.log('解析 URL:', fsUtilsLib.parseUrl(builtUrl));

// 检查 URL 类型
console.log('是否为绝对 URL (https://example.com):', fsUtilsLib.isAbsoluteUrl('https://example.com'));
console.log('是否为绝对 URL (/path/to/page):', fsUtilsLib.isAbsoluteUrl('/path/to/page'));

// iframe 检测
console.log('当前页面是否在 iframe 中:', fsUtilsLib.isInIframe());

// ===== Browser 工具函数使用示例 =====
console.log('===== Browser 工具函数使用示例 =====');

// 示例1: 检测当前环境
console.log('===== 环境检测示例 =====');
const env = fsUtilsLib.detectEnvironment();
console.log('当前环境信息:', env);

// 示例2: 获取浏览器信息
console.log('\n===== 浏览器信息示例 =====');
const browser = fsUtilsLib.getBrowserInfo();
console.log(`当前浏览器: ${browser.name} ${browser.version}`);
console.log(`简单浏览器检测: ${fsUtilsLib.detectBrowser()}`);

// 示例3: 检测设备和操作系统
console.log('\n===== 设备和操作系统示例 =====');
console.log(`设备类型: ${fsUtilsLib.detectDevice()}`);
console.log(`操作系统: ${fsUtilsLib.detectOS()}`);
console.log(`是否为触摸设备: ${fsUtilsLib.isTouchDevice()}`);
console.log(`设备方向: ${fsUtilsLib.getDeviceOrientation()}`);
console.log(`设备像素比: ${fsUtilsLib.getDevicePixelRatio()}`);

// 示例4: 检测特性支持
console.log('\n===== 特性支持示例 =====');
const features = fsUtilsLib.detectFeatureSupport();
console.log('支持的Web特性:', features);

// 示例5: 检测特定特性
console.log('\n===== 特定特性检测示例 =====');
console.log(`是否支持localStorage: ${fsUtilsLib.isFeatureSupported('localStorage')}`);
console.log(`是否支持WebGL: ${fsUtilsLib.isFeatureSupported('webgl')}`);
console.log(`是否支持触摸: ${fsUtilsLib.isFeatureSupported('touch')}`);
console.log(`是否支持CSS属性 'grid': ${fsUtilsLib.isCSSPropertySupported('grid')}`);
console.log(`是否支持CSS选择器 ':has': ${fsUtilsLib.isCssSelectorSupported(':has')}`);
console.log(`是否支持Passive事件监听器: ${fsUtilsLib.isPassiveEventListenerSupported()}`);
console.log(`是否支持鼠标事件: ${fsUtilsLib.isMouseSupported()}`);
console.log(`是否支持指针事件: ${fsUtilsLib.isPointerSupported()}`);

// 示例6: 浏览器和设备信息
console.log('\n===== 浏览器和设备信息示例 =====');
console.log(`浏览器语言: ${fsUtilsLib.getBrowserLanguage()}`);
console.log(`窗口尺寸: ${JSON.stringify(fsUtilsLib.getWindowSize())}`);
console.log(`是否为暗色模式: ${fsUtilsLib.isDarkMode()}`);
console.log(`是否为全屏模式: ${fsUtilsLib.isFullscreen()}`);
console.log(`是否在线: ${fsUtilsLib.isOnline()}`);
console.log(`User-Agent: ${fsUtilsLib.getUserAgent()}`);
console.log(`渲染引擎: ${fsUtilsLib.getRenderingEngine()}`);

// 示例7: 网络和电池状态
console.log('\n===== 网络和电池状态示例 =====');
if (fsUtilsLib.isNetworkInformationSupported()) {
  console.log(`网络连接类型: ${fsUtilsLib.getNetworkConnectionType()}`);
}

if (fsUtilsLib.isBatteryStatusSupported()) {
  fsUtilsLib.getBatteryInfo().then(info => {
    if (info) {
      console.log('电池信息:');
      console.log(`- 是否充电: ${info.charging}`);
      console.log(`- 电量: ${info.level * 100}%`);
      console.log(`- 充电时间: ${info.chargingTime === Infinity ? '未知' : info.chargingTime + '秒'}`);
      console.log(`- 放电时间: ${info.dischargingTime === Infinity ? '未知' : info.dischargingTime + '秒'}`);
    }
  });
}

// 示例8: 事件监听
console.log('\n===== 事件监听示例 =====');

// 在线状态监听
const unwatchOnline = fsUtilsLib.watchOnlineStatus(
  () => console.log('网络已连接'),
  () => console.log('网络已断开')
);

// 暗色模式监听
const unwatchDarkMode = fsUtilsLib.watchDarkMode(
  (isDark) => console.log(`暗色模式已${isDark ? '启用' : '禁用'}`)
);

// 全屏状态监听
const unwatchFullscreen = fsUtilsLib.watchFullscreen(
  (isFullscreen) => console.log(`全屏模式已${isFullscreen ? '启用' : '禁用'}`)
);

// 设备方向监听
const unwatchOrientation = fsUtilsLib.watchOrientation(
  (orientation) => console.log(`设备方向: ${orientation}`)
);

// 网络连接监听
let unwatchNetwork: (() => void) | null = null;
if (fsUtilsLib.isNetworkInformationSupported()) {
  unwatchNetwork = fsUtilsLib.watchNetworkConnection(
    (type) => console.log(`网络连接类型已变更为: ${type}`)
  );
}

// 电池状态监听
let unwatchBattery: (() => void) | null = null;
if (fsUtilsLib.isBatteryStatusSupported()) {
  fsUtilsLib.watchBatteryStatus(
    (info) => console.log(`电池状态已变更: 电量${info.level * 100}%, ${info.charging ? '正在充电' : '未充电'}`)
  ).then(unwatch => {
    unwatchBattery = unwatch;
  });
}

// 在实际应用中，可能需要在组件卸载时取消监听
setTimeout(() => {
  console.log('\n===== 取消事件监听 =====');
  unwatchOnline();
  unwatchDarkMode();
  unwatchFullscreen();
  unwatchOrientation();
  if (unwatchNetwork) unwatchNetwork();
  if (unwatchBattery) unwatchBattery();
  console.log('已取消所有监听');
}, 10000);

// 示例9: 浏览器操作
console.log('\n===== 浏览器操作示例 =====');
console.log('平滑滚动到页面顶部 (注释掉以避免干扰)');
// fsUtilsLib.scrollTo(0, 0, 'smooth');

// 示例10: 复制粘贴功能
console.log('\n===== 复制粘贴功能示例 =====');

// 创建HTML示例界面
function createClipboardDemoUI() {
  const demoContainer = document.createElement('div');
  demoContainer.style.margin = '20px';
  demoContainer.style.padding = '20px';
  demoContainer.style.border = '1px solid #ccc';
  demoContainer.style.borderRadius = '5px';
  
  demoContainer.innerHTML = `
    <h3>剪贴板操作演示</h3>
    
    <div style="margin-bottom: 15px;">
      <button id="copyTextButton">复制文本</button>
      <button id="copyJSONButton">复制JSON</button>
    </div>
    
    <div style="margin-bottom: 15px;">
      <button id="pasteButton">从剪贴板粘贴</button>
      <div id="pasteImageContainer" style="margin-top: 10px;"></div>
    </div>
    
    <div style="margin-bottom: 15px;">
      <img id="sampleImage" src="https://via.placeholder.com/200" alt="示例图片" style="max-width: 200px; margin-bottom: 10px;">
      <br>
      <button id="copyImageButton">复制上方图片</button>
    </div>
    
    <div style="margin-bottom: 15px;">
      <button id="startWatchClipboard">开始监听剪贴板</button>
      <div id="clipboardWatchStatus" style="margin-top: 5px; font-style: italic;">未监听</div>
    </div>
    
    <div style="margin-bottom: 15px;">
      <button id="toggleFullscreenButton">切换全屏模式</button>
    </div>
  `;
  
  document.body.appendChild(demoContainer);
  
  // 添加事件监听器
  document.getElementById('copyTextButton')?.addEventListener('click', async () => {
    const text = '这是要复制的文本内容';
    const success = await fsUtilsLib.copyToClipboard(text, {
      showNotification: true,
      notificationText: '文本已复制到剪贴板'
    });
    console.log(`文本复制${success ? '成功' : '失败'}`);
  });
  
  document.getElementById('copyJSONButton')?.addEventListener('click', async () => {
    const jsonData = {
      name: '张三',
      age: 30,
      skills: ['JavaScript', 'TypeScript', 'React'],
      address: {
        city: '北京',
        district: '海淀区'
      }
    };
    
    const success = await fsUtilsLib.copyToClipboard(jsonData, {
      formatJSON: true,
      jsonIndent: 2,
      showNotification: true,
      notificationText: 'JSON已复制到剪贴板'
    });
    
    console.log(`JSON复制${success ? '成功' : '失败'}`);
  });
  
  document.getElementById('pasteButton')?.addEventListener('click', async () => {
    try {
      const clipboardContent = await fsUtilsLib.readFromClipboard({
        parseJSON: true,
        allowHTML: true,
        tryReadImage: true
      });
      
      console.log('从剪贴板读取的内容:');
      console.log('- 文本:', clipboardContent.text);
      
      if (clipboardContent.html) {
        console.log('- HTML:', clipboardContent.html);
      }
      
      if (clipboardContent.json) {
        console.log('- JSON:', clipboardContent.json);
      }
      
      if (clipboardContent.image) {
        console.log('- 图片:', clipboardContent.image.type, `${clipboardContent.image.size} 字节`);
        
        // 显示剪贴板中的图片
        const imageUrl = URL.createObjectURL(clipboardContent.image);
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.style.maxWidth = '300px';
        imgElement.style.maxHeight = '300px';
        
        const container = document.getElementById('pasteImageContainer');
        if (container) {
          container.innerHTML = '';
          container.appendChild(imgElement);
        }
      }
    } catch (error) {
      console.error('从剪贴板读取失败:', error);
    }
  });
  
  document.getElementById('copyImageButton')?.addEventListener('click', async () => {
    const imageElement = document.getElementById('sampleImage') as HTMLImageElement;
    if (imageElement) {
      const success = await fsUtilsLib.copyImageToClipboard(imageElement, {
        type: 'image/png',
        quality: 0.9,
        showNotification: true,
        notificationText: '图片已复制到剪贴板'
      });
      
      console.log(`图片复制${success ? '成功' : '失败'}`);
    } else {
      console.error('找不到示例图片元素');
    }
  });
  
  // 监听剪贴板变化
  let clipboardWatcher: (() => void) | null = null;
  
  document.getElementById('startWatchClipboard')?.addEventListener('click', () => {
    if (!clipboardWatcher) {
      clipboardWatcher = fsUtilsLib.watchClipboard(
        (content) => {
          console.log('剪贴板内容已变化:', content.text.substring(0, 50) + (content.text.length > 50 ? '...' : ''));
          
          const statusElement = document.getElementById('clipboardWatchStatus');
          if (statusElement) {
            statusElement.textContent = `最近更新: ${new Date().toLocaleTimeString()} - "${content.text.substring(0, 30)}${content.text.length > 30 ? '...' : ''}"`;
          }
        },
        {
          parseJSON: true,
          pollingInterval: 1500
        }
      );
      
      console.log('已开始监听剪贴板变化');
      
      const buttonElement = document.getElementById('startWatchClipboard');
      if (buttonElement) {
        buttonElement.textContent = '停止监听剪贴板';
      }
    } else {
      clipboardWatcher();
      clipboardWatcher = null;
      
      console.log('已停止监听剪贴板变化');
      
      const buttonElement = document.getElementById('startWatchClipboard');
      if (buttonElement) {
        buttonElement.textContent = '开始监听剪贴板';
      }
      
      const statusElement = document.getElementById('clipboardWatchStatus');
      if (statusElement) {
        statusElement.textContent = '未监听';
      }
    }
  });
  
  // 全屏切换
  document.getElementById('toggleFullscreenButton')?.addEventListener('click', () => {
    fsUtilsLib.toggleFullscreen();
  });
}

// 当DOM加载完成后创建UI
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createClipboardDemoUI);
  } else {
    createClipboardDemoUI();
  }
}

console.log('\n===== 浏览器工具演示完成 =====');
console.log('注意: 某些功能需要用户交互才能触发，如剪贴板操作、全屏等');

// ===== Math 工具函数使用示例 =====
console.log('===== Math 工具函数使用示例 =====');

// 基本数学函数
console.log('\n===== 基本数学函数 =====');
console.log(`限制数字范围 (clamp(15, 0, 10)): ${fsUtilsLib.clamp(15, 0, 10)}`);
console.log(`线性插值 (lerp(0, 100, 0.5)): ${fsUtilsLib.lerp(0, 100, 0.5)}`);
console.log(`角度转弧度 (degreesToRadians(180)): ${fsUtilsLib.degreesToRadians(180)}`);
console.log(`弧度转角度 (radiansToDegrees(Math.PI)): ${fsUtilsLib.radiansToDegrees(Math.PI)}`);
console.log(`两点距离 (distance(0, 0, 3, 4)): ${fsUtilsLib.distance(0, 0, 3, 4)}`);
console.log(`曼哈顿距离 (manhattanDistance(0, 0, 3, 4)): ${fsUtilsLib.manhattanDistance(0, 0, 3, 4)}`);

// 随机数函数
console.log('\n===== 随机数函数 =====');
console.log(`随机整数 (randomInt(1, 10)): ${fsUtilsLib.randomInt(1, 10)}`);
console.log(`随机浮点数 (randomFloat(1, 10)): ${fsUtilsLib.randomFloat(1, 10)}`);

// 舍入函数
console.log('\n===== 舍入函数 =====');
console.log(`四舍五入到2位小数 (round(3.14159, 2)): ${fsUtilsLib.round(3.14159, 2)}`);
console.log(`向上舍入到2位小数 (ceil(3.14159, 2)): ${fsUtilsLib.ceil(3.14159, 2)}`);
console.log(`向下舍入到2位小数 (floor(3.14159, 2)): ${fsUtilsLib.floor(3.14159, 2)}`);

// 统计函数
console.log('\n===== 统计函数 =====');
const numbers = [2, 4, 6, 8, 10, 2, 6];
console.log(`数组: [${numbers.join(', ')}]`);
console.log(`平均值 (average): ${fsUtilsLib.average(numbers)}`);
console.log(`总和 (sum): ${fsUtilsLib.sum(numbers)}`);
console.log(`中位数 (median): ${fsUtilsLib.median(numbers)}`);
console.log(`众数 (mode): [${fsUtilsLib.mode(numbers).join(', ')}]`);
console.log(`标准差 (standardDeviation): ${fsUtilsLib.standardDeviation(numbers)}`);
console.log(`方差 (variance): ${fsUtilsLib.variance(numbers)}`);

// 组合数学函数
console.log('\n===== 组合数学函数 =====');
console.log(`阶乘 (factorial(5)): ${fsUtilsLib.factorial(5)}`);
console.log(`排列数 (permutation(5, 2)): ${fsUtilsLib.permutation(5, 2)}`);
console.log(`组合数 (combination(5, 2)): ${fsUtilsLib.combination(5, 2)}`);

// 数论函数
console.log('\n===== 数论函数 =====');
console.log(`是否为素数 (isPrime(17)): ${fsUtilsLib.isPrime(17)}`);
console.log(`是否为素数 (isPrime(20)): ${fsUtilsLib.isPrime(20)}`);
console.log(`最大公约数 (gcd(48, 18)): ${fsUtilsLib.gcd(48, 18)}`);
console.log(`最小公倍数 (lcm(48, 18)): ${fsUtilsLib.lcm(48, 18)}`);
console.log(`斐波那契数列第10项 (fibonacci(10)): ${fsUtilsLib.fibonacci(10)}`);

// 数字格式化函数
console.log('\n===== 数字格式化函数 =====');
console.log(`千分位格式化 (formatThousands(1234567.89)): ${fsUtilsLib.formatThousands(1234567.89)}`);
console.log(`科学计数法 (toScientificNotation(1234567.89)): ${fsUtilsLib.toScientificNotation(1234567.89)}`);
console.log(`工程计数法 (toEngineeringNotation(1234567.89)): ${fsUtilsLib.toEngineeringNotation(1234567.89)}`);

// 罗马数字转换
console.log('\n===== 罗马数字转换 =====');
console.log(`阿拉伯数字转罗马数字 (toRoman(1984)): ${fsUtilsLib.toRoman(1984)}`);
console.log(`罗马数字转阿拉伯数字 (fromRoman('MCMLXXXIV')): ${fsUtilsLib.fromRoman('MCMLXXXIV')}`);

// 精确计算函数示例
console.log('\n===== 精确计算函数 =====');
console.log('浮点数精度问题示例:');
console.log('0.1 + 0.2 =', 0.1 + 0.2); // 输出: 0.30000000000000004
console.log('精确加法 (0.1 + 0.2):', fsUtilsLib.preciseAdd(0.1, 0.2)); // 输出: 0.3

console.log('\n减法精度问题:');
console.log('1.5 - 1.2 =', 1.5 - 1.2); // 输出: 0.30000000000000004
console.log('精确减法 (1.5 - 1.2):', fsUtilsLib.preciseSubtract(1.5, 1.2)); // 输出: 0.3

console.log('\n乘法精度问题:');
console.log('0.1 * 0.2 =', 0.1 * 0.2); // 输出: 0.020000000000000004
console.log('精确乘法 (0.1 * 0.2):', fsUtilsLib.preciseMultiply(0.1, 0.2)); // 输出: 0.02

console.log('\n除法精度问题:');
console.log('0.3 / 0.1 =', 0.3 / 0.1); // 输出: 2.9999999999999996
console.log('精确除法 (0.3 / 0.1):', fsUtilsLib.preciseDivide(0.3, 0.1)); // 输出: 3

console.log('\n综合计算:');
console.log('精确计算 (1.1 + 2.2):', fsUtilsLib.preciseCalculate(1.1, '+', 2.2)); // 输出: 3.3
console.log('精确计算 (5.5 - 2.1):', fsUtilsLib.preciseCalculate(5.5, '-', 2.1)); // 输出: 3.4
console.log('精确计算 (3.3 * 2.2):', fsUtilsLib.preciseCalculate(3.3, '*', 2.2)); // 输出: 7.26
console.log('精确计算 (7.2 / 2.4):', fsUtilsLib.preciseCalculate(7.2, '/', 2.4)); // 输出: 3

console.log('\n数字格式化:');
console.log('格式化数字 (3.14159, 2位小数):', fsUtilsLib.formatNumber(3.14159)); // 输出: "3.14"
console.log('格式化数字 (3.14159, 4位小数):', fsUtilsLib.formatNumber(3.14159, 4)); // 输出: "3.1416"
console.log('格式化数字 (3.10000, 2位小数, 移除末尾0):', fsUtilsLib.formatNumber(3.10000, 2, true)); // 输出: "3.1"
console.log('格式化数字 (3.00000, 2位小数, 移除末尾0):', fsUtilsLib.formatNumber(3.00000, 2, true)); // 输出: "3"

// 链式计算器示例
console.log('\n===== 链式计算器示例 =====');
const result1 = fsUtilsLib.calculate(10)
  .add(5)
  .multiply(2)
  .subtract(7)
  .divide(3)
  .result();
console.log('链式计算 (10 + 5) * 2 - 7) / 3 =', result1);

const result2 = fsUtilsLib.calculate(3.14159)
  .power(2)
  .multiply(2)
  .round(4)
  .result();
console.log('链式计算 3.14159² * 2 (四舍五入到4位小数) =', result2);

const formattedResult = fsUtilsLib.calculate(1234.5678)
  .add(8765.4321)
  .format(2);
console.log('格式化结果 (1234.5678 + 8765.4321).format(2) =', formattedResult);

const thousandsResult = fsUtilsLib.calculate(1234567.89)
  .multiply(2)
  .toThousands();
console.log('千分位格式 (1234567.89 * 2).toThousands() =', thousandsResult);

// 复杂计算示例
const complexResult = fsUtilsLib.calculate(100)
  .add(50)
  .multiply(2)
  .subtract(75)
  .divide(5)
  .power(2)
  .sqrt()
  .round(2)
  .result();
console.log('复杂链式计算 sqrt(((100 + 50) * 2 - 75) / 5)²) =', complexResult);

// ===== Encoding 工具函数使用示例 =====
console.log('\n===== Encoding 工具函数使用示例 =====');

// Base64编码/解码
console.log('\n===== Base64编码/解码 =====');
const originalText = '你好，世界！Hello, World!';
const base64Encoded = fsUtilsLib.encodeBase64(originalText);
console.log(`原始文本: ${originalText}`);
console.log(`Base64编码: ${base64Encoded}`);
console.log(`Base64解码: ${fsUtilsLib.decodeBase64(base64Encoded)}`);

// URL安全的Base64
console.log('\n===== URL安全的Base64 =====');
const base64UrlEncoded = fsUtilsLib.encodeBase64Url(originalText);
console.log(`Base64URL编码: ${base64UrlEncoded}`);
console.log(`Base64URL解码: ${fsUtilsLib.decodeBase64Url(base64UrlEncoded)}`);

// URL编码/解码
console.log('\n===== URL编码/解码 =====');
const urlEncoded = fsUtilsLib.encodeUrl(originalText);
console.log(`URL编码: ${urlEncoded}`);
console.log(`URL解码: ${fsUtilsLib.decodeUrl(urlEncoded)}`);

// 十六进制编码/解码
console.log('\n===== 十六进制编码/解码 =====');
const hexEncoded = fsUtilsLib.encodeHex(originalText);
console.log(`十六进制编码: ${hexEncoded}`);
console.log(`十六进制解码: ${fsUtilsLib.decodeHex(hexEncoded)}`);

// Unicode编码/解码
console.log('\n===== Unicode编码/解码 =====');
const unicodeEncoded = fsUtilsLib.encodeUnicode(originalText);
console.log(`Unicode编码: ${unicodeEncoded}`);
console.log(`Unicode解码: ${fsUtilsLib.decodeUnicode(unicodeEncoded)}`);

// 链式编码示例
console.log('\n===== 链式编码示例 =====');
const chainResult = fsUtilsLib.encode('Hello, World!')
  .toBase64()
  .result();
console.log(`链式Base64编码: ${chainResult}`);

const complexChain = fsUtilsLib.encode('你好，世界！')
  .toBase64()
  .toUrl()
  .result();
console.log(`复杂链式编码 (Base64 + URL): ${complexChain}`);

const decodedChain = fsUtilsLib.encode(complexChain)
  .fromUrl()
  .fromBase64()
  .result();
console.log(`链式解码 (URL + Base64): ${decodedChain}`);

// 哈希函数示例（异步）
console.log('\n===== 哈希函数示例 =====');
const hashText = 'Hello, World!';
console.log(`要计算哈希的文本: ${hashText}`);

// 使用异步/await处理Promise
(async () => {
  try {
    const sha256Hash = await fsUtilsLib.sha256(hashText);
    console.log(`SHA-256哈希: ${sha256Hash}`);
    
    const sha1Hash = await fsUtilsLib.sha1(hashText);
    console.log(`SHA-1哈希: ${sha1Hash}`);
  } catch (error) {
    console.error('哈希计算失败:', error);
  }
})();

// ===== 新增 Common 工具函数使用示例 =====
console.log('\n===== 新增 Common 工具函数使用示例 =====');

// 字符串处理函数
console.log('\n===== 字符串处理函数 =====');
console.log('截断字符串:', fsUtilsLib.truncate('这是一个很长的字符串，需要被截断', 10));
console.log('驼峰转短横线:', fsUtilsLib.camelToKebab('getUserInfo'));
console.log('短横线转驼峰:', fsUtilsLib.kebabToCamel('user-info'));
console.log('短横线转帕斯卡:', fsUtilsLib.kebabToCamel('user-info', true));
console.log('下划线转驼峰:', fsUtilsLib.snakeToCamel('user_info'));
console.log('驼峰转下划线:', fsUtilsLib.camelToSnake('getUserInfo'));
console.log('首字母大写:', fsUtilsLib.capitalize('hello'));
console.log('首字母小写:', fsUtilsLib.uncapitalize('Hello'));

// 对象操作函数
console.log('\n===== 对象操作函数 =====');
const testObj = {
  user: {
    profile: {
      name: '张三',
      age: 30,
      address: {
        city: '北京',
        district: '海淀区'
      }
    },
    settings: {
      theme: 'dark',
      notifications: true
    }
  }
};

console.log('安全获取嵌套属性:', fsUtilsLib.get(testObj, 'user.profile.name'));
console.log('安全获取不存在的属性 (带默认值):', fsUtilsLib.get(testObj, 'user.profile.phone', '未设置'));

// 设置嵌套属性
fsUtilsLib.set(testObj, 'user.profile.phone', '13800138000');
fsUtilsLib.set(testObj, 'user.profile.address.zipCode', '100080');
console.log('设置嵌套属性后的对象:', testObj.user.profile);

// 选择和排除属性
const person = { name: '张三', age: 30, gender: '男', phone: '13800138000', email: 'zhangsan@example.com' };
console.log('选择指定属性:', fsUtilsLib.pick(person, ['name', 'age', 'email']));
console.log('排除指定属性:', fsUtilsLib.omit(person, ['phone', 'gender']));

// 对象合并
const defaultSettings = { theme: 'light', fontSize: 14, showSidebar: true };
const userSettings = { theme: 'dark', fontSize: 16 };
console.log('合并对象:', fsUtilsLib.merge({}, defaultSettings, userSettings));

// 类型检查和转换函数
console.log('\n===== 类型检查和转换函数 =====');
console.log('是否为纯对象 ({}): ', fsUtilsLib.isPlainObject({}));
console.log('是否为纯对象 (new Date()): ', fsUtilsLib.isPlainObject(new Date()));
console.log('是否为空值:', fsUtilsLib.isNullOrEmpty(''));
console.log('是否为数字或可转换为数字的字符串:', fsUtilsLib.isNumeric('123.45'));
console.log('转换为数字:', fsUtilsLib.toNumber('123.45'));
console.log('转换为整数:', fsUtilsLib.toInteger('123.45'));
console.log('转换为布尔值:', fsUtilsLib.toBoolean('true'));
console.log('转换为数组:', fsUtilsLib.toArray('单个值'));
console.log('转换为驼峰命名:', fsUtilsLib.toCamelCase('user-info-details'));
console.log('转换为帕斯卡命名:', fsUtilsLib.toPascalCase('user-info-details'));

// 格式化函数
console.log('\n===== 格式化函数 =====');
console.log('格式化文件大小:', fsUtilsLib.formatFileSize(1536000));
console.log('格式化时间间隔 (标准):', fsUtilsLib.formatDuration(3661000)); // 1小时1分1秒
console.log('格式化时间间隔 (紧凑):', fsUtilsLib.formatDuration(3661000, { compact: true }));

// ===== 版本比较函数使用示例 =====
console.log('\n===== 版本比较函数使用示例 =====');

// 基本版本比较
console.log('\n===== 基本版本比较 =====');
console.log('比较版本 1.2.3 和 1.2.4:', fsUtilsLib.compareVersions('1.2.3', '1.2.4'));
console.log('比较版本 2.0.0 和 1.9.9:', fsUtilsLib.compareVersions('2.0.0', '1.9.9'));
console.log('比较版本 1.0.0 和 1.0.0:', fsUtilsLib.compareVersions('1.0.0', '1.0.0'));

// 带前缀的版本比较
console.log('\n===== 带前缀的版本比较 =====');
console.log('比较版本 v1.2.3 和 1.2.4 (宽松模式):', 
  fsUtilsLib.compareVersions('v1.2.3', '1.2.4', { loose: true }));
console.log('比较版本 Version 2.0.0 和 ver1.9.9 (宽松模式):', 
  fsUtilsLib.compareVersions('Version 2.0.0', 'ver1.9.9', { loose: true }));

// 预发布版本比较
console.log('\n===== 预发布版本比较 =====');
console.log('比较版本 1.0.0-alpha 和 1.0.0 (考虑预发布):', 
  fsUtilsLib.compareVersions('1.0.0-alpha', '1.0.0', { includePrerelease: true }));
console.log('比较版本 1.0.0-alpha.1 和 1.0.0-alpha.2 (考虑预发布):', 
  fsUtilsLib.compareVersions('1.0.0-alpha.1', '1.0.0-alpha.2', { includePrerelease: true }));

// 版本范围检查
console.log('\n===== 版本范围检查 =====');
console.log('版本 1.2.3 是否满足 >=1.0.0:', 
  fsUtilsLib.satisfiesVersion('1.2.3', '>=1.0.0'));
console.log('版本 2.5.0 是否满足 >=2.0.0 <3.0.0:', 
  fsUtilsLib.satisfiesVersion('2.5.0', '>=2.0.0 <3.0.0'));
console.log('版本 1.3.0 是否满足 ~1.2.0 (允许补丁版本更新):', 
  fsUtilsLib.satisfiesVersion('1.3.0', '~1.2.0'));
console.log('版本 1.2.5 是否满足 ~1.2.0 (允许补丁版本更新):', 
  fsUtilsLib.satisfiesVersion('1.2.5', '~1.2.0'));
console.log('版本 2.0.0 是否满足 ^1.0.0 (允许次版本和补丁版本更新):', 
  fsUtilsLib.satisfiesVersion('2.0.0', '^1.0.0'));
console.log('版本 1.5.2 是否满足 ^1.0.0 (允许次版本和补丁版本更新):', 
  fsUtilsLib.satisfiesVersion('1.5.2', '^1.0.0'));

// 版本差异类型
console.log('\n===== 版本差异类型 =====');
console.log('版本 1.0.0 和 2.0.0 的差异类型:', 
  fsUtilsLib.getVersionDiff('1.0.0', '2.0.0'));
console.log('版本 1.1.0 和 1.2.0 的差异类型:', 
  fsUtilsLib.getVersionDiff('1.1.0', '1.2.0'));
console.log('版本 1.0.1 和 1.0.2 的差异类型:', 
  fsUtilsLib.getVersionDiff('1.0.1', '1.0.2'));
console.log('版本 1.0.0-alpha 和 1.0.0-beta 的差异类型 (考虑预发布):', 
  fsUtilsLib.getVersionDiff('1.0.0-alpha', '1.0.0-beta', { includePrerelease: true }));
console.log('版本 1.0.0 和 1.0.0 的差异类型:', 
  fsUtilsLib.getVersionDiff('1.0.0', '1.0.0'));
