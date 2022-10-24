<template>
  <n-data-table
    :key="rowKey"
    :columns="columns"
    :data="data"
  />
</template>

<script setup lang="ts">
import ShowOrEdit from '@/components/input/ShowOrEdit.vue'

const rowKey = (row: any) => {
  return row.key;
}


const createData = () => [
  {
    key: 0,
    name: 'John Brown',
    age: '32',
    address: 'New York No. 1 Lake Park'
  },
  {
    key: 1,
    name: 'Jim Green',
    age: '42',
    address: 'London No. 1 Lake Park'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: '32',
    address: 'Sidney No. 1 Lake Park'
  }
]

const data = ref(createData());

const columns = [
  {
    title: 'Name',
    key: 'name',
    width: 150,
    render (row: any, index: number) {
      return h(ShowOrEdit, {
        value: row.name,
        onUpdateValue (v: any) {
          data.value[index].name = v
        }
      })
    }
  },
  {
    title: 'Age',
    key: 'age',
    width: 100,
    render (row: any, index: number) {
      return h(ShowOrEdit, {
        value: row.age,
        onUpdateValue (v: any) {
          data.value[index].age = v
        }
      })
    }
  },
  {
    title: 'Address',
    key: 'address',
    render (row: any, index: number) {
      return h(ShowOrEdit, {
        value: row.address,
        onUpdateValue (v: any) {
          data.value[index].address = v
        }
      })
    }
  }
]
</script>
