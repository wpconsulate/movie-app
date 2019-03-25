import axios from 'axios'
import Config from './../Config'
export default (expoTokenId: string, title: string, body: string) => {
  axios.post(
    Config.EXPO_PUSH_SERVER,
    {
      to: expoTokenId,
      sound: 'default',
      title,
      body
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
}
