import { useEffect, useState } from 'react'
import * as images from '../images/images.js'
import { useStore } from '../hooks/useStore.js'
import { useKeyboard } from '../hooks/useKeyboard.js'

export const TextureSelector = () => {
  const [visible, setVisible] = useState(true)
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

  if (!visible) return null

  return (
    <div className='texture-selector'>
      {
        Object
          .entries(images)
          .map(([imgKey, img]) => (
            <img
              className={texture === imgKey.replace('Img', '') ? 'selected' : ''}
              key={imgKey}
              src={img}
              alt={imgKey}
            />
          ))
      }
    </div>
  )
}
