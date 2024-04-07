<template>
  <FormProvider :form="form">
    <SchemaField :schema="bidConfig.schema"> </SchemaField>
    <!-- <Submit @submit="submit">submit</Submit> -->
    <!-- <el-button @click="submit" type="primary">提交</el-button> -->
    <!-- <Submit>提交</Submit> -->
  </FormProvider>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import {
  createForm,
  onFormValidateSuccess,
  onFormValidateFailed,
  onFormValuesChange
} from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import {
  FormLayout,
  FormItem,
  FormGrid,
  FormButtonGroup,
  Space,
  Submit,
  Reset,
  Input,
  Password,
  Select,
  DatePicker,
  TimePicker,
  InputNumber,
  Transfer,
  Cascader,
  Radio,
  Checkbox,
  Upload,
  Switch,
  ArrayCards,
  ArrayItems,
  ArrayTable,
  ArrayTabs,
  FormCollapse,
  FormStep,
  FormTab,
  FormDialog,
  FormDrawer,
  // Editable,
  PreviewText,
  Button
  // } from '@formily/element-plus'
} from '@niceone/formily-element-plus'
import apiServer from '@/api/axios'

const props = withDefaults(
  defineProps<{
    configId: string
  }>(),
  {
    configId: ''
  }
)

const { configId } = toRefs(props)
const { SchemaField } = createSchemaField({
  components: {
    // 布局组件
    FormLayout,
    FormItem,
    FormGrid,
    FormButtonGroup,
    Space,
    Submit,
    Reset,
    // 输入控件

    Input,
    Password,
    Select,
    DatePicker,
    TimePicker,
    NumberPicker: InputNumber,
    Transfer,
    Cascader,
    Radio,
    Checkbox,
    Upload,
    Switch,
    // 场景组件

    ArrayCards,
    ArrayItems,
    ArrayTable,
    ArrayTabs,
    FormCollapse,
    FormStep,
    FormTab,
    FormDialog,
    FormDrawer,
    // Editable,
    // 阅读态组件

    Text: PreviewText,
    Button
  }
})

const emit = defineEmits(['confirm', 'validateFail', 'valuesChange'])
const form = createForm({
  // https://core.formilyjs.org/api/entry/form-effect-hooks
  effects() {
    onFormValidateFailed((form) => {
      //   console.log('fail>>')
      emit('validateFail', form.errors)
    }),
      onFormValidateSuccess((form) => {
        // https://core.formilyjs.org/api/models/form
        // console.log('success>>', form.values.name)
        emit('confirm', form.values)
      }),
      onFormValuesChange((form) => {
        emit('valuesChange', form.values)
      })
  }
})
const bidConfig: any = ref({})

function submit() {
  form.submit()
}

function reset() {
  form.reset()
}

defineExpose({
  submit,
  reset,
  form
})
onBeforeMount(() => {
  getConfigFromBid()
})

// function submit() {
//   form.submit((values) => {
//     // 在这里处理表单提交逻辑，可以将 values 提交给后端或其他处理
//     console.log('Form submitted with values:', values)
//   })
// }

async function getConfigFromBid() {
  try {
    const res: any = await apiServer.get(`/configList/detail/${configId.value}`)
    console.log('res /configList/detail/', res)
    if (res.code === 0) {
      let config = res?.data?.config
      bidConfig.value = JSON.parse(config)
      console.log(bidConfig.value)
    } else {
      ElMessage.error(res?.data?.msg || '获取配置异常')
    }
  } catch (e) {
    console.log(e)
  } finally {
    // loading = false
  }
}
</script>

<style scoped></style>
