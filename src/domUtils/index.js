/**
 * DOM 工具函数集合
 */

/**
 * 元素选择
 */
const selector = {
  /**
   * 获取单个元素
   * @param {string} selector - CSS选择器
   * @param {Element} [context=document] - 上下文元素
   * @returns {Element|null} 元素
   */
  get(selector, context = document) {
    return context.querySelector(selector);
  },

  /**
   * 获取多个元素
   * @param {string} selector - CSS选择器
   * @param {Element} [context=document] - 上下文元素
   * @returns {Element[]} 元素数组
   */
  getAll(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
  },

  /**
   * 获取最近的匹配的祖先元素
   * @param {Element} element - 起始元素
   * @param {string} selector - CSS选择器
   * @returns {Element|null} 匹配的祖先元素
   */
  closest(element, selector) {
    return element.closest(selector);
  },

  /**
   * 判断元素是否匹配选择器
   * @param {Element} element - 元素
   * @param {string} selector - CSS选择器
   * @returns {boolean} 是否匹配
   */
  matches(element, selector) {
    return element.matches(selector);
  },
};

/**
 * 类名操作
 */
const className = {
  /**
   * 添加类名
   * @param {Element} element - 元素
   * @param {...string} classNames - 类名列表
   */
  add(element, ...classNames) {
    element.classList.add(...classNames);
  },

  /**
   * 移除类名
   * @param {Element} element - 元素
   * @param {...string} classNames - 类名列表
   */
  remove(element, ...classNames) {
    element.classList.remove(...classNames);
  },

  /**
   * 切换类名
   * @param {Element} element - 元素
   * @param {string} className - 类名
   * @param {boolean} [force] - 强制添加或移除
   */
  toggle(element, className, force) {
    element.classList.toggle(className, force);
  },

  /**
   * 判断是否包含类名
   * @param {Element} element - 元素
   * @param {string} className - 类名
   * @returns {boolean} 是否包含
   */
  has(element, className) {
    return element.classList.contains(className);
  },
};

/**
 * 样式操作
 */
const style = {
  /**
   * 设置样式
   * @param {Element} element - 元素
   * @param {string|Object} prop - 属性名或样式对象
   * @param {string} [value] - 属性值
   */
  set(element, prop, value) {
    if (typeof prop === "object") {
      Object.assign(element.style, prop);
    } else {
      element.style[prop] = value;
    }
  },

  /**
   * 获取样式
   * @param {Element} element - 元素
   * @param {string} prop - 属性名
   * @returns {string} 属性值
   */
  get(element, prop) {
    return getComputedStyle(element)[prop];
  },

  /**
   * 显示元素
   * @param {Element} element - 元素
   */
  show(element) {
    element.style.display = "";
  },

  /**
   * 隐藏元素
   * @param {Element} element - 元素
   */
  hide(element) {
    element.style.display = "none";
  },

  /**
   * 切换显示状态
   * @param {Element} element - 元素
   * @param {boolean} [force] - 强制显示或隐藏
   */
  toggle(element, force) {
    const isHidden = element.style.display === "none";
    if (force !== undefined) {
      element.style.display = force ? "" : "none";
    } else {
      element.style.display = isHidden ? "" : "none";
    }
  },
};

/**
 * 属性操作
 */
const attr = {
  /**
   * 设置属性
   * @param {Element} element - 元素
   * @param {string|Object} name - 属性名或属性对象
   * @param {string} [value] - 属性值
   */
  set(element, name, value) {
    if (typeof name === "object") {
      Object.entries(name).forEach(([key, val]) => {
        element.setAttribute(key, val);
      });
    } else {
      element.setAttribute(name, value);
    }
  },

  /**
   * 获取属性
   * @param {Element} element - 元素
   * @param {string} name - 属性名
   * @returns {string|null} 属性值
   */
  get(element, name) {
    return element.getAttribute(name);
  },

  /**
   * 移除属性
   * @param {Element} element - 元素
   * @param {...string} names - 属性名列表
   */
  remove(element, ...names) {
    names.forEach((name) => element.removeAttribute(name));
  },

  /**
   * 判断是否有属性
   * @param {Element} element - 元素
   * @param {string} name - 属性名
   * @returns {boolean} 是否有属性
   */
  has(element, name) {
    return element.hasAttribute(name);
  },
};

