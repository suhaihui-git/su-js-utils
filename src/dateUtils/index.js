/**
 * 日期工具函数集合
 */

/**
 * 日期格式化
 * @param {Date|string|number} date - 日期对象、时间戳或日期字符串
 * @param {string} format - 格式化模板，支持以下占位符：
 * - YYYY: 四位年份
 * - MM: 两位月份
 * - DD: 两位日期
 * - HH: 两位小时（24小时制）
 * - hh: 两位小时（12小时制）
 * - mm: 两位分钟
 * - ss: 两位秒钟
 * - SSS: 三位毫秒
 * - d: 星期几（数字）
 * - dd: 星期几（中文）
 * - A: 上午/下午
 * @returns {string} 格式化后的日期字符串
 */
export function format(date, format = "YYYY-MM-DD HH:mm:ss") {
  const d = toDate(date);
  if (!isValidDate(d)) return "";

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour24 = d.getHours();
  const hour12 = hour24 % 12 || 12;
  const minute = d.getMinutes();
  const second = d.getSeconds();
  const millisecond = d.getMilliseconds();
  const week = d.getDay();
  const isAM = hour24 < 12;

  const weekDayMap = ["日", "一", "二", "三", "四", "五", "六"];

  return format.replace(
    /\[([^\]]+)\]|YYYY|MM|DD|HH|hh|mm|ss|SSS|d|dd|A/g,
    (match) => {
      if (match[0] === "[") return match.slice(1, -1);

      switch (match) {
        case "YYYY":
          return padStart(year, 4);
        case "MM":
          return padStart(month, 2);
        case "DD":
          return padStart(day, 2);
        case "HH":
          return padStart(hour24, 2);
        case "hh":
          return padStart(hour12, 2);
        case "mm":
          return padStart(minute, 2);
        case "ss":
          return padStart(second, 2);
        case "SSS":
          return padStart(millisecond, 3);
        case "d":
          return week;
        case "dd":
          return weekDayMap[week];
        case "A":
          return isAM ? "上午" : "下午";
        default:
          return match;
      }
    }
  );
}

/**
 * 解析日期
 * @param {Date|string|number} date - 要解析的日期
 * @returns {Date} 日期对象
 */
export function toDate(date) {
  if (date instanceof Date) return date;
  if (typeof date === "number") return new Date(date);
  if (typeof date === "string") {
    // 处理 "YYYY-MM-DD" 格式
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return new Date(date.replace(/-/g, "/"));
    }
    return new Date(date);
  }
  return new Date();
}

/**
 * 验证日期是否有效
 * @param {Date} date - 日期对象
 * @returns {boolean} 是否为有效日期
 */
export function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

/**
 * 获取相对时间描述
 * @param {Date|string|number} date - 日期
 * @param {Date|string|number} [baseDate=new Date()] - 基准日期
 * @returns {string} 相对时间描述
 */
export function relativeTime(date, baseDate = new Date()) {
  const d1 = toDate(date);
  const d2 = toDate(baseDate);
  if (!isValidDate(d1) || !isValidDate(d2)) return "";

  const diff = d2.getTime() - d1.getTime();
  const absDiff = Math.abs(diff);
  const isFuture = diff < 0;
  const prefix = isFuture ? "" : "";
  const suffix = isFuture ? "后" : "前";

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (absDiff < minute) {
    return "刚刚";
  } else if (absDiff < hour) {
    return `${prefix}${Math.floor(absDiff / minute)}分钟${suffix}`;
  } else if (absDiff < day) {
    return `${prefix}${Math.floor(absDiff / hour)}小时${suffix}`;
  } else if (absDiff < week) {
    return `${prefix}${Math.floor(absDiff / day)}天${suffix}`;
  } else if (absDiff < month) {
    return `${prefix}${Math.floor(absDiff / week)}周${suffix}`;
  } else if (absDiff < year) {
    return `${prefix}${Math.floor(absDiff / month)}个月${suffix}`;
  }
  return `${prefix}${Math.floor(absDiff / year)}年${suffix}`;
}

/**
 * 获取日期的开始时间
 * @param {Date|string|number} date - 日期
 * @param {string} unit - 单位：year|month|week|day|hour|minute|second
 * @returns {Date} 开始时间
 */
