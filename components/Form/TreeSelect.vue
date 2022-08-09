<template>
    <div class="tree-search">
        <el-select v-model="selectedValue" ref="selectInput" v-bind='$attrs.selectInput' :filter-method="filterMethod"
            @visible-change="VisibleChange" popper-class="tree-popper">
            <template #empty>
                <el-scrollbar class="tree-scrollbar">
                    <div class="custom-tree">
                        <el-input v-model="filterText" v-bind='$attrs.filterInput' class="filterInput"
                            v-show="($attrs.filterInput as any).show" />
                        <el-tree ref="treeRef" :filter-node-method="filterNode" :highlight-current="true"
                            @node-click="nodeClick" v-bind='$attrs.tree' class="tree"
                            :props="{ ...defaultProps, ...($attrs.tree as any)?.props }" />
                    </div>
                </el-scrollbar>
            </template>
        </el-select>
    </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, watch } from 'vue'
import { ElTree } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'

interface Tree {
    id: string
    label: string
    isPenultimate?: boolean
    children?: Tree[]
}

const props = defineProps({
    modelValue: String
});

const emit = defineEmits(["update:modelValue"])

const selectedValue = ref('')
const filterText = ref('')
const treeRef = ref()
const selectInput = ref()

defineExpose({
    treeRef
})

// 下拉框打开/关闭的时候清空内部输入框的值，恢复所有下拉数据
const VisibleChange = (val: boolean) => {
    filterText.value = ''
    treeRef.value!.filter('')
}

const treeData = (getCurrentInstance() as any).attrs?.tree?.data

watch(filterText, (val: string) => {
    treeRef.value!.filter(val)
})

const customNodeClass: any = (data: Tree, node: Node) => {
    if (node.isLeaf) {
        return 'is-leaf'
    }
    return null
}

const defaultProps = {
    class: customNodeClass,
    label: "label",
    children: "children",
}

const filterNode: any = (value: string, data: any, node: any) => {
    if (!value) return true
    // console.log(data[node.store.props.label].includes(value))
    return data[node.store.props.label].includes(value)
}

const filterMethod = (value: string) => {
    treeRef.value!.filter(value)
}

const nodeClick = (node: any, option: any, event: any) => {
    if (option.isLeaf) {
        // 把值放进输入框，关闭下拉
        selectInput.value.blur()
        emit("update:modelValue", node.id);
        selectedValue.value = node[event.props.props.label]
    }
}

</script>

<style lang="scss" scoped>
.tree-search {
    width: 100%;
}

.custom-tree {
    padding: 10px;
    display: inline-block;
    min-width: 100%;
    box-sizing: border-box;

    .el-tree {
        color: #333333;
        margin-top: 8px;
    }
}
</style>

<style lang="scss">
.tree-popper {
    .el-scrollbar__wrap {
        max-width: calc(100vw - 210px - 20px);
        max-height: 50vh;
    }
}

.custom-tree {

    .el-tree>.el-tree-node>.el-tree-node__content {
        padding-left: 8px !important;
    }

    .el-tree-node__content {
        height: 32px;
    }

    .el-tree-node__label {
        margin-left: 8px;
    }

    .el-tree-node__expand-icon {
        padding: 0;
    }

    .el-input__wrapper,
    .el-input__inner {
        cursor: pointer;
    }

    .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
        background-color: #d9edff;
    }

    .filterInput {

        .el-input__wrapper,
        .el-input__inner {
            border-radius: 0;
        }
    }

    .is-leaf .el-tree-node__content {
        i {
            width: 0;
        }

        .el-tree-node__label {
            margin-left: 20px;
        }
    }
}
</style>