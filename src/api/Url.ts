import Config from '../Config';
export interface Param {
    param: string
    value: string
}
export class Url {
    public getUrl(url?: string, params?: Param[]) {
        if (params) {
            const data = params.map((item) => {
                return `${item.param}=${item.value}`
            })
            return `${Config.BASE_URL}${url ? url : ''}?api_key=${Config.API_KEY}&${data.join('&')}`
        }

        return `${Config.BASE_URL}${url ? url : ''}?api_key=${Config.API_KEY}`
    }
}