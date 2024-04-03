# vue3-use-demo

Vue3 + TS 中使用 formily 低代码 demo

## formily 相关依赖

参考：

1. [formily/vue](https://vue.formilyjs.org/)
2. [JSON schema 渲染方式](https://vue.formilyjs.org/api/components/schema-field-with-schema.html#%E6%8F%8F%E8%BF%B0)

```bash
npm install --save @formily/core @formily/vue @formily/element-plus
```

## 低代码使用场景

假设你需要开发一个表单，可以直接用低代码配置好，然后引入即可

引入方式

1. @niceone/formily-comp 引入该组件 FormilyComp，传入低代码配置 id，在回调函数取提交后的数据，然后自己写业务逻辑

2. 使用 iframe 引入 vue.formily.top/view/{bid} 页面，然后通过 postMessage 接收提交后的数据，然后写自己的业务逻辑

## 使用建议

1. 表单
2. 纯展示 UI
3. 问卷 ---
