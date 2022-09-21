import { useEffect } from "react"
import { useApp } from '@inlet/react-pixi'

const Resizer = () => {
    const app = useApp()

    useEffect(() => {
        const handleResize = () => {
            console.log('resize')
            app.resize()
        }
        window.addEventListener("resize", handleResize)
        app.resize()
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return null
}

export default Resizer