
import FeedItem from "../FeedItem/index"
import "./index.css"
// 热榜 父组件
export default function FeedBox(props) {
    const { data } = props;
    
    return data.map((item, index) => {
      return <FeedItem item={item} key={index}></FeedItem>;
    });
  }