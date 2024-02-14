import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export default function CurvedSeparator({ fill, ...props }: SvgProps) {
  return (
    <Svg width='429' height='83' viewBox='0 0 429 83' fill='none' {...props}>
      <Path
        d='M0.276367 0.294922C0.276367 0.294922 137.313 44.024 218.612 44.024C299.91 44.024 428.276 0.294922 428.276 0.294922V82.5654H0.276367V0.294922Z'
        fill={fill || '#fff'}
      />
    </Svg>
  )
}
