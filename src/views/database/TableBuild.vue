<template>
  <n-space>
    <n-button @click="newRow" strong secondary type="primary">添加</n-button>
    <n-button strong secondary type="error">删除</n-button>
    <n-button @click="buildTable" strong secondary type="primary"
      >生成SQL</n-button
    >
    <n-select v-model:value="dbType" :options="databaseOptions" />
    <n-input
      :placeholder="'请输入数据库名'"
      v-model:value="databaseName"
    ></n-input>
    <n-input :placeholder="'请输入表名'" v-model:value="tableName"></n-input>
  </n-space>
  <n-data-table
    :key="rowKey"
    style="margin-top: 10px"
    :columns="columns"
    :data="data"
  />
  <n-card title="变量翻译" size="small">
    <n-space>
      <n-input
        :placeholder="'请输入变量'"
        v-model:value="varTrans.text"
        type="textarea"
      ></n-input>
      <n-tag type="success">
        {{ varTrans.from === "en" ? "英文" : "中文" }}
      </n-tag>
      <n-button @click="swap">
        <template #icon>
          <n-icon><ArrowSwap20Regular /></n-icon>
        </template>
      </n-button>
      <n-tag type="warning">
        {{ varTrans.to === "en" ? "英文" : "中文" }}
      </n-tag>
      <n-input
        v-model:value="camelCaseRes"
        :placeholder="'结果（驼峰）'"
        type="textarea"
      ></n-input>
      <n-input
        v-model:value="snakeCaseRes"
        :placeholder="'结果（下划线）'"
        type="textarea"
      ></n-input>
      <n-button @click="translate" strong secondary type="primary"
        >翻译</n-button
      >
    </n-space>
  </n-card>
  <n-code :code="sql" language="sql" />
</template>

<script setup lang="ts">
import { ArrowSwap20Regular } from "@vicons/fluent";
import ShowOrCheck from "@/components/input/ShowOrCheck.vue";
import ShowOrEdit from "@/components/input/ShowOrEdit.vue";
import ShowOrNumberInput from "@/components/input/ShowOrNumberInput.vue";
import ShowOrSelect from "@/components/input/ShowOrSelect.vue";
import { SQLSERVER_FIELD_TYPES } from "./types";
import { zh2en, en2zh } from "@/utils/translate";
import {
  words2CamelCase,
  words2SnakeCase,
  sentence2CamelCase,
  sentence2SnakeCase,
} from "@/utils/string";
import { NButton, NSpace } from "naive-ui";
import { ColumnDef, DBType, TableBuildSchema } from "@/types/db";
import { buildSchema } from "@/api/db";

const rowKey = (row: any) => {
  return row.key;
};

const EN = "en";
const ZH = "zh";

interface SelectOption {
  label: string;
  value: string;
}

const varTrans = reactive({
  text: "",
  to: EN,
  from: ZH,
});

const databaseOptions = [
  { label: "Mysql", value: DBType.MYSQL },
  { label: "SqlServer", value: DBType.MSSQL },
];

const camelCaseRes = ref("");
const snakeCaseRes = ref("");
const tableName = ref("");
const databaseName = ref("");
const dbType = ref(DBType.MSSQL);
const sql = ref("");

const translate = async () => {
  let res: any;
  if (varTrans.from === ZH && varTrans.to === EN) {
    res = await zh2en(varTrans.text);
  } else if (varTrans.from === EN && varTrans.to === ZH) {
    res = await en2zh(varTrans.text);
  }
  if (res && res.length === 1) {
    const [result] = res as string[];
    camelCaseRes.value = sentence2CamelCase(result);
    snakeCaseRes.value = sentence2SnakeCase(result);
    return;
  }
  camelCaseRes.value = words2CamelCase(res);
  snakeCaseRes.value = words2SnakeCase(res);
};

const swap = () => {
  const temp = varTrans.from;
  varTrans.from = varTrans.to;
  varTrans.to = temp;
};

const buildOptions = (options: string[]): SelectOption[] => {
  return options.map((option) => {
    return {
      label: option,
      value: option,
    };
  });
};

const fieldTypes = buildOptions(SQLSERVER_FIELD_TYPES);

const data: Array<Record<string, string | boolean | number>> = reactive([]);

const buildTable = async () => {
  const schema: TableBuildSchema = {
    database: databaseName.value,
    tableName: tableName.value,
    columns: data.map((item) => {
      const col = {
        name: item.name,
        type: item.type,
        length: item.length,
        nullable: item.isNull,
        isPrimaryKey: item.isPrimaryKey,
        defaultValue: item.defaultValue,
        comment: item.comment,
      } as ColumnDef;
      return col;
    }),
    options: {
      type: dbType.value,
    },
  };
  const res = await buildSchema(schema);
  if (res.code === 200) {
    sql.value = res.data as string;
  }
};

const strCol = ({
  title,
  key,
  width,
}: {
  title: string;
  key: string;
  width?: number;
}) => {
  return {
    title,
    key,
    width: width || 150,
    render(row: any, index: number) {
      return h(ShowOrEdit, {
        value: row[key],
        onUpdateValue(v: string) {
          data[index][key] = v;
        },
      });
    },
  };
};

const boolCol = ({
  title,
  key,
  width,
}: {
  title: string;
  key: string;
  width?: number;
}) => {
  return {
    title,
    key,
    width: width || 150,
    render(row: any, index: number) {
      return h(ShowOrCheck, {
        value: row[key],
        type: "bool",
        onUpdateValue(v: boolean) {
          data[index][key] = v;
        },
      });
    },
  };
};

const numCol = ({
  title,
  key,
  width,
}: {
  title: string;
  key: string;
  width?: number;
}) => {
  return {
    title,
    key,
    width: width || 150,
    render(row: any, index: number) {
      return h(ShowOrNumberInput, {
        value: row[key],
        type: "number",
        onUpdateValue(v: number | string) {
          data[index][key] = v;
        },
        min: 0,
        max: 255,
        placeholder: "0-255",
      });
    },
  };
};

const selectCol = ({
  title,
  key,
  width,
  options,
}: {
  title: string;
  key: string;
  width?: number;
  options: Array<{ label: string; value: string }>;
}) => {
  return {
    title,
    key,
    width: width || 150,
    render(row: any, index: number) {
      return h(ShowOrSelect, {
        value: row[key],
        onUpdateValue(v: string) {
          data[index][key] = v;
        },
        options,
        labelField: "label",
        valueField: "value",
      });
    },
  };
};

const newRow = () => {
  data.push({
    key: data.length,
    name: "",
    type: "",
    length: 0,
    nullable: true,
    comment: "",
    defaultValue: "",
    isPrimaryKey: false,
  });
};

const columns = [
  strCol({ title: "字段名", key: "name" }),
  selectCol({ title: "类型", key: "type", options: fieldTypes }),
  numCol({ title: "长度", key: "length" }),
  boolCol({ title: "主键", key: "isPrimaryKey" }),
  boolCol({ title: "可null", key: "nullable" }),
  strCol({ title: "默认值", key: "defaultValue" }),
  strCol({ title: "备注", key: "comment" }),
  {
    title: "操作",
    key: "action",
    width: 150,
    render(row: any, index: number) {
      return h(
        NSpace,
        {},
        {
          default: () => [
            h(
              NButton,
              {
                onClick: () => {
                  data.splice(index, 1);
                },
                type: "error",
              },
              {
                default: () => "删除",
              }
            ),
            h(
              NButton,
              {
                onClick: () => {
                  newRow();
                },
                type: "primary",
              },
              {
                default: () => "添加",
              }
            ),
          ],
        }
      );
    },
  },
];
</script>
