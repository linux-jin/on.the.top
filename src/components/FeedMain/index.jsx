import { useState, useEffect } from "react";
import FeedBox from "../FeedBox";
import FeedMenu from "../FeedMenu";
import "./index.css";

export default function FeedMain(props) {
  function getHotData(url, node) {
    let param = { act: "getNodeLists", ispage: 1, limit: 30, nameArray: [node], page: 1, style: "txt" };
    // Default options are marked with *
    return fetch(url, {
      body: JSON.stringify(param), // must match 'Content-Type' header
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "user-agent": "Mozilla/4.0 MDN Example",
        "content-type": "application/json",
      },
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // *client, no-referrer
    }).then((response) => response.json()); // parses response to JSON
  }
  const [hotData, setHotData] = useState([]);
  useEffect(() => {
    //let nodeList = ["weibo", "baidu_ssrd", "zhihu_total"];
    let nodeList = [props.currApp];
    
    // 打开热点内容页面前 缓存内容
    let feedData = localStorage.getItem(props.currApp);

    // 缓存命中 直接取缓存
    if(feedData){
      setHotData(JSON.parse(feedData));
    }
    // 缓存未命中，设置缓存
    else{
      nodeList.forEach((item) => {
        getHotData("https://the.top/api/index/Index/list", item)
          .then((data) => {
            setHotData(data.result.lists.slice(0, 30));
            localStorage.setItem(props.currApp, JSON.stringify(data.result.lists.slice(0, 30)));
          })
          .catch((error) => console.error(error));
      });
    }
  }, [props.currApp]);

  return (
    <div className="feedContainer" style={props.style}>
      <FeedMenu changeCurrApp={props.changeCurrApp} currApp={props.currApp} feedAppList={props.feedAppList} isOn={props.isOn} />
      <div className="feedBox">
        <div className="feedMsg">
          <FeedBox data={hotData}></FeedBox>
        </div>
      </div>
    </div>
  );
}
