declare module "su-js-utils" {
  // 字符串工具类型
  export namespace stringUtils {
    function capitalize(str: string): string;
    function camelToKebab(str: string): string;
    function kebabToCamel(str: string): string;
    function truncate(str: string, maxLength: number, suffix?: string): string;
    function trim(str: string, chars?: string): string;
    function repeat(str: string, count: number): string;
    function escape(str: string): string;
    function reverse(str: string): string;
    function pad(
      str: string,
      length: number,
      char?: string,
      left?: boolean
    ): string;
    function startsWith(str: string, searchStr: string): boolean;
    function endsWith(str: string, searchStr: string): boolean;
    function toSnakeCase(str: string): string;
    function wordCount(str: string): number;
  }

  // 数组工具类型
  export namespace arrayUtils {
    function get<T>(arr: T[], index: number, defaultValue?: T): T | undefined;
    function unique<T>(arr: T[]): T[];
    function chunk<T>(arr: T[], size?: number): T[][];
    function flatten<T>(arr: T[], depth?: number): T[];
    function intersection<T>(arr1: T[], arr2: T[]): T[];
    function compact<T>(arr: T[]): NonNullable<T>[];
    function sortBy<T>(arr: T[], key: keyof T): T[];
    function findIndex<T>(
      arr: T[],
      predicate: (value: T, index: number, array: T[]) => boolean
    ): number;
    function difference<T>(arr1: T[], arr2: T[]): T[];
    function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]>;
    function sample<T>(arr: T[], n?: number): T[];
    function move<T>(arr: T[], from: number, to: number): T[];
    function sumBy<T>(arr: T[], key: keyof T): number;
  }

  // 日期工具类型
  export namespace dateUtils {
    type DateInput = Date | string | number;
    type TimeUnit =
      | "year"
      | "month"
      | "week"
      | "day"
      | "hour"
      | "minute"
      | "second";

    function format(date: DateInput, format?: string): string;
    function toDate(date: DateInput): Date;
    function isValidDate(date: Date): boolean;
    function relativeTime(date: DateInput, baseDate?: DateInput): string;
    function startOf(date: DateInput, unit?: TimeUnit): Date;
    function endOf(date: DateInput, unit?: TimeUnit): Date;
    function add(date: DateInput, amount: number, unit?: TimeUnit): Date;
    function subtract(date: DateInput, amount: number, unit?: TimeUnit): Date;
    function diff(date1: DateInput, date2: DateInput, unit?: TimeUnit): number;
    function getDayOfYear(date: DateInput): number;
    function getWeekOfYear(date: DateInput): number;
    function isLeapYear(date: DateInput): boolean;
    function getDaysInMonth(date: DateInput): number;
    function getDaysInYear(date: DateInput): number;
    function isWeekend(date: DateInput): boolean;
    function isToday(date: DateInput): boolean;
    function isAfter(date: DateInput, compareDate: DateInput): boolean;
    function isBefore(date: DateInput, compareDate: DateInput): boolean;
    function isBetween(
      date: DateInput,
      startDate: DateInput,
      endDate: DateInput
    ): boolean;
    function getDatesBetween(startDate: DateInput, endDate: DateInput): Date[];
    function getFirstDayOfMonth(date: DateInput): Date;
    function getLastDayOfMonth(date: DateInput): Date;
    function getFirstDayOfQuarter(date: DateInput): Date;
    function getLastDayOfQuarter(date: DateInput): Date;
    function getQuarter(date: DateInput): number;
  }

  // DOM 工具类型
  export namespace domUtils {
    interface SelectorUtils {
      get<T extends Element = Element>(
        selector: string,
        context?: Element | Document
      ): T | null;
      getAll<T extends Element = Element>(
        selector: string,
        context?: Element | Document
      ): T[];
      closest<T extends Element = Element>(
        element: Element,
        selector: string
      ): T | null;
      matches(element: Element, selector: string): boolean;
    }

    interface ClassNameUtils {
      add(element: Element, ...classNames: string[]): void;
      remove(element: Element, ...classNames: string[]): void;
      toggle(element: Element, className: string, force?: boolean): void;
      has(element: Element, className: string): boolean;
    }

    interface StyleUtils {
      set(
        element: Element,
        prop: string | Record<string, string | number>,
        value?: string | number
      ): void;
      get(element: Element, prop: string): string;
      show(element: Element): void;
      hide(element: Element): void;
      toggle(element: Element, force?: boolean): void;
    }

    interface AttrUtils {
      set(
        element: Element,
        name: string | Record<string, string>,
        value?: string
      ): void;
      get(element: Element, name: string): string | null;
      remove(element: Element, ...names: string[]): void;
      has(element: Element, name: string): boolean;
    }

    interface EventUtils {
      on<K extends keyof HTMLElementEventMap>(
        element: Element,
        type: K,
        handler: (this: Element, ev: HTMLElementEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions
      ): void;
      off<K extends keyof HTMLElementEventMap>(
        element: Element,
        type: K,
        handler: (this: Element, ev: HTMLElementEventMap[K]) => any,
        options?: boolean | EventListenerOptions
      ): void;
      trigger(element: Element, type: string, detail?: any): void;
      once<K extends keyof HTMLElementEventMap>(
        element: Element,
        type: K,
        handler: (this: Element, ev: HTMLElementEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions
      ): void;
    }

    interface ElementUtils {
      create<K extends keyof HTMLElementTagNameMap>(
        tag: K,
        props?: Record<string, any>,
        ...children: (string | Element)[]
      ): HTMLElementTagNameMap[K];
      insert(
        element: Element,
        target: Element,
        position?: InsertPosition
      ): void;
      remove(element: Element): void;
      replace(oldElement: Element, newElement: Element): void;
      clone(element: Element, deep?: boolean): Element;
    }

    interface FormUtils {
      getData(form: HTMLFormElement): Record<string, string>;
      setData(form: HTMLFormElement, data: Record<string, any>): void;
      reset(form: HTMLFormElement): void;
      submit(form: HTMLFormElement): void;
    }

    interface AnimationUtils {
      fadeIn(
        element: Element,
        duration?: number,
        display?: string
      ): Promise<void>;
      fadeOut(element: Element, duration?: number): Promise<void>;
      slideDown(element: Element, duration?: number): Promise<void>;
      slideUp(element: Element, duration?: number): Promise<void>;
      animate(
        element: Element,
        keyframes: Keyframe[] | PropertyIndexedKeyframes | string,
        options?: number | KeyframeAnimationOptions
      ): Animation;
      scroll(element: Element, options?: ScrollToOptions): void;
      scrollIntoView(element: Element, options?: ScrollIntoViewOptions): void;
    }

    export const selector: SelectorUtils;
    export const className: ClassNameUtils;
    export const style: StyleUtils;
    export const attr: AttrUtils;
    export const event: EventUtils;
    export const element: ElementUtils;
    export const form: FormUtils;
    export const animation: AnimationUtils;
  }

  // 验证工具类型
  export namespace verifyUtils {
    interface PasswordValidateOptions {
      minLength?: number;
      requireNumber?: boolean;
      requireLetter?: boolean;
      requireLowerCase?: boolean;
      requireUpperCase?: boolean;
      requireSpecialChar?: boolean;
    }

    interface PasswordValidateResult {
      isValid: boolean;
      message: string;
      details: {
        length: boolean;
        hasNumber: boolean;
        hasLetter: boolean;
        hasLowerCase: boolean;
        hasUpperCase: boolean;
        hasSpecialChar: boolean;
      };
      requirements?: string[];
    }

    interface PasswordStrengthResult {
      score: number;
      level: "invalid" | "weak" | "medium" | "strong" | "very-strong";
      message: string;
      details: {
        length: boolean;
        hasNumber: boolean;
        hasLowerCase: boolean;
        hasUpperCase: boolean;
        hasSpecialChar: boolean;
      };
    }

    interface StringValidators {
      isString(value: any): boolean;
      isLength(str: string, min: number, max?: number): boolean;
      isEmail(email: string): boolean;
      isPhone(phone: string): boolean;
      isUrl(url: string): boolean;
      isIdCard(idCard: string): boolean;
      isZipCode(zipCode: string): boolean;
      isAlpha(str: string): boolean;
      isAlphanumeric(str: string): boolean;
      validatePassword(
        password: string,
        options?: PasswordValidateOptions
      ): PasswordValidateResult;
      getPasswordStrength(password: string): PasswordStrengthResult;
    }

    interface NumberValidators {
      isNumber(value: any): boolean;
      isInteger(value: any): boolean;
      isPositive(value: number): boolean;
      isNegative(value: number): boolean;
      inRange(value: number, min: number, max: number): boolean;
      isPort(port: number): boolean;
    }

    interface ObjectValidators {
      isObject(value: any): boolean;
      hasProps(obj: object, props: string | string[]): boolean;
      isEmpty(obj: object): boolean;
    }

    interface ArrayValidators {
      isArray(value: any): boolean;
      isLength(arr: any[], min: number, max?: number): boolean;
      includes<T>(arr: T[], value: T): boolean;
    }

    interface DateValidators {
      isDate(value: any): boolean;
      inRange(date: Date, start: Date, end: Date): boolean;
      isFuture(date: Date): boolean;
      isPast(date: Date): boolean;
    }

    export const isEmpty: (value: any) => boolean;
    export const string: StringValidators;
    export const number: NumberValidators;
    export const object: ObjectValidators;
    export const array: ArrayValidators;
    export const date: DateValidators;
  }

  // 导出简写别名
  export const $: domUtils.SelectorUtils;
  export const cls: domUtils.ClassNameUtils;
  export const css: domUtils.StyleUtils;
  export const attrs: domUtils.AttrUtils;
  export const evt: domUtils.EventUtils;
  export const el: domUtils.ElementUtils;
  export const formUtils: domUtils.FormUtils;
  export const anim: domUtils.AnimationUtils;

  // 导出命名空间
  export const string: stringUtils;
  export const array: arrayUtils;
  export const date: dateUtils;
  export const dom: domUtils;
  export const verify: verifyUtils;
}
