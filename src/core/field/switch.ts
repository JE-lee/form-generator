import { Field, valueType } from './field'
export default class Switch extends Field {
  readonly type: string = 'switch'
  constructor(group: string) {
    super(group)
    this.valueType = valueType.boolean
    this.required = true
  }
}