export function startOf(date, unit = "day") {
  const d = toDate(date);
  if (!isValidDate(d)) return new Date();

  switch (unit) {
    case "year":
      return new Date(d.getFullYear(), 0, 1);
    case "month":
      return new Date(d.getFullYear(), d.getMonth(), 1);
    case "week":
      return new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay());
    case "day":
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    case "hour":
      return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours());
    case "minute":
      return new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes()
      );
    case "second":
      return new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
      );
    default:
      return new Date(d);
  }
}

/**
 * 获取日期的结束时间
 * @param {Date|string|number} date - 日期
 * @param {string} unit - 单位：year|month|week|day|hour|minute|second
 * @returns {Date} 结束时间
 */
export function endOf(date, unit = "day") {
  const d = toDate(date);
  if (!isValidDate(d)) return new Date();

  switch (unit) {
    case "year":
      return new Date(d.getFullYear() + 1, 0, 0, 23, 59, 59, 999);
    case "month":
      return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
    case "week":
      return new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate() + (6 - d.getDay()),
        23,
        59,
        59,
        999
      );
    case "day":
      return new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        23,
        59,
        59,
        999
      );
    case "hour":
      return new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        59,
        59,
        999
      );
    case "minute":
      return new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        59,
        999
      );
    case "second":
      return new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
        999
      );
    default:
      return new Date(d);
  }
}

/**
 * 添加时间
 * @param {Date|string|number} date - 日期
 * @param {number} amount - 数量
 * @param {string} unit - 单位：year|month|week|day|hour|minute|second
 * @returns {Date} 新日期
 */
export function add(date, amount, unit = "day") {
  const d = toDate(date);
  if (!isValidDate(d)) return new Date();

  switch (unit) {
    case "year":
      return new Date(d.setFullYear(d.getFullYear() + amount));
    case "month":
      return new Date(d.setMonth(d.getMonth() + amount));
    case "week":
      return new Date(d.setDate(d.getDate() + amount * 7));
    case "day":
      return new Date(d.setDate(d.getDate() + amount));
    case "hour":
      return new Date(d.setHours(d.getHours() + amount));
    case "minute":
      return new Date(d.setMinutes(d.getMinutes() + amount));
    case "second":
      return new Date(d.setSeconds(d.getSeconds() + amount));
    default:
      return new Date(d);
  }
}

/**
 * 减去时间
 * @param {Date|string|number} date - 日期
 * @param {number} amount - 数量
 * @param {string} unit - 单位：year|month|week|day|hour|minute|second
 * @returns {Date} 新日期
 */
export function subtract(date, amount, unit = "day") {
  return add(date, -amount, unit);
}

/**
 * 获取两个日期之间的差值
 * @param {Date|string|number} date1 - 日期1
 * @param {Date|string|number} date2 - 日期2
 * @param {string} unit - 单位：year|month|week|day|hour|minute|second
 * @returns {number} 差值
 */
export function diff(date1, date2, unit = "day") {
  const d1 = toDate(date1);
  const d2 = toDate(date2);
  if (!isValidDate(d1) || !isValidDate(d2)) return 0;

  const diffMs = d2.getTime() - d1.getTime();
  switch (unit) {
    case "year":
      return d2.getFullYear() - d1.getFullYear();
    case "month":
      return (
        (d2.getFullYear() - d1.getFullYear()) * 12 +
        d2.getMonth() -
        d1.getMonth()
      );
    case "week":
      return Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
    case "day":
      return Math.floor(diffMs / (24 * 60 * 60 * 1000));
    case "hour":
      return Math.floor(diffMs / (60 * 60 * 1000));
    case "minute":
      return Math.floor(diffMs / (60 * 1000));
    case "second":
      return Math.floor(diffMs / 1000);
    default:
      return diffMs;
  }
}

/**
 * 获取日期是一年中的第几天
 * @param {Date|string|number} date - 日期
 * @returns {number} 天数
 */
