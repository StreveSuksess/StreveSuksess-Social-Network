import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Messages from "../components/Messages/Messages";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree/>}>
      <ComponentPreview path="/Messages">
        <Messages/>
      </ComponentPreview>
    </Previews>
  )
}

export default ComponentPreviews