/**
 * 事件操作
 */
const event = {
  /**
   * 添加事件监听
   * @param {Element} element - 元素
   * @param {string} type - 事件类型
   * @param {Function} handler - 事件处理函数
   * @param {Object|boolean} [options] - 选项或是否捕获
   */
  on(element, type, handler, options) {
    element.addEventListener(type, handler, options);
  },

  /**
   * 移除事件监听
   * @param {Element} element - 元素
   * @param {string} type - 事件类型
   * @param {Function} handler - 事件处理函数
   * @param {Object|boolean} [options] - 选项或是否捕获
   */
  off(element, type, handler, options) {
    element.removeEventListener(type, handler, options);
  },

  /**
   * 触发事件
   * @param {Element} element - 元素
   * @param {string} type - 事件类型
   * @param {Object} [detail] - 自定义数据
   */
  trigger(element, type, detail) {
    const event = new CustomEvent(type, { detail, bubbles: true });
    element.dispatchEvent(event);
  },

  /**
   * 一次性事件监听
   * @param {Element} element - 元素
   * @param {string} type - 事件类型
   * @param {Function} handler - 事件处理函数
   * @param {Object|boolean} [options] - 选项或是否捕获
   */
  once(element, type, handler, options) {
    const wrapper = (...args) => {
      handler(...args);
      element.removeEventListener(type, wrapper, options);
    };
    element.addEventListener(type, wrapper, options);
  },
};

/**
 * 元素操作
 */
const element = {
  /**
   * 创建元素
   * @param {string} tag - 标签名
   * @param {Object} [props] - 属性对象
   * @param {...(string|Element)} children - 子元素
   * @returns {Element} 新元素
   */
  create(tag, props = {}, ...children) {
    const element = document.createElement(tag);
    Object.entries(props).forEach(([key, value]) => {
      if (key === "style" && typeof value === "object") {
        Object.assign(element.style, value);
      } else if (key.startsWith("on") && typeof value === "function") {
        element.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        element.setAttribute(key, value);
      }
    });
    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
    return element;
  },

  /**
   * 插入元素
   * @param {Element} element - 要插入的元素
   * @param {Element} target - 目标元素
   * @param {string} [position="beforeend"] - 插入位置
   */
  insert(element, target, position = "beforeend") {
    target.insertAdjacentElement(position, element);
  },

  /**
   * 移除元素
   * @param {Element} element - 要移除的元素
   */
  remove(element) {
    element.remove();
  },

  /**
   * 替换元素
   * @param {Element} oldElement - 旧元素
   * @param {Element} newElement - 新元素
   */
  replace(oldElement, newElement) {
    oldElement.replaceWith(newElement);
  },

  /**
   * 克隆元素
   * @param {Element} element - 要克隆的元素
   * @param {boolean} [deep=true] - 是否深克隆
   * @returns {Element} 克隆的元素
   */
  clone(element, deep = true) {
    return element.cloneNode(deep);
  },
};

/**
 * 表单操作
 */
const form = {
  /**
   * 获取表单数据
   * @param {HTMLFormElement} form - 表单元素
   * @returns {Object} 表单数据对象
   */
  getData(form) {
    return Object.fromEntries(new FormData(form));
  },

  /**
   * 设置表单数据
   * @param {HTMLFormElement} form - 表单元素
   * @param {Object} data - 数据对象
   */
  setData(form, data) {
    Object.entries(data).forEach(([name, value]) => {
      const element = form.elements[name];
      if (element) {
        if (element instanceof RadioNodeList) {
          const radio = Array.from(element).find((el) => el.value === value);
          if (radio) radio.checked = true;
        } else if (element.type === "checkbox") {
          element.checked = value;
        } else {
          element.value = value;
        }
      }
    });
  },

  /**
   * 重置表单
   * @param {HTMLFormElement} form - 表单元素
   */
  reset(form) {
    form.reset();
  },

  /**
   * 提交表单
   * @param {HTMLFormElement} form - 表单元素
   */
  submit(form) {
    form.submit();
  },
};

