import { useEffect, useState } from 'react'

export const useLocalStorage = (key, initialValue, options = {}) => {
  const { deleteKeyIfValueIs = null } = options
  // We pass useState a function that handles initial state
  // creation. That way, the function is executed only once.
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    let value = localStorage[key]
    // If a value isn't already present in local storage, set it to the
    // provided initial value.
    if (value === undefined) {
      value = initialValue
      localStorage[key] = JSON.stringify(value)
    } // If value came from local storage it might need parsing.
    else
      try {
        value = JSON.parse(value)
      } catch (error) {
        /* continue regardless of error */
      }
    setValue(value)

    // The CustomEvent triggered by a call to useLocalStorage somewhere
    // else in the app carries the new value as the event.detail.
    const cb = event => setValue(event.detail)

    // Register event listener on initial state creation. Allows us to react
    // to events emitted by setValue below. That way we can keep value in sync
    // between multiple call sites to useLocalStorage with the same key.
    document.addEventListener(`localStorage:${key}Change`, cb)
    return () => document.removeEventListener(`localStorage:${key}Change`, cb)
  }, [initialValue, key])

  const setStoredValue = newValue => {
    if (newValue === value) return

    // Conform to useState API by allowing newValue to be a function
    // which takes the current value.
    if (newValue instanceof Function) newValue = newValue(value)

    const event = new CustomEvent(`localStorage:${key}Change`, {
      detail: newValue,
    })
    document.dispatchEvent(event)

    setValue(newValue)

    if (newValue === deleteKeyIfValueIs) delete localStorage[key]
    if (typeof newValue === `string`) localStorage[key] = newValue
    else localStorage[key] = JSON.stringify(newValue)
  }
  return [value, setStoredValue]
}