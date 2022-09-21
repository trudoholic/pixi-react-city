import { useEffect } from "react"

const Keyboard = () => {
    useEffect(() => {
        const handleKeyUp = e => {
            console.log(e.code)
            if ('Escape' === e.code) {}
        }
        document.addEventListener("keyup", handleKeyUp)
        return () => {
            document.removeEventListener("keyup", handleKeyUp)
        }
    }, [])

    return null
}

export default Keyboard