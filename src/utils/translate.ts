import http from '@/api/axios'

export const snakeCase2QueryStr = (str = '') => {
  return str.replace(/_/g, '\n')
}

export const translate = async ({from= 'zh', to= 'en', text = ''}: {from: string, to: string , text: string}) => {
  const res = await http.post('/tools/translate', {from, to, text})
  return res.data;
}

export const en2zh = async (en = '') => {
  return await translate({from: 'en', to: 'zh', text: en})
}

export const zh2en = async (zh = '') => {
  return await translate({from: 'zh', to: 'en', text: zh})
}
