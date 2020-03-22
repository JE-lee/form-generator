import dayjs from 'dayjs'

export const textMaxRule = (max: any) => {
  return { max: +max, message: `不能超过${+max}个字符` }
}
export const textMinRule = (min: any) => {
  return { min: +min, message: `不能少于${+min}个字符` }
}
export const numberMaxRule = (max: any) => {
  return { max: +max, message: `不能大于${+max}` }
}
export const numberMinRule = (min: any) => {
  return { min: +min, message: `不能小于${+min}` }
}
export const dateMaxRule = (max: any) => {
  return {
    validator: (rule: any, value: any, cb: (mes: string | void) => void) => {
      if (dayjs(value) > dayjs(max)) {
        cb(`不能晚于${max}`);
      } else {
        cb();
      }
    }
  }
}

export const dateMinRule = (min: any) => {
  return {
    validator: (rule: any, value: any, cb: (mes: string | void) => void) => {
      if (dayjs(value) < dayjs(min)) {
        cb(`不能早于${min}`);
      } else {
        cb();
      }
    }
  }
}