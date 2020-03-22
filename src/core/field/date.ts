import { Field, valueType } from './field'
import { dateMaxRule, dateMinRule } from './rule'
export default class DateTime extends Field {
  readonly type: string = 'datetime'
  constructor(group: string) {
    super(group)
    this.valueType = valueType.string
    this.required = true
  }
  getRules(){
    const rules = super.getRules()
    if(this.max !== undefined){
      rules.push(dateMaxRule(this.max))
    }
    if(this.min !== undefined){
      rules.push(dateMinRule(this.min))
    }
    return rules
  }
}