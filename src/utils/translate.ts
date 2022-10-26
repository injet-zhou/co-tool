import http from '@/api/axios'

export const snakeCase2QueryStr = (str = '') => {
  return str.replace(/_/g, '\n')
}

export const en2zh = async (en = '') => {
  const data = { from: 'en', to: 'zh', text: en }
  const res = await http.post('/tools/translate', data)
  console.log(`en2zh: ${JSON.stringify(data)} -> ${JSON.stringify(res)}`)
  return res.data
}

export const zh2en = async (zh = '') => {
  const data = { from: 'zh', to: 'en', text: zh }
  const res = await http.post('/tools/translate', data);
  return res.data
}
