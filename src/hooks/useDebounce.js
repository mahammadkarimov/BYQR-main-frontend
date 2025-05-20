import { useEffect } from "react"
import { useState } from "react"


export const useDebounce = (value, delay = 250) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        return () => {
            clearTimeout(timeout)
        }
    }, [value])

    return debouncedValue
}