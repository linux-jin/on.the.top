import "./index.css";

function AppItem(props) {
  const clickApp = () => {
    props.changeCurrApp(props.item.sign);
  };
  return (
    <div className={props.currApp === props.item.sign ? "appItem active" : "appItem"} onClick={clickApp}>
      <div className="icon">
        <img alt={props.item.title} src={props.item.logo}></img>
      </div>
      <div className="title">{props.item.title}</div>
    </div>
  );
}

function AppBox(props) {
  // 读取父组件 feedAppList
  const appList = props.feedAppList;
  return appList.map((item, index) => {
    return (
      <AppItem
        item={item}
        key={index}
        index={index}
        currApp={props.currApp}
        changeCurrApp={(e) => {
          props.changeCurrApp(e);
        }}
      />
    );
  });
}

function SvgBack(props) {
  const handleBack = () => {
    props.isOn({ search: 1, foot: 1, feed: 0, menu: 1 });
  };
  return (
    <div className="svgBackBox" onClick={handleBack}>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="svgBack">
        <g>
          <path d="M4.656 12l8.72-8.72c.293-.293.293-.768 0-1.06s-.768-.294-1.06 0l-9.25 9.25c-.294.292-.294.767 0 1.06l9.25 9.25c.145.146.337.22.53.22s.383-.073.53-.22c.292-.293.292-.768 0-1.06L4.655 12z"></path>
          <path d="M12.465 12l8.72-8.72c.293-.293.293-.768 0-1.06s-.768-.294-1.06 0l-9.25 9.25c-.294.292-.294.767 0 1.06l9.25 9.25c.145.146.337.22.53.22s.383-.073.53-.22c.292-.293.292-.768 0-1.06L12.464 12z"></path>
        </g>
      </svg>
    </div>
  );
}

export default function FeedMenu(props) {
  return (
    <div className="feedMenu">
      <SvgBack isOn={props.isOn}></SvgBack>
      <div className="feedApp">
        <AppBox
          changeCurrApp={(e) => {
            props.changeCurrApp(e);
          }}
          currApp={props.currApp}
          feedAppList={props.feedAppList}
        />
      </div>
    </div>
  );
}
