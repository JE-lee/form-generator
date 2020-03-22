import { Field, valueType } from './field'
import { getDefaultOptions } from './util'
export default class CheckboxGroup extends Field {
  readonly type: string = 'checkbox-group'
  constructor(group: string) {
    super(group)
    this.valueType = valueType.array
    this.required = true
    // 初始化选项
    this.options = getDefaultOptions()
    const [{ label, value}] = this.options
    this.update({ label, value: [value] })
  }
}