/**
 * 动画操作
 */
const animation = {
  /**
   * 淡入效果
   * @param {Element} element - 元素
   * @param {number} [duration=300] - 持续时间（毫秒）
   * @param {string} [display="block"] - 显示方式
   * @returns {Promise} 动画完成的Promise
   */
  fadeIn(element, duration = 300, display = "block") {
    return new Promise((resolve) => {
      element.style.opacity = 0;
      element.style.display = display;

      const start = performance.now();
      const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        element.style.opacity = progress;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  },

  /**
   * 淡出效果
   * @param {Element} element - 元素
   * @param {number} [duration=300] - 持续时间（毫秒）
   * @returns {Promise} 动画完成的Promise
   */
  fadeOut(element, duration = 300) {
    return new Promise((resolve) => {
      const start = performance.now();
      const initialOpacity = parseFloat(getComputedStyle(element).opacity);

      const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        element.style.opacity = initialOpacity * (1 - progress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.style.display = "none";
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  },

  /**
   * 滑动展开效果
   * @param {Element} element - 元素
   * @param {number} [duration=300] - 持续时间（毫秒）
   * @returns {Promise} 动画完成的Promise
   */
  slideDown(element, duration = 300) {
    return new Promise((resolve) => {
      element.style.display = "block";
      const height = element.scrollHeight;
      element.style.height = "0";
      element.style.overflow = "hidden";
      element.style.transition = `height ${duration}ms ease`;

      // 触发重排以使过渡生效
      element.offsetHeight;

      element.style.height = `${height}px`;

      setTimeout(() => {
        element.style.height = "";
        element.style.overflow = "";
        element.style.transition = "";
        resolve();
      }, duration);
    });
  },

  /**
   * 滑动收起效果
   * @param {Element} element - 元素
   * @param {number} [duration=300] - 持续时间（毫秒）
   * @returns {Promise} 动画完成的Promise
   */
  slideUp(element, duration = 300) {
    return new Promise((resolve) => {
      const height = element.scrollHeight;
      element.style.height = `${height}px`;
      element.style.overflow = "hidden";
      element.style.transition = `height ${duration}ms ease`;

      // 触发重排以使过渡生效
      element.offsetHeight;

      element.style.height = "0";

      setTimeout(() => {
        element.style.display = "none";
        element.style.height = "";
        element.style.overflow = "";
        element.style.transition = "";
        resolve();
      }, duration);
    });
  },

  /**
   * CSS动画
   * @param {Element} element - 元素
   * @param {string|Object} keyframes - 关键帧或关键帧名称
   * @param {number|Object} options - 动画选项
   * @returns {Animation} 动画对象
   */
  animate(element, keyframes, options) {
    return element.animate(keyframes, options);
  },

  /**
   * 平滑滚动
   * @param {Element} element - 元素
   * @param {Object} options - 滚动选项
   * @param {number} [options.top] - 目标顶部位置
   * @param {number} [options.left] - 目标左侧位置
   * @param {string} [options.behavior="smooth"] - 滚动行为
   */
  scroll(element, { top, left, behavior = "smooth" } = {}) {
    element.scrollTo({ top, left, behavior });
  },

  /**
   * 平滑滚动到元素
   * @param {Element} element - 目标元素
   * @param {Object} [options] - 滚动选项
   */
  scrollIntoView(element, options = { behavior: "smooth" }) {
    element.scrollIntoView(options);
  },
};

// 导出所有DOM工具
export const domUtils = {
  selector,
  className,
  style,
  attr,
  event,
  element,
  form,
  animation,
};

// 为了方便使用，也导出单独的工具
export const {
  selector: $,
  className: cls,
  style: css,
  attr: attrs,
  event: evt,
  element: el,
  form: formUtils,
  animation: anim,
} = domUtils;
