import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Avatar }  from 'react-native-elements'

interface IProps {
userInitials?: string
avatarColour?: string
}

export default class UserAvatar extends Component<IProps> {
    constructor(props: IProps) {
      super(props)
    }
    
    render(){
    const { userInitials, avatarColour } = this.props

    if (userInitials === undefined || avatarColour === null){
        return (
            <TouchableOpacity
                style={{
                backgroundColor: 'blue',
                borderRadius: 37.5,
                height: 40,
                width: 40                
                }}
            />
        )
    }

    return(
    <Avatar
        size="medium"   
        rounded={true}            
        title={userInitials}
        // title="MT"
        overlayContainerStyle={{ backgroundColor: avatarColour }}
        activeOpacity={0.7}
    />
    )
    }
}