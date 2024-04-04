import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'
import { GlobalColor } from '../constants/colors'
import { FontFamily } from '../constants/fontFamily'

type Props = {
  color?: keyof typeof GlobalColor
  value: number
  maxValue?: number
}

const CircularComponent = ({value, color, maxValue}: Props) => {
  return (
    <CircularProgress
    value={value}
    showProgressValue={false}
    title={`${value}%`}
    radius={40}
    maxValue={maxValue}
    activeStrokeColor={GlobalColor[color ?? 'blue']}
    inActiveStrokeColor={GlobalColor.lightGray}
    titleColor={GlobalColor.text}
    titleFontSize={20}
    titleStyle={{
      fontFamily: FontFamily.semibold
    }}
  />
  )
}

export default CircularComponent