import React from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'

const Button = styled(TouchableOpacity)`
  marginLeft: 15
  justifyContent: center
  alignItems: center
  marginRight: ${props=> props.side ==='right' ? 15 : 0}
  marginLeft: ${props=> props.side ==='left' ? 15 : 0}
`

export default function ButtonHeader({ side, children, onPress, disabled }) {
  return (
    <Button onPress={onPress} disabled={disabled} side={side}>
      {children}
    </Button>
  )
}