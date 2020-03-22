import Schema, { RuleItem, ErrorList } from 'async-validator'

// JSON type
export enum valueType {
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  array = 'array',
  object = 'object'
}

export interface FormField {
  id?: string
  label?: string
  placeholder?: string
  required?: boolean
  readonly?: boolean
  max?: number | string | null
  min?: number | string | null
  columns?: Array<FormField>
  options?: Array<string>
  value?: any
}

function getDefault(type: valueType) {
  switch (type) {
    case valueType.string:
      return ''
    case valueType.number:
      return 0
    case valueType.boolean:
      return false
    case valueType.array:
      return []
    case valueType.boolean:
      return {}
  }
}
let fid = 0
let groups : { [prop: string]: Array<string>} = {}
export function isIdInGroup(id: string, group: string){
  return groups[group] && groups[group].find(item => item ===id)
}
export function pushIdToGroup(id:string, group:string){
  if(!isIdInGroup(id, group)){
    groups[group].push(id)
  }
}
export class Field {
  readonly group: string
  fid: number
  id: string = ''
  label: string = 'basic field'
  type: string = 'no type'
  placeholder: string = ''
  options?: Array<{ label: string, value: string }>
  required: boolean = false
  readonly: boolean = false
  max: number | string | null = null
  min: number | string | null = null
  valueType: valueType = valueType.string
  value: any
  errorMessage: string = ''
  get requiredMessage() {
    return `${this.label}为必填项`
  }
  constructor(group: string) {
    this.group = group
    groups[group] = groups[group] || []
    this.fid = fid++;
    this.updateId(`id${this.fid}`)
    this.value = getDefault(this.valueType)
  }
  updateId(id: string) {
    if (!isIdInGroup(id, this.group)) {
      this.id = id
      pushIdToGroup(id, this.group)
    }
  }
  getRules(): Array<RuleItem>{
    const rules = []
    if(this.required){
      rules.push({ required: true, message: this.requiredMessage })
    }
    return rules
  }
  validate() {
    const rules = this.getRules()
    const descriptor = { field: rules }
    const validator = new Schema(descriptor)
    return new Promise((resolve, reject) => {
      return validator.validate({ field: this.value }, {},
        (errList: ErrorList) => {
          if (errList.length) {
            this.errorMessage = errList[0].message
            reject(errList[0])
          } else {
            this.errorMessage = ''
            resolve()
          }
        })
    })
  }
  toJSON(): FormField {
    return {
      id: this.id,
      label: this.label,
      placeholder: this.placeholder,
      required: this.required,
      readonly: this.readonly,
      max: this.max,
      min: this.min,
      value: this.value
    }
  }
  update(formField: FormField) {
    Object.assign(this, formField)
  }
}