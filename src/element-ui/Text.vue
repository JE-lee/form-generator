<template>
  <form-item :label="field.label" :errorMessage="field.errorMessage">
    <el-input 
      :placeholder="field.palceholder" 
      v-model="field.value"
      @blur="validate"
    >
    </el-input>
  </form-item>
</template>

<script>
import { Input } from "element-ui";
import FormItem from "./FormItem.vue";
import Text from "../core/field/text";
export default {
  props: {
    group: {
      type: String,
      required: true
    }
  },
  data(){
    const text = new Text(this.group);
    return {
      field: text
    }
  },
  computed: {
    validate(){
      return this.field.validate.bind(this.field)
    }
  },
  components: {
    ElInput: Input,
    FormItem
  }
};
</script>

<style>
</style>