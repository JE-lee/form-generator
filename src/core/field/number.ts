import { Field, valueType } from './field'
import {numberMaxRule, numberMinRule} from './rule'
export default class NumberInput extends Field {
  readonly type: string = 'number'
  constructor(group: string) {
    super(group)
    this.valueType = valueType.number
    this.required = true
  }
  getRules(){
    const rules = super.getRules()
    if(this.max !== undefined){
      rules.push(numberMaxRule(this.max))
    }
    if(this.min !== undefined){
      rules.push(numberMinRule(this.min))
    }
    return rules
  }
}