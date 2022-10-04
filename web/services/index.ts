import axios from 'axios'

const API_URL =  'https://dits790ock.execute-api.sa-east-1.amazonaws.com/dev'

let token

export default {
    async get(path) {
      return await axios.get(API_URL.concat(path || ''))
    },
    async post(path, body) {
        // token = await this.token()
        return await axios.post(API_URL.concat(path || ''), { body })
    },
    async token() {
        return await axios.post(`${API_URL}/login`)
            .then((res) => res.data.token)
            .catch((e) => console.log(e))
    }
}
