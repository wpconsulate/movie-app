import Config from './../Config'

export default (lat: string, lng: string) => ({
  Authorization: Config.CINEMAS_API_AUTH,
  Geolocation: `${lat};${lng}`,
  client: Config.CINEMAS_API_USERNAME,
  territory: 'UK',
  'api-version': 'v200',
  'x-api-key': Config.CINEMAS_API_X_KEY,
  'device-datetime': new Date()
})
