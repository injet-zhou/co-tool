import http from '@/api/axios'
import { TableBuildSchema } from '@/types/db'
export const buildSchema = async (data: TableBuildSchema) => {
    return await http.post('/db/createTbl', data)
}