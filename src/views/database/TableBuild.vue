<script setup lang="ts">
import ShowOrEdit from '@/components/input/ShowOrEdit.vue'
import { zh2en } from '@/utils/translate'

const rowKey = (row: any) => {
  return row.key
}

const createData = () => [
  {
    key: 0,
    fieldname: 'John Brown',
    age: '32',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: 1,
    fieldname: 'Jim Green',
    age: '42',
    address: 'London No. 1 Lake Park',
  },
  {
    key: 2,
    fieldname: 'Joe Black',
    age: '32',
    address: 'Sidney No. 1 Lake Park',
  },
]

const testTrans = () => {
  const res = zh2en('测试')
  console.log(res)
}

const data: Array<any> = reactive([...createData()])

const strCol = ({ title, key, width }: { title: string; key: string; width?: number }) => {
  return {
    title,
    key,
    width: width || 150,
    render(row: any, index: number) {
      return h(ShowOrEdit, {
        value: row[key],
        onUpdateValue(v: any) {
          data[index][key] = v
        },
      })
    },
  }
}

const columns = [
  strCol({ title: '字段名', key: 'fieldname' }),
]
</script>

<template>
  <n-space>
    <n-button strong secondary type="primary" @click="testTrans">
      生成SQL
    </n-button>
    <n-button>Oops!</n-button>
    <n-button>Oops!</n-button>
    <n-button>Long! Long! Cross the line!</n-button>
  </n-space>
  <n-data-table
    :key="rowKey"
    style="margin-top: 10px;"
    :columns="columns"
    :data="data"
  />
</template>
