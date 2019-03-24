import { Permissions, Notifications } from 'expo'
import { database, auth } from 'firebase'
export default async () => {
  // Check for existing permissions...
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  let finalStatus = status
  if (status !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }
  // If no permission, exit the function
  if (finalStatus !== 'granted') {
    return
  }
  const token = await Notifications.getExpoPushTokenAsync()
  auth().onAuthStateChanged(user => {
    console.log('user', user)
    if (user) {
      database()
        .ref('users')
        .child(user.uid)
        .update({
          expoPushToken: token
        })
    }
  })
}
