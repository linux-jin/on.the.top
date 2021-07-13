import React from "react";

import FeedMain from "./components/FeedMain";
import SearchBar from "./components/SearchBar";
import SuggestionBox from "./components/SearchSuggestion";
import { MenuBar } from "./components/MenuBar";
import "./App.css";



class App extends React.Component {
  state = {
    data: [],
    bgImg: null,
    bgSrc: "/img/bg.jpg",
    dataSuggestion: [],
    currApp: 'weibo',
    feedData: [],
    feedAppList : [
      {'title': '微博热搜', logo: 'https://img.lookcos.cn/img/weibo.jpg', sign: 'weibo'},
      {'title': '知乎话题', logo: 'https://img.lookcos.cn/img/zhihu.jpg', sign: 'zhihu_total'},
      //{'title': '百度热搜', logo: 'https://img.lookcos.cn/img/baidu.jpg', sign: 'baidu_ssrd'},
      {'title': '腾讯新闻', logo: 'https://img.lookcos.cn/img/qq.jpg', sign: 'tencent_news'},
      {'title': '澎湃新闻', logo: 'https://img.lookcos.cn/img/ppnews.jpg', sign: 'ppnews_today'},
      {'title': 'IT  之家', logo: 'https://img.lookcos.cn/img/ithome.jpg', sign: 'ithome_day'},
      {'title': '36kr人气', logo: 'https://img.lookcos.cn/img/36kr.jpg', sign: 'kr_renqi'},
      {'title': '雪球话题', logo: 'https://img.lookcos.cn/img/xueqiu.jpg', sign: 'xueqiu'},
      {'title': '第一财经', logo: 'https://img.lookcos.cn/img/xueqiu.jpg', sign: 'yicai_hot'},
      {'title': '知道日报', logo: 'https://img.lookcos.cn/img/zhidao.jpg', sign: 'zhidao'},
    ],
    on: {foot: 1, search: 1, feed: 0, bgFlur: 0, menu: 1}, // 各组件开关
  };

  // 创建一个ref容器
  userInput = React.createRef();

  // 设置背景地址
  getBingImage = () => {
    fetch("https://api.lookcos.cn/bing/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ bgImg:  `https://cn.bing.com/${data["images"][0]["url"]}`});
      });
  };

  /* 生命周期函数：
   *  
   */
  componentDidMount() {
    
    // 添加全局监听键盘事件
    document.addEventListener("keydown", this.handleGlobalKey);
   
    // 获取必应壁纸
    this.getBingImage();
    
    // 30秒清空一次feed缓存
    this.timerID = setInterval(
      () => {
        this.state.feedAppList.forEach(item => {
          console.log("移除", item.sign);
          localStorage.removeItem(item.sign);
        })
      },
      600000
    );
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleGlobalKey);
    clearInterval(this.timerID);
  }

  
  // 跳转到博客
  handleAuthor = () => {
    window.open("https://lookcos.cn");
  };

  clickFooter = () => {
    window.open("https://the.top")
  }

  changeCurrApp = (appName) => {
    this.setState({currApp: appName});
  }
  // 处理全局按键
  handleGlobalKey = (e) => {
    console.log(e.keyCode);
    // 右键 显示左栏热榜
    if(e.keyCode===39){
      this.isOn({search: 0, foot: 0, feed: 1, menu: 0});
    // 左键 隐藏热榜
    }else if(e.keyCode===37){
      this.isOn({search: 1, foot: 1, feed: 0, menu: 1});
    }else if(e.keyCode===66){
      this.setState({bgSrc: this.state.bgImg});
    }
  };

  // 开关控制，参数例如 obj={foot: 1}
  isOn = (obj) => {
    console.log(obj);
    this.setState({on: Object.assign({}, this.state.on, obj)});
  }
  
  render() {

    // 全局组件开关
    let on = this.state.on;

    return (
      <div className="main" onKeyDown={e=>{this.handleGlobalKey(e)}}>
        <div className="cover">  
          <img className={this.state.on.bgFlur?'imgBg img-filter': 'imgBg'} alt="背景图片" src={this.state.bgSrc}></img>
        </div>
        <FeedMain style={{width: on.feed?'100%':'0%'}}  currApp={this.state.currApp} changeCurrApp={e=>{this.changeCurrApp(e)}} feedAppList={this.state.feedAppList} isOn={this.isOn}/>
        <SearchBar  isOn={obj=>this.isOn(obj)} setState={data=>{this.setState(data)}} style={{visibility: on.search?'visible':'hidden', opacity: on.search?'1':'0'}}/>
        <MenuBar  style={{visibility: on.menu?'visible':'hidden'}} isOn={obj=>this.isOn(obj) }  ></MenuBar>
        <SuggestionBox keys={this.state.dataSuggestion}></SuggestionBox>
        <div className="footer" onClick={this.clickFooter}  style={{visibility: on.search?'visible':'hidden'}}>
          © 2020 拓扑排行榜 All Rights Reserved. 豫ICP备19015088号-1
        </div>,
      </div>
    );
  }
}

export default App;
