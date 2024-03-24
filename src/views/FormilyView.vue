<template>
  <FormProvider :form="form">
    <SchemaField :schema="bidConfig.schema"> </SchemaField>
  </FormProvider>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
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
  PreviewText
} from '@formily/element-plus'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import { useRoute } from 'vue-router'
import apiServer from '@/api/axios'
import { ElMessage } from 'element-plus'

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

    PreviewText
  }
})

const route = useRoute()
const { bid, name } = route.query
const form = createForm()
const bidConfig: any = ref({})

onBeforeMount(() => {
  console.log(bid, name)
  getConfigFromBid()
})

async function getConfigFromBid() {
  try {
    const res: any = await apiServer.get(`/configList/detail/${bid}`)
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
