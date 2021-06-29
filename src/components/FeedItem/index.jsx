
import { useCallback, useRef } from "react";
import './index.css'


// 热榜 子组件
export default function FeedItem(props) {
    const myref = useRef();
    const { title, name, logo, url } = props.item;
    const handleClick = useCallback(() => {
      window.open(url);
    }, [url]);
    return (
      <div className="FeedItem" ref={myref} onClick={handleClick}>
        <div className="icon">
          <img alt={name} src={logo}></img>
        </div>
        <div className="title">{title}</div>
      </div>
    );
  }