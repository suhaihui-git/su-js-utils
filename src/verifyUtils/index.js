/**
 * 验证工具函数集合
 */

/**
 * 检查值是否为空
 * @param {*} value - 要检查的值
 * @returns {boolean} 是否为空
 */
export function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

/**
 * 验证字符串
 */
const stringValidators = {
  /**
   * 验证是否为有效字符串
   * @param {*} value - 要验证的值
   * @returns {boolean} 是否为有效字符串
   */
  isString(value) {
    return typeof value === "string";
  },

  /**
   * 验证字符串长度是否在指定范围内
   * @param {string} str - 要验证的字符串
   * @param {number} min - 最小长度
   * @param {number} max - 最大长度
   * @returns {boolean} 是否在范围内
   */
  isLength(str, min, max) {
    if (!this.isString(str)) return false;
    const len = str.length;
    return len >= min && (max === undefined || len <= max);
  },

  /**
   * 验证是否为有效邮箱
   * @param {string} email - 要验证的邮箱
   * @returns {boolean} 是否为有效邮箱
   */
  isEmail(email) {
    if (!this.isString(email)) return false;
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  },

  /**
   * 验证是否为有效手机号（中国大陆）
   * @param {string} phone - 要验证的手机号
   * @returns {boolean} 是否为有效手机号
   */
  isPhone(phone) {
    if (!this.isString(phone)) return false;
    const pattern = /^1[3-9]\d{9}$/;
    return pattern.test(phone);
  },

  /**
   * 验证是否为有效URL
   * @param {string} url - 要验证的URL
   * @returns {boolean} 是否为有效URL
   */
  isUrl(url) {
    if (!this.isString(url)) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * 验证是否为有效身份证号（中国大陆）
   * @param {string} idCard - 要验证的身份证号
   * @returns {boolean} 是否为有效身份证号
   */
  isIdCard(idCard) {
    if (!this.isString(idCard)) return false;
    const pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return pattern.test(idCard);
  },

  /**
   * 验证是否为有效邮政编码（中国大陆）
   * @param {string} zipCode - 要验证的邮政编码
   * @returns {boolean} 是否为有效邮政编码
   */
  isZipCode(zipCode) {
    if (!this.isString(zipCode)) return false;
    const pattern = /^\d{6}$/;
    return pattern.test(zipCode);
  },

  /**
   * 验证是否只包含字母
   * @param {string} str - 要验证的字符串
   * @returns {boolean} 是否只包含字母
   */
  isAlpha(str) {
    if (!this.isString(str)) return false;
    return /^[a-zA-Z]+$/.test(str);
  },

  /**
   * 验证是否只包含字母和数字
   * @param {string} str - 要验证的字符串
   * @returns {boolean} 是否只包含字母和数字
   */
  isAlphanumeric(str) {
    if (!this.isString(str)) return false;
    return /^[a-zA-Z0-9]+$/.test(str);
  },

  /**
   * 验证密码强度
   * @param {string} password - 要验证的密码
   * @param {object} options - 验证选项
   * @param {number} options.minLength - 最小长度，默认为 8
   * @param {boolean} options.requireNumber - 是否要求包含数字，默认为 true
   * @param {boolean} options.requireLetter - 是否要求包含字母，默认为 true
   * @param {boolean} options.requireLowerCase - 是否要求包含小写字母，默认为 true
   * @param {boolean} options.requireUpperCase - 是否要求包含大写字母，默认为 true
   * @param {boolean} options.requireSpecialChar - 是否要求包含特殊字符，默认为 true
   * @returns {object} 验证结果，包含是否通过和详细信息
   */
  validatePassword(password, options = {}) {
    if (!this.isString(password)) {
      return {
        isValid: false,
        message: "密码必须是字符串",
        details: {},
      };
    }

    const {
      minLength = 8,
      requireNumber = true,
      requireLetter = true,
      requireLowerCase = true,
      requireUpperCase = true,
      requireSpecialChar = true,
    } = options;

    const details = {
      length: password.length >= minLength,
      hasNumber: /\d/.test(password),
      hasLetter: /[a-zA-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const requirements = [];
    let isValid = details.length;

    if (!details.length) {
      requirements.push(`密码长度至少为 ${minLength} 个字符`);
    }

    if (requireNumber && !details.hasNumber) {
      isValid = false;
      requirements.push("必须包含数字");
    }

    if (requireLetter && !details.hasLetter) {
      isValid = false;
      requirements.push("必须包含字母");
    }

    if (requireLowerCase && !details.hasLowerCase) {
      isValid = false;
      requirements.push("必须包含小写字母");
    }

    if (requireUpperCase && !details.hasUpperCase) {
      isValid = false;
      requirements.push("必须包含大写字母");
    }

    if (requireSpecialChar && !details.hasSpecialChar) {
      isValid = false;
      requirements.push("必须包含特殊字符");
    }

    return {
      isValid,
      message: isValid
        ? "密码符合要求"
        : `密码不符合以下要求：${requirements.join("、")}`,
      details,
      requirements,
    };
  },

  /**
   * 获取密码强度等级
   * @param {string} password - 要检查的密码
   * @returns {object} 强度等级信息
   */
  getPasswordStrength(password) {
    if (!this.isString(password)) {
      return {
        score: 0,
        level: "invalid",
        message: "无效的密码",
      };
    }

    let score = 0;
    const details = {
      length: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    // 基础分数：长度
    score += Math.min(2, Math.floor(password.length / 4));

    // 加分项
    if (details.hasNumber) score++;
    if (details.hasLowerCase) score++;
    if (details.hasUpperCase) score++;
    if (details.hasSpecialChar) score += 2;

    // 额外加分：组合
    const varietyCount = Object.values(details).filter(Boolean).length;
    score += Math.max(0, varietyCount - 2);

    // 确定强度等级
    let level, message;
    if (score <= 2) {
      level = "weak";
      message = "弱密码";
    } else if (score <= 4) {
      level = "medium";
      message = "中等强度";
    } else if (score <= 6) {
      level = "strong";
      message = "强密码";
    } else {
      level = "very-strong";
      message = "非常强的密码";
    }

    return {
      score,
      level,
      message,
      details,
    };
  },
};

/**
 * 验证数字
 */
const numberValidators = {
  /**
   * 验证是否为数字
   * @param {*} value - 要验证的值
   * @returns {boolean} 是否为数字
   */
  isNumber(value) {
    return typeof value === "number" && !isNaN(value);
  },

  /**
   * 验证是否为整数
   * @param {number} value - 要验证的值
   * @returns {boolean} 是否为整数
   */
  isInteger(value) {
    return this.isNumber(value) && Number.isInteger(value);
  },

  /**
   * 验证是否为正数
   * @param {number} value - 要验证的值
   * @returns {boolean} 是否为正数
   */
  isPositive(value) {
    return this.isNumber(value) && value > 0;
  },

  /**
   * 验证是否为负数
   * @param {number} value - 要验证的值
   * @returns {boolean} 是否为负数
   */
  isNegative(value) {
    return this.isNumber(value) && value < 0;
  },

  /**
   * 验证数字是否在指定范围内
   * @param {number} value - 要验证的值
   * @param {number} min - 最小值
   * @param {number} max - 最大值
   * @returns {boolean} 是否在范围内
   */
  inRange(value, min, max) {
    return this.isNumber(value) && value >= min && value <= max;
  },

  /**
   * 验证是否为有效端口号
   * @param {number} port - 要验证的端口号
   * @returns {boolean} 是否为有效端口号
   */
  isPort(port) {
    return this.isInteger(port) && this.inRange(port, 0, 65535);
  },
};

/**
 * 验证对象
 */
const objectValidators = {
  /**
   * 验证是否为对象
   * @param {*} value - 要验证的值
   * @returns {boolean} 是否为对象
   */
  isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  },

  /**
   * 验证对象是否包含指定属性
   * @param {object} obj - 要验证的对象
   * @param {string|string[]} props - 属性名或属性名数组
   * @returns {boolean} 是否包含指定属性
   */
  hasProps(obj, props) {
    if (!this.isObject(obj)) return false;
    if (typeof props === "string") return obj.hasOwnProperty(props);
    if (Array.isArray(props)) {
      return props.every((prop) => obj.hasOwnProperty(prop));
    }
    return false;
  },

  /**
   * 验证对象是否为空对象
   * @param {object} obj - 要验证的对象
   * @returns {boolean} 是否为空对象
   */
  isEmpty(obj) {
    return this.isObject(obj) && Object.keys(obj).length === 0;
  },
};

/**
 * 验证数组
 */
const arrayValidators = {
  /**
   * 验证是否为数组
   * @param {*} value - 要验证的值
   * @returns {boolean} 是否为数组
   */
  isArray(value) {
    return Array.isArray(value);
  },

  /**
   * 验证数组长度是否在指定范围内
   * @param {Array} arr - 要验证的数组
   * @param {number} min - 最小长度
   * @param {number} max - 最大长度
   * @returns {boolean} 是否在范围内
   */
  isLength(arr, min, max) {
    if (!this.isArray(arr)) return false;
    const len = arr.length;
    return len >= min && (max === undefined || len <= max);
  },

  /**
   * 验证数组是否包含指定元素
   * @param {Array} arr - 要验证的数组
   * @param {*} value - 要查找的元素
   * @returns {boolean} 是否包含指定元素
   */
  includes(arr, value) {
    return this.isArray(arr) && arr.includes(value);
  },
};

/**
 * 日期验证
 */
const dateValidators = {
  /**
   * 验证是否为有效日期
   * @param {*} value - 要验证的值
   * @returns {boolean} 是否为有效日期
   */
  isDate(value) {
    return value instanceof Date && !isNaN(value);
  },

  /**
   * 验证日期是否在指定范围内
   * @param {Date} date - 要验证的日期
   * @param {Date} start - 开始日期
   * @param {Date} end - 结束日期
   * @returns {boolean} 是否在范围内
   */
  inRange(date, start, end) {
    if (!this.isDate(date) || !this.isDate(start) || !this.isDate(end)) {
      return false;
    }
    return date >= start && date <= end;
  },

  /**
   * 验证是否为未来日期
   * @param {Date} date - 要验证的日期
   * @returns {boolean} 是否为未来日期
   */
  isFuture(date) {
    return this.isDate(date) && date > new Date();
  },

  /**
   * 验证是否为过去日期
   * @param {Date} date - 要验证的日期
   * @returns {boolean} 是否为过去日期
   */
  isPast(date) {
    return this.isDate(date) && date < new Date();
  },
};

// 导出所有验证器
export const verify = {
  isEmpty,
  string: stringValidators,
  number: numberValidators,
  object: objectValidators,
  array: arrayValidators,
  date: dateValidators,
};

// 为了方便使用，也导出单独的验证器
export const { string, number, object, array, date } = verify;
