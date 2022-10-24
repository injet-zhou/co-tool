const appid = process.env.VITE_APP_ID
const key = process.env.VITE_APP_KEY

import md5 from 'md5';
const URL = 'http://api.fanyi.baidu.com/api/trans/vip/translate'

export const snakeCase2QueryStr = (str: string = '') => {
    return str.replace(/_/g, '\n')
}

export const en2zh = async (en: string = '') => {
    const salt = (new Date).getTime();
    const str = appid + en + salt + key;
    const sign = md5(str);
    const res = await fetch(`${URL}?q=${en}&from=en&to=zh&appid=${appid}&salt=${salt}&sign=${sign}`);
    const {trans_result} = await res.json();
    return trans_result.map((item: any) => item.dst).join('');
}