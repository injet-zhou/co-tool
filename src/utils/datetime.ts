import * as dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

export const timestamp2Datetime = (timestamp: number) => {
    if (!timestamp || timestamp < 0) {
        return ''
    }
    const d = new dayjs.Dayjs(timestamp)
    return d.format('YYYY-MM-DD HH:mm:ss')
}