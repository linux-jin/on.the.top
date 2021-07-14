import { useState } from "react";
import "./index.css";

function SwitchBtn(props) {
  return (
    <input
      className={props.isChecked ? "ios-btn ios-switch ios-switch-checked" : "ios-btn ios-switch"}
      type="checkbox"
      style={{ background: props.isChecked ? "#5eb662" : "#e9e9ef" }}
    />
  );
}

export default function ToolBar(props) {
  let localBing = localStorage.getItem("isBing");
  const [isBing, setBing] = useState(localBing==="bing"?true: false);

  const handleBI = () => {
    if(!isBing){
        setBing(true);
        localStorage.setItem("isBing", "bing");
        props.changeBackgroundImage(localStorage.getItem("bingImage"));
    }else{
        setBing(false);
        props.changeBackgroundImage("/img/bg4.jpg");
        localStorage.setItem("isBing", "Author leehongtao.com");
    }
  };

  let googleUrl = "https://www.google.com/search?q=";
  let localEngine = localStorage.getItem("searchEngine");
  const [isGoogle, setIsGoogle] = useState(localEngine === googleUrl ? true : false);
  const changeToGoogle = () => {
    if (!isGoogle) {
      localStorage.setItem("searchEngine", "https://www.google.com/search?q=");
      setIsGoogle(true);
    } else {
      localStorage.setItem("searchEngine", "https://cn.bing.com/search?q=");
      setIsGoogle(false);
    }
  };

  const openGithub = () => {
      window.open("https://github.com/LookCos/on.the.top");
  }

  return (
    <div className="ToolBar" style={props.style}>
      <div className="switchBox">
        <div className="switch-item">
          <div className="switch-desc">
            <div className="switch-icon">
              <img src="/img/bing.svg" alt="" />
            </div>
            <div className="switch-text">使用必应每日壁纸</div>
          </div>
          <div className="switch-btn" onClick={handleBI}>
            <SwitchBtn isChecked={isBing} />
          </div>
        </div>
        
        <div className="switch-item">
          <div className="switch-desc">
            <div className="switch-icon">
              <img src="/img/google.svg" alt="" />
            </div>
            <div className="switch-text">使用Google搜索</div>
          </div>
          <div className="switch-btn" onClick={changeToGoogle}>
            <SwitchBtn isChecked={isGoogle} />
          </div>
        </div>

        <div className="switch-item" onClick={openGithub}>
          <div className="switch-desc">
            <div className="switch-icon">
              <img src="/img/github.svg" alt="" />
            </div>
            <div className="switch-text">访问开源地址</div>
          </div>
          <div className="switch-btn">
            
          </div>
        </div>

      </div>
    </div>
  );
}
