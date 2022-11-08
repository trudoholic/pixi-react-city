import * as PIXI from "pixi.js"
import {useContext} from "react"
import {Text} from "@inlet/react-pixi"
import AppContext from "../AppContext"

const textStyle = new PIXI.TextStyle({
    align: "center",
    fontFamily: "Barlow Condensed",
    fontSize: 50, // [26]
    fontWeight: "bold",
    fill: "#fff",
    // fill: ["#26f7a3", "#01d27e"],
    // stroke: "#eef1f5",
    // strokeThickness: 1,
    // letterSpacing: 5,
    // wordWrap: false,
    // wordWrapWidth: 350
})

const StyledText = ({ text, x, y, fontSize = 26 }) => {

    const fontLoad = useContext(AppContext)

    textStyle.fontSize = fontSize

    return (
        fontLoad ? <Text text={text} style={textStyle} x={x} y={y} /> : <Text text={text} />//null
    )
}

export default StyledText