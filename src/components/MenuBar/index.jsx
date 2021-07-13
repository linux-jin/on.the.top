
import "./index.css"


function SVGRight(props){
    const handleOpenFeed = () => {
        props.isOn({search: 0, foot: 0, feed: 1, menu: 0});
    }
    return (
        <div className="svgRight svgMenu" onClick={handleOpenFeed}>
            <img src="/img/right.svg" alt='right' />
        </div>
    )
}

export function MenuBar(props){
    return (
        <div className="MenuBar" style={props.style}>
            <SVGRight isOn={props.isOn}/>
        </div>
    )
}