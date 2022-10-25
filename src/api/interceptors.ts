import { AxiosError } from "axios"
import { createDiscreteApi } from 'naive-ui'

const {message} = createDiscreteApi(['message'])

const errorCodeHandler = (res: any) => {
    const { status, data } = res;
    switch (status) {
        case 400:
            message.error(`参数错误：${data.msg}`)
            break;
        case 401:
            message.error(`登录信息已过期，请重新登录`)
            window.location.href = '/login'
            break;
        case 403:
            message.error(`拒绝访问`)
            break;
        case 404:
            message.error(`请求路径不存在`)
            break;
        case 500:
            message.error(`服务器内部错误`)
            break;
        default:
            message.error(`未知错误(${status})`)
            break;
    }
}

export const requestErrorHanlder = (error: AxiosError) => {
    const { response } = error
    if (response) {
        errorCodeHandler(response)
    }
    return Promise.reject(error)
}