/**
 * 首字母大写
 * @param {string} str - 输入字符串
 * @returns {string} 首字母大写的字符串
 */
export function capitalize(str) {
  if (typeof str !== "string" || !str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 驼峰命名转换为短横线命名
 * @param {string} str - 驼峰命名的字符串
 * @returns {string} 短横线命名的字符串
 */
export function camelToKebab(str) {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}

/**
 * 短横线命名转换为驼峰命名
 * @param {string} str - 短横线命名的字符串
 * @returns {string} 驼峰命名的字符串
 */
export function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * 截断字符串
 * @param {string} str - 输入字符串
 * @param {number} maxLength - 最大长度
 * @param {string} suffix - 后缀，默认为'...'
 * @returns {string} 截断后的字符串
 */
export function truncate(str, maxLength, suffix = "...") {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * 移除字符串两端的空白字符和指定字符
 * @param {string} str - 输入字符串
 * @param {string} chars - 要移除的字符，默认为空白字符
 * @returns {string} 处理后的字符串
 */
export function trim(str, chars = " ") {
  const reg = new RegExp(`^[${chars}]+|[${chars}]+$`, "g");
  return str.replace(reg, "");
}

/**
 * 将字符串重复指定次数
 * @param {string} str - 输入字符串
 * @param {number} count - 重复次数
 * @returns {string} 重复后的字符串
 */
export function repeat(str, count) {
  if (count < 0) return "";
  return new Array(count + 1).join(str);
}

/**
 * 字符串转义，将HTML特殊字符转换为实体
 * @param {string} str - 输入字符串
 * @returns {string} 转义后的字符串
 */
export function escape(str) {
  const entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
  };
  return str.replace(/[&<>"'\/]/g, (s) => entityMap[s]);
}

/**
 * 反转字符串
 * @param {string} str - 输入字符串
 * @returns {string} 反转后的字符串
 */
export function reverse(str) {
  return str.split("").reverse().join("");
}

/**
 * 将字符串填充到指定长度
 * @param {string} str - 输入字符串
 * @param {number} length - 目标长度
 * @param {string} chars - 填充字符，默认为空格
 * @param {boolean} end - 是否在末尾填充，默认为true
 * @returns {string} 填充后的字符串
 */
export function pad(str, length, chars = " ", end = true) {
  const diff = length - str.length;
  if (diff <= 0) return str;

  const padding = repeat(chars, Math.ceil(diff / chars.length)).slice(0, diff);
  return end ? str + padding : padding + str;
}

/**
 * 检查字符串是否以指定字符串开头
 * @param {string} str - 输入字符串
 * @param {string} searchStr - 要搜索的字符串
 * @param {number} position - 搜索的起始位置
 * @returns {boolean} 是否以指定字符串开头
 */
export function startsWith(str, searchStr, position = 0) {
  return str.slice(position, position + searchStr.length) === searchStr;
}

/**
 * 检查字符串是否以指定字符串结尾
 * @param {string} str - 输入字符串
 * @param {string} searchStr - 要搜索的字符串
 * @returns {boolean} 是否以指定字符串结尾
 */
export function endsWith(str, searchStr) {
  const lastIndex = str.lastIndexOf(searchStr);
  return lastIndex !== -1 && lastIndex === str.length - searchStr.length;
}

/**
 * 将字符串转换为snake_case
 * @param {string} str - 输入字符串
 * @returns {string} snake_case字符串
 */
export function toSnakeCase(str) {
  return str
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
}

/**
 * 计算字符串中的单词数
 * @param {string} str - 输入字符串
 * @returns {number} 单词数量
 */
export function wordCount(str) {
  return str.trim().split(/\s+/).length;
}
