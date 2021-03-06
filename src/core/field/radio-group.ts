import { Field, valueType } from './field'
import { getDefaultOptions } from './util'
export default class RadioGroup extends Field {
  readonly type: string = 'radio-group'
  constructor(group: string) {
    super(group)
    this.valueType = valueType.string
    this.required = true
    // 初始化选项
    this.options = getDefaultOptions()
    const [{ label, value}] = this.options
    this.update({ label, value })
  }
}