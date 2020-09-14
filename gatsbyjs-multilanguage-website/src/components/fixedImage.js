import React from "react"
import SbEditable from 'storyblok-react'
import Img from 'gatsby-image'
import { getFixedGatsbyImage } from 'gatsby-storyblok-image'

const FixedImage = ({ blok }) => {
  const fixedProps = getFixedGatsbyImage(blok.image, {
    width: 200
  })

  return (
    <SbEditable content={blok}>
      <Img fixed={fixedProps} />
    </SbEditable>
  )
}

export default FixedImage
