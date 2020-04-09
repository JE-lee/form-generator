import { Field, valueType } from './field'
import {textMaxRule, textMinRule} from './rule'
export default class Text extends Field {
  readonly type: string = 'text'
  constructor(group: string) {
    super(group)
    this.valueType = valueType.string
    this.required = true
    this.max = 64
  }
  getRules(){
    const rules = super.getRules()
    if(this.max !== undefined){
      rules.push(textMaxRule(this.max))
    }
    if(this.min !== undefined){
      rules.push(textMinRule(this.min))
    }
    return rules
  }
}