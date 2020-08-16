import { useEffect, useState } from 'react'
import mediaQuery  from '../utils/mediaQuery'

export const useMediaQuery = (query, cb) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const qry = window.matchMedia(query)
    setMatches(qry.matches)

    const handleMatch = q => {
      setMatches(q.matches)
      if (cb instanceof Function) cb(q.matches)
    }

    qry.addListener(handleMatch)
    return () => qry.removeListener(handleMatch)
  }, [query, cb])

  return matches
}

const validKeys = Object.keys(mediaQuery).filter(key => !key.includes(`Js`))

export const useScreenQuery = (key, cb) => {
  if (!mediaQuery[key + `Js`])
    throw new TypeError(
      `useScreenQuery received invalid key: ${key}. Should be one of ${validKeys}`
    )
  return useMediaQuery(mediaQuery[key + `Js`], cb)
}