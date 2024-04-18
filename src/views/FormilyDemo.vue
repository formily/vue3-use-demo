<template>
  <div>
    <MyButton></MyButton>
    <el-button @click="verify">点击校验</el-button>
    <el-button @click="reset">重置</el-button>
    <el-button @click="getValue">获取值</el-button>
    <!-- <FormilyView></FormilyView> -->
    FormilyView
    <FormilyView
      ref="formilyViewRef"
      :configId="configId"
      @confirm="confirm"
      @validateFail="validateFail"
      @valuesChange="valuesChange"
    />
    1212
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
// import FormilyView from '../components/formily-comp/FormilyView.vue'
import { MyButton, FormilyView } from '@niceone/formily-comp'

const route = useRoute()
const { bid } = route.query
const configId: string = bid as string
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
