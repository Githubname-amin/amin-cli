import { updateDataSet } from "../core/dataStore";

export function trackClick(dataSetId) {
  const handleClick = (event) => {
    const action = {
      type: "click",
      target: event.target.tagName,
      timestamp: Date.now(),
      x: event.clientX,
      y: event.clientY,
    };
    updateDataSet(dataSetId, "userActions", (actions = []) => [
      ...actions,
      action,
    ]);
  };
  //   添加事件监听器
  document.addEventListener("click", handleClick);

  return () => {
    document.removeEventListener("click", handleClick);
  };
}
