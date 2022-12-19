import { useEffect, useState } from 'react'
import {
  dirtImg,
  grassImg,
  glassImg,
  woodImg,
  logImg
} from '../images/images.js'
import { useStore } from '../hooks/useStore.js'
import { useKeyboard } from '../hooks/useKeyboard.js'

const images = [dirtImg, grassImg, glassImg, woodImg, logImg]

export const TextureSelector = () => {
  const [texture, setTexture] = useStore(state => [state.texture, state.setTexture])

  const {
    dirt,
    grass,
    glass,
    wood,
    log
  } = useKeyboard()

  useEffect(() => {
    const options = {
      dirt,
      grass,
      glass,
      wood,
      log
    }

    const selectedTexture = Object
      .entries(options)
      .find(([texture, isEnabled]) => isEnabled)

    if (selectedTexture) {
      const [textureName] = selectedTexture
      setTexture(textureName)
    }
  }, [dirt, grass, glass, wood, log])

  return (
    <div className='texture-selector'>
      {
        Object
          .entries(images)
          .map(([imgKey, img]) => (
            <img
              className={texture === imgName(img) ? 'selected' : ''}
              key={imgKey}
              src={img}
              alt={imgKey}
            />
          ))
      }
    </div>
  )
}

const imgName = (name) => name.replace('/src/images/', '').replace('.jpg', '').replace('.png', '')