export function getDayOfYear(date) {
  const d = toDate(date);
  if (!isValidDate(d)) return 0;
  return Math.floor(
    (d - new Date(d.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
}

/**
 * 获取日期是一年中的第几周
 * @param {Date|string|number} date - 日期
 * @returns {number} 周数
 */
export function getWeekOfYear(date) {
  const d = toDate(date);
  if (!isValidDate(d)) return 0;
  const start = new Date(d.getFullYear(), 0, 1);
  const diff = d - start + start.getDay() * 24 * 60 * 60 * 1000;
  return Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1;
}

/**
 * 内部工具函数：补零
 */
function padStart(num, targetLength) {
  return String(num).padStart(targetLength, "0");
}

/**
 * 判断是否为闰年
 * @param {Date|string|number} date - 日期
 * @returns {boolean} 是否为闰年
 */
export function isLeapYear(date) {
  const year = toDate(date).getFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * 获取某月的天数
 * @param {Date|string|number} date - 日期
 * @returns {number} 天数
 */
export function getDaysInMonth(date) {
  const d = toDate(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

/**
 * 获取某年的天数
 * @param {Date|string|number} date - 日期
 * @returns {number} 天数
 */
export function getDaysInYear(date) {
  return isLeapYear(date) ? 366 : 365;
}

/**
 * 判断日期是否为周末
 * @param {Date|string|number} date - 日期
 * @returns {boolean} 是否为周末
 */
export function isWeekend(date) {
  const day = toDate(date).getDay();
  return day === 0 || day === 6;
}

/**
 * 判断日期是否为今天
 * @param {Date|string|number} date - 日期
 * @returns {boolean} 是否为今天
 */
export function isToday(date) {
  const d = toDate(date);
  const today = new Date();
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}

/**
 * 判断日期是否在指定日期之后
 * @param {Date|string|number} date - 要判断的日期
 * @param {Date|string|number} compareDate - 比较的日期
 * @returns {boolean} 是否在之后
 */
export function isAfter(date, compareDate) {
  return toDate(date) > toDate(compareDate);
}

/**
 * 判断日期是否在指定日期之前
 * @param {Date|string|number} date - 要判断的日期
 * @param {Date|string|number} compareDate - 比较的日期
 * @returns {boolean} 是否在之前
 */
export function isBefore(date, compareDate) {
  return toDate(date) < toDate(compareDate);
}

/**
 * 判断日期是否在指定范围内
 * @param {Date|string|number} date - 要判断的日期
 * @param {Date|string|number} startDate - 开始日期
 * @param {Date|string|number} endDate - 结束日期
 * @returns {boolean} 是否在范围内
 */
export function isBetween(date, startDate, endDate) {
  const d = toDate(date);
  return d >= toDate(startDate) && d <= toDate(endDate);
}

/**
 * 获取两个日期之间的所有日期
 * @param {Date|string|number} startDate - 开始日期
 * @param {Date|string|number} endDate - 结束日期
 * @returns {Date[]} 日期数组
 */
export function getDatesBetween(startDate, endDate) {
  const dates = [];
  const start = startOf(startDate, "day");
  const end = startOf(endDate, "day");

  let current = start;
  while (current <= end) {
    dates.push(new Date(current));
    current = add(current, 1, "day");
  }

  return dates;
}

/**
 * 获取月份的第一天
 * @param {Date|string|number} date - 日期
 * @returns {Date} 第一天日期
 */
export function getFirstDayOfMonth(date) {
  return startOf(date, "month");
}

/**
 * 获取月份的最后一天
 * @param {Date|string|number} date - 日期
 * @returns {Date} 最后一天日期
 */
export function getLastDayOfMonth(date) {
  return endOf(date, "month");
}

/**
 * 获取季度的第一天
 * @param {Date|string|number} date - 日期
 * @returns {Date} 第一天日期
 */
export function getFirstDayOfQuarter(date) {
  const d = toDate(date);
  const quarter = Math.floor(d.getMonth() / 3);
  return new Date(d.getFullYear(), quarter * 3, 1);
}

/**
 * 获取季度的最后一天
 * @param {Date|string|number} date - 日期
 * @returns {Date} 最后一天日期
 */
export function getLastDayOfQuarter(date) {
  const d = toDate(date);
  const quarter = Math.floor(d.getMonth() / 3);
  return new Date(d.getFullYear(), quarter * 3 + 3, 0);
}

/**
 * 获取日期所在的季度
 * @param {Date|string|number} date - 日期
 * @returns {number} 季度（1-4）
 */
export function getQuarter(date) {
  return Math.floor(toDate(date).getMonth() / 3) + 1;
}

// 导出所有日期工具
export const dateUtils = {
  format,
  toDate,
  isValidDate,
  relativeTime,
  startOf,
  endOf,
  add,
  subtract,
  diff,
  getDayOfYear,
  getWeekOfYear,
  isLeapYear,
  getDaysInMonth,
  getDaysInYear,
  isWeekend,
  isToday,
  isAfter,
  isBefore,
  isBetween,
  getDatesBetween,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getFirstDayOfQuarter,
  getLastDayOfQuarter,
  getQuarter,
};
