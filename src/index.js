import * as stringUtils from "./stringUtils/index.js";
import * as arrayUtils from "./arrayUtils/index.js";
import * as dateUtils from "./dateUtils/index.js";
import * as domUtils from "./domUtils/index.js";
import * as verifyUtils from "./verifyUtils/index.js";

// 导出所有工具类
export { stringUtils, arrayUtils, dateUtils, domUtils, verifyUtils };

// 导出具体函数，方便直接使用
export * from "./stringUtils/index.js";
export * from "./arrayUtils/index.js";
export * from "./dateUtils/index.js";
export * from "./domUtils/index.js";
export * from "./verifyUtils/index.js";

// 默认导出
export default {
  string: stringUtils,
  array: arrayUtils,
  date: dateUtils,
  dom: domUtils,
  verify: verifyUtils,
};
