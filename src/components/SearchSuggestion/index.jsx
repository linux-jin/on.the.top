import React, { useCallback, useRef } from "react";
import "./index.css"

// 搜索建议 子组件
function SuggestionItem(props) {
  const myref = useRef();
  const handleClick = useCallback(() => {
    window.open(`https://www.bing.com/search?q=${myref.current.outerText}`);
  }, []);
  const { title } = props;
  return (
    <div className="keywordItem" ref={myref} onClick={handleClick}>
      {title}
    </div>
  );
}

function ResultBox(props) {
  const { keys } = props;
  return keys.map((item, index) => {
    return <SuggestionItem title={item} key={index}></SuggestionItem>;
  });
}

// 搜索建议 父组件
export default function SuggestionBox(props) {
  return (
    <div className="resultBox">
      <ResultBox keys={props.keys} />
    </div>
  );
}
