import * as stringUtils from "./stringUtils/index.js";
import * as arrayUtils from "./arrayUtils/index.js";
import * as dateUtils from "./dateUtils/index.js";
import * as domUtils from "./domUtils/index.js";
import * as verifyUtils from "./verifyUtils/index.js";
// 默认导出
export default {
  string: stringUtils,
  array: arrayUtils,
  date: dateUtils,
  dom: domUtils,
  verify: verifyUtils,
};
