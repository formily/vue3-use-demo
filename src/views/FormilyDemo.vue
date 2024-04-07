<template>
  <div>
    <el-button @click="verify">点击校验</el-button>
    <el-button @click="reset">重置</el-button>
    <el-button @click="getValue">获取值</el-button>
    <FormilyView
      ref="formilyViewRef"
      :configId="configId"
      @confirm="confirm"
      @validateFail="validateFail"
      @valuesChange="valuesChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import FormilyView from '../components/formily-comp/FormilyView.vue'

const route = useRoute()
const { bid: configId } = route.query
const formilyViewRef = ref()

const verify = () => {
  formilyViewRef.value?.submit()
}

const reset = () => {
  formilyViewRef.value?.reset()
}

const getValue = () => {
  console.log('getValue', formilyViewRef.value?.form.values)
}

const confirm = (formData) => {
  console.log('confirm', formData, formData.name)
}

const validateFail = (e) => {
  console.log('fail', e)
}

const valuesChange = (form) => {
  console.log('change', form)
}
</script>

<style scoped></style>
