import { updateDataSet } from "../core/dataStore";

// 节流储存
const recentClick = new Map();

export function trackClick(dataSetId) {
  const handleClick = (event) => {
    // let target = event.target;
    let target = undefined;
    // 获取当前节点，开始冒泡，查看是否包含observer-click属性
    // while (target) {
    //   if (target.hasAttribute("observer-click")) {
    //     break;
    //   }
    //   target = target.parentElement;
    // }
    // 另一种写法，通过composedPath去获取传播路径
    // 内置方法，时间开销比我们自己遍历DOM要小
    const path = event.composedPath();
    target = path.find((node) => node.hasAttribute("observer-click"));

    if (!target) {
      return;
    }
    const observerClickValue = target.getAttribute("observer-click");
    const now = Date.now();
    // 节流
    if (recentClick.has(observerClickValue)) {
      const lastTime = recentClick.get(observerClickValue);
      if (now - lastTime < 3000) {
        return;
      }
    }
    // 更新节流时间
    recentClick.set(observerClickValue, now);
    console.log("记录本次点击", observerClickValue);
    // 支持传参(用户传入自定义对象)
    const params = target.getAttribute("observer-click-data");
    // 自定义参数
    let clickUploadData = {};
    if (params) {
      try {
        clickUploadData = JSON.parse(params);
      } catch (error) {
        console.error("解析自定义参数失败", target, error);
      }
    }

    // 记录
    const action = {
      id: observerClickValue,
      type: "click",
      target: event.target.tagName,
      timestamp: Date.now(),
      position: {
        x: event.clientX,
        y: event.clientY,
      },
      clickUploadData,
    };
    console.log("记录本次点击", action);
    // TODO：可能存在的问题：如果已经存在相同id的action，则会被覆盖，例如同一个地方点击多次，那只会记录一下，后续修改数据结构
    updateDataSet(dataSetId, "userActions", (actions = []) => [
      ...actions,
      action,
    ]);
  };
  //   添加事件监听器
  document.addEventListener("click", handleClick);

  return () => {
    document.removeEventListener("click", handleClick);
    recentClick.clear(); // 清空最近点击记录
  };
}
