/**
 * 安全地获取数组指定索引的元素
 * @param {Array} arr - 输入数组
 * @param {number} index - 索引
 * @param {*} defaultValue - 默认值
 * @returns {*} 数组元素或默认值
 */
export function get(arr, index, defaultValue = undefined) {
  if (!Array.isArray(arr) || index < 0 || index >= arr.length) {
    return defaultValue;
  }
  return arr[index];
}

/**
 * 安全地删除数组中的重复元素
 * @param {Array} arr - 输入数组
 * @returns {Array} 新数组
 */
export function unique(arr) {
  if (!Array.isArray(arr)) return [];
  return [...new Set(arr)];
}

/**
 * 将数组分组
 * @param {Array} arr - 输入数组
 * @param {number} size - 分组大小
 * @returns {Array} 分组后的数组
 */
export function chunk(arr, size = 1) {
  if (!Array.isArray(arr) || size < 1) return [];
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * 扁平化数组
 * @param {Array} arr - 输入数组
 * @param {number} depth - 扁平化深度
 * @returns {Array} 扁平化后的数组
 */
export function flatten(arr, depth = 1) {
  if (!Array.isArray(arr)) return [];
  if (depth < 1) return arr.slice();

  return arr.reduce((flat, item) => {
    if (Array.isArray(item) && depth > 0) {
      return flat.concat(flatten(item, depth - 1));
    }
    return flat.concat(item);
  }, []);
}

/**
 * 安全地获取数组交集
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @returns {Array} 交集数组
 */
export function intersection(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
  return arr1.filter((item) => arr2.includes(item));
}

/**
 * 移除数组中的假值元素
 * @param {Array} arr - 输入数组
 * @returns {Array} 新数组
 */
export function compact(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.filter(Boolean);
}

/**
 * 安全地对数组进行排序
 * @param {Array} arr - 输入数组
 * @param {string} key - 排序键
 * @param {boolean} desc - 是否降序
 * @returns {Array} 排序后的新数组
 */
export function sortBy(arr, key, desc = false) {
  if (!Array.isArray(arr)) return [];

  return [...arr].sort((a, b) => {
    const valueA = a?.[key];
    const valueB = b?.[key];

    if (valueA === undefined && valueB === undefined) return 0;
    if (valueA === undefined) return desc ? 1 : -1;
    if (valueB === undefined) return desc ? -1 : 1;

    const result = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    return desc ? -result : result;
  });
}

/**
 * 查找数组中第一个满足条件的元素的索引
 * @param {Array} arr - 输入数组
 * @param {Function} predicate - 判断函数
 * @returns {number} 元素索引，未找到返回-1
 */
export function findIndex(arr, predicate) {
  if (!Array.isArray(arr) || typeof predicate !== "function") return -1;

  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) return i;
  }
  return -1;
}

/**
 * 数组差集，返回存在于第一个数组但不存在于第二个数组的元素
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @returns {Array} 差集数组
 */
export function difference(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
  return arr1.filter((item) => !arr2.includes(item));
}

/**
 * 将数组按指定键值分组
 * @param {Array} arr - 输入数组
 * @param {string} key - 分组键
 * @returns {Object} 分组结果
 */
export function groupBy(arr, key) {
  if (!Array.isArray(arr)) return {};

  return arr.reduce((groups, item) => {
    const value = item?.[key];
    if (value === undefined) return groups;

    if (!groups[value]) {
      groups[value] = [];
    }
    groups[value].push(item);
    return groups;
  }, {});
}

/**
 * 从数组中随机获取指定数量的元素
 * @param {Array} arr - 输入数组
 * @param {number} count - 元素数量，默认为1
 * @returns {Array} 随机元素数组
 */
export function sample(arr, count = 1) {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  if (count < 1) return [];

  const result = [];
  const len = arr.length;
  const taken = new Set();

  while (result.length < count && taken.size < len) {
    const index = Math.floor(Math.random() * len);
    if (!taken.has(index)) {
      taken.add(index);
      result.push(arr[index]);
    }
  }

  return result;
}

/**
 * 移动数组元素
 * @param {Array} arr - 输入数组
 * @param {number} from - 起始位置
 * @param {number} to - 目标位置
 * @returns {Array} 新数组
 */
export function move(arr, from, to) {
  if (!Array.isArray(arr)) return [];
  if (from < 0 || from >= arr.length || to < 0 || to >= arr.length)
    return arr.slice();

  const result = arr.slice();
  const [element] = result.splice(from, 1);
  result.splice(to, 0, element);
  return result;
}

/**
 * 计算数组中指定键的值的总和
 * @param {Array} arr - 输入数组
 * @param {string} key - 键名
 * @returns {number} 总和
 */
export function sumBy(arr, key) {
  if (!Array.isArray(arr)) return 0;

  return arr.reduce((sum, item) => {
    const value = item?.[key];
    return sum + (typeof value === "number" ? value : 0);
  }, 0);
}
