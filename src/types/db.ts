export type ColumnDef =  {
  name: string;
  type: string;
  length: number;
  nullable: boolean;
  defaultValue: any;
  comment: string;
  isPrimaryKey: boolean;
}

export enum DBType {
  MYSQL = "mysql",
  MSSQL = "mssql",
}

export interface TableOptions {
  autoIncrement?: boolean;
  type: DBType;
}

export interface TableBuildSchema {
  tableName: string;
  database: string;
  columns: ColumnDef[];
  options: TableOptions;
}
