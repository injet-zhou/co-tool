<template>
  <n-data-table
    :key="rowKey"
    :columns="columns"
    :data="data"
  />
</template>

<script setup lang="ts">
import ShowOrEdit from '@/components/input/ShowOrEdit.vue'
import { create } from 'domain';

const rowKey = (row: any) => {
  return row.key;
}


const createData = () => [
  {
    key: 0,
    fieldname: 'John Brown',
    age: '32',
    address: 'New York No. 1 Lake Park'
  },
  {
    key: 1,
    fieldname: 'Jim Green',
    age: '42',
    address: 'London No. 1 Lake Park'
  },
  {
    key: 2,
    fieldname: 'Joe Black',
    age: '32',
    address: 'Sidney No. 1 Lake Park'
  }
]

const data: Array<any> = reactive([...createData()])

const strCol = ({title, key, width}: {title: string, key: string, width?: number}) => {
  return {
    title,
    key,
    width: width || 150,
    render (row: any, index: number) {
      return h(ShowOrEdit, {
        value: row[key],
        onUpdateValue (v: any) {
          data[index][key] = v
        }
      })
    }
  }
}

const columns = [
  strCol({title: '字段名', key: 'fieldname'}),
]
</script>
