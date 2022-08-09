# TreeSelect

<!-- <ButtonTest /> -->
:::demo 

```vue
<template>
    <FitsTreeSelect :tree="defaultValue.tree"  :filterInput="defaultValue.filterInput" :selectInput="defaultValue.selectInput" />
</template>
<script setup>
import { ref } from 'vue';

const defaultValue = ref({
                selectInput: {
                    class: "mySelect",
                    placeholder: "请选择组织机构",
                },
                filterInput: {
                    class: "myInput",
                    placeholder: "部门搜索",
                    show: true
                },
                tree: {
                    class: "myTree",
                    nodeKey: "id",
                    defaultExpandAll: false,
                    data: [
                        {
                            id: "1",
                            label: '研发部',
                        },
                    ],
                }
            })
</script>
<style lang="scss">
.mySelect{
    width: 500px
}

</style>
```

:::

