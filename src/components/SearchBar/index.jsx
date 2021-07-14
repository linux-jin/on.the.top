import { useState, useRef } from "react";
import "./index.css"

export default function SearchBar(props) {
  const [classBarName, setClassBarName] = useState("searchBar");
  const refInput = useRef();
   
  /* 获取搜索建议 */
  const getQuerySuggestion = (keyword) => {
    fetch(`https://api.lookcos.cn/api-bing/qsonhs.aspx?type=cb&q=${keyword}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.AS.FullResults) {
          props.setState({
            dataSuggestion: data.AS.Results[0].Suggests.map((item) => {
              return item.Txt;
            }),
          });
        }
      });
  };

  // 根据用户输入 搜索答案
  const handleSearch = (r) => {
    let userInputValue = refInput.current.value;
    if (userInputValue) {
      props.isOn({bgFlur: 1, menu: 0});
      getQuerySuggestion(userInputValue);
    }
  };

  // 当用户放在输入框时，开始改变背景虚化样式
  const handleFocus = () => {
    props.isOn({bgFlur: 1, menu: 0});
  };

  // 处理输入框 失去焦点
  const handleBlur = () => {
     // 输入框内仍有内容，背景虚化，隐藏Footer
    if (refInput.current.value) {
      setClassBarName("searchBar foucs");
      props.isOn({bgFlur: 1, menu: 0});
    } else {
      setClassBarName("searchBar");
      props.isOn({bgFlur: 0, menu: 1});
      props.setState({dataSuggestion: []});
    }
  };
  // 处理按下确定键
  const handleKeyDown = (e) => {
    let val = refInput.current.value;
    // 当用户按下Enter键
    if (e.keyCode === 13 && val) {
      let localEngine = localStorage.getItem('searchEngine');
      window.open(`${localEngine}${val}`);
    }
  };

  return (
    <div className={classBarName} style={props.style}>
      <input
        ref={refInput}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChangeCapture={handleSearch}
        placeholder="Search"
      ></input>
    </div>
  );
}
