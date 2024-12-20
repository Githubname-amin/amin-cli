import { generateUniqueId } from "./core/utils";
import { collectPerformanceMetrics } from "./performance/index";
import { updateDataSet, createDataSet, deleteDataSet } from "./core/dataStore";
import { initBehaviorTracking } from "./userBehavior/index";
import config from "./config";

// 用户行为全部终止的命令集
let stopBehaviorTracking = null;

export function start() {
  const id = generateUniqueId();
  createDataSet(id);

  if (config.enablePerformanceTracking) {
    const metrics = collectPerformanceMetrics();
    updateDataSet(id, "performanceMetrics", metrics);
  }
  if (config.enableBehaviorTracking) {
    stopBehaviorTracking = initBehaviorTracking(id);
  }

  return id;
}

export function stop(dataSetId) {
  const data = deleteDataSet(dataSetId);
  if (stopBehaviorTracking) {
    stopBehaviorTracking();
  }
  return data;
}
