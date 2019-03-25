import { Permissions, Location } from 'expo'

export default async () => {
  try {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)
    let finalStatus = status
    console.log('status', finalStatus)
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.LOCATION)
      finalStatus = status
    }
    // If no permission, exit the function
    if (finalStatus !== 'granted') {
      console.log('no permission')
      return
    }
    return Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced
    })
  } catch (err) {
    const status = await Location.getProviderStatusAsync()
    if (!status.locationServicesEnabled) {
      return
    }
  }
  return
}
