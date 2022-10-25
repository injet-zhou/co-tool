import axios from '@/api/axios'

export const snakeCase2QueryStr = (str = '') => {
  return str.replace(/_/g, '\n')
}

export const en2zh = async (en = '') => {
  const data = { from: 'zh', to: 'en', text: en }
  const res = await axios.post('/tools/translate', data)
  return res.data
}

export const zh2en = async (zh = '') => {
  const data = { from: 'zh', to: 'en', text: zh }
  const res = await axios.post('/tools/translate', data)
  return res.data
}
