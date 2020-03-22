import { Field } from './field/field'
export class Form {
  fields: Array<Field> = []
  validate(){
    return Promise.all(this.fields.map(field => field.validate()))
  }
  validateField(fieldId: string){
    const field = this.getField(fieldId)
    return field ? field.validate() : Promise.resolve()
  }
  getField(id: string){
    return this.fields.find(f => f.id === id) 
  }
}