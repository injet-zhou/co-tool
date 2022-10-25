export const SQLSERVER_FIELD_TYPES = [
    'bigint',
    'binary',
    'bit',
    'char',
    'date',
    'datetime',
    'datetime2',
    'datetimeoffset',
    'decimal',
    'float',
    'image',
    'int',
    'money',
    'nchar',
    'ntext',
    'numeric',
    'nvarchar',
    'real',
    'smalldatetime',
    'smallint',
    'smallmoney',
    'sql_variant',
    'text',
    'time',
    'timestamp',
    'tinyint',
    'uniqueidentifier',
    'varbinary',
    'varchar',
    'xml',
    'hierarchyid',
]

export const sqlServerFieldType2KnexType = (type: string) => {
    switch (type) {
        case 'bigint':
            return 'bigInteger'
        case 'binary':
            return 'binary'
        case 'bit':
            return 'boolean'
        case 'char':
            return 'char'
        case 'date':
            return 'date'
        case 'datetime':
            return 'dateTime'
        case 'datetime2':
            return 'dateTime'
        case 'datetimeoffset':
            return 'dateTime'
        case 'decimal':
            return 'decimal'
        case 'float':
            return 'float'
        case 'image':
            return 'binary'
        case 'int':
            return 'integer'
        case 'money':
            return 'decimal'
        case 'nchar':
            return 'char'
        case 'ntext':
            return 'text'
        case 'numeric':
            return 'decimal'
        case 'nvarchar':
            return 'string'
        case 'real':
            return 'float'
        case 'smalldatetime':
            return 'dateTime'
        case 'smallint':
            return 'smallInteger'
        case 'smallmoney':
            return 'decimal'
        case 'sql_variant':
            return 'text'
        case 'text':
            return 'text'
        case 'time':
            return 'time'
        case 'timestamp':
            return 'dateTime'
        case 'tinyint':
            return 'tinyInteger'
        case 'uniqueidentifier':
            return 'uuid'
        case 'varbinary':
            return 'binary'
        case 'varchar':
            return 'string'
        case 'xml':
            return 'text'
        case 'hierarchyid':
            return 'text'
        default:
            return 'text'
    }
}