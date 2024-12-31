# su-js-utils

一个轻量级的 JavaScript 工具函数库，提供字符串、数组、日期、DOM、验证等常用工具函数。

## 特点

- 🚀 轻量级，无依赖
- 📦 支持 ES Module 和 CommonJS
- 🔧 提供完整的 TypeScript 类型定义
- 💪 包含多种常用工具函数
- 🎯 模块化设计，按需引入

## 安装

### NPM

```bash
npm install su-js-utils
```

### YARN

```bash
yarn add su-js-utils
```

### PNPM

```bash
pnpm add su-js-utils
```

## 使用方法

### 方式 1: 默认导入

```javascript
import suJsUtils from "su-js-utils";

// 使用字符串工具
suJsUtils.stringUtils.capitalize("hello"); // => "Hello"

// 使用数组工具
suJsUtils.arrayUtils.unique([1, 1, 2]); // => [1, 2]
```

### 方式 2: 命名空间导入

```javascript
import { string, array, date, dom, verify } from "su-js-utils";

string.capitalize("hello");
array.unique([1, 1, 2]);
```

### 方式 3: 直接导入具体函数

```javascript
import { capitalize, unique, format } from "su-js-utils";

capitalize("hello"); // => "Hello"
unique([1, 1, 2]); // => [1, 2]
format(new Date()); // => "2024-03-15"
```

### TypeScript 支持

```typescript
import { string, array } from "su-js-utils";

// 完整的类型提示
const str: string = string.capitalize("hello");
const arr: number[] = array.unique<number>([1, 1, 2]);
```

## API 文档

### 1. 字符串工具 (stringUtils)

```javascript
import { stringUtils } from "su-js-utils";

// 首字母大写
stringUtils.capitalize("hello"); // => "Hello"

// 驼峰转短横线
stringUtils.camelToKebab("helloWorld"); // => "hello-world"

// 短横线转驼峰
stringUtils.kebabToCamel("hello-world"); // => "helloWorld"

// 截断字符串
stringUtils.truncate("Hello World", 8); // => "Hello..."

// 移除两端字符
stringUtils.trim("  hello  "); // => "hello"
```

### 2. 数组工具 (arrayUtils)

```javascript
import { arrayUtils } from "su-js-utils";

// 安全获取元素
arrayUtils.get([1, 2, 3], 1); // => 2

// 去重
arrayUtils.unique([1, 1, 2, 2, 3]); // => [1, 2, 3]

// 分组
arrayUtils.chunk([1, 2, 3, 4], 2); // => [[1, 2], [3, 4]]

// 扁平化
arrayUtils.flatten([1, [2, [3, 4]], 5]); // => [1, 2, [3, 4], 5]
```

### 3. 日期工具 (dateUtils)

```javascript
import { dateUtils } from "su-js-utils";

// 格式化日期
dateUtils.format(new Date(), "YYYY-MM-DD"); // => "2024-03-15"

// 相对时间
dateUtils.relativeTime("2024-03-14"); // => "1天前"

// 判断闰年
dateUtils.isLeapYear("2024"); // => true

// 获取月份天数
dateUtils.getDaysInMonth("2024-02"); // => 29

// 判断周末
dateUtils.isWeekend("2024-03-16"); // => true
```

### 4. DOM 工具 (domUtils)

```javascript
import { domUtils } from "su-js-utils";

// 选择器
const button = $.get("#myButton");
const items = $.getAll(".item");

// 类名操作
cls.add(button, "active");
cls.toggle(button, "disabled");

// 样式操作
css.set(button, { backgroundColor: "#fff" });
css.show(button);

// 事件操作
evt.on(button, "click", () => {});
evt.once(button, "click", () => {});

// 动画操作
await anim.fadeIn(element);
await anim.slideDown(element);
```

### 5. 验证工具 (verifyUtils)

```javascript
import { verifyUtils } from "su-js-utils";

// 字符串验证
verifyUtils.string.isEmail("test@example.com"); // => true
verifyUtils.string.isPhone("13812345678"); // => true

// 密码验证
verifyUtils.string.validatePassword("Password123!", {
  minLength: 8,
  requireNumber: true,
  requireSpecialChar: true,
});

// 数字验证
verifyUtils.number.isInteger(123); // => true
verifyUtils.number.inRange(5, 1, 10); // => true

// 日期验证
verifyUtils.date.isFuture(new Date()); // => false
verifyUtils.date.inRange(date, start, end);
```

## 按需引入

可以只引入需要的工具函数，减小打包体积：

```javascript
import { capitalize, unique, format } from "su-js-utils";
```

## 浏览器支持

- Chrome >= 49
- Firefox >= 45
- Safari >= 10
- Edge >= 14
- IE >= 11 (需要 polyfill)

## 开发

```bash
# 安装依赖
npm install

# 构建
npm run build

# 测试
npm test
```

## 贡献

欢迎提交 Issue 和 Pull Request。

## 仓库

GitHub: [https://github.com/suhaihui/su-js-utils](https://github.com/suhaihui/su-js-utils)

## 许可证

[MIT](LICENSE) © suhaihui

## 更新日志

### 1.0.22

- 优化 TypeScript 类型支持
- 修复模块导出问题
- 修复工具函数命名空间问题
- 完善文档和示例
- 添加 DOM 工具简写别名

### 1.0.10

- 新增 DOM 工具函数
- 新增动画相关功能
- 优化日期工具函数
- 完善类型定义

### 1.0.9

- 新增验证工具函数
- 优化字符串工具函数
- 修复已知问题

### 1.0.8

- 新增日期工具函数
- 优化数组工具函数
- 完善文档
