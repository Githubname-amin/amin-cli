// 全局数据集合管理

// 设计全局数据
const dataStore = {
  activeDataSets: {}, // 正在统计的子数据集，内部会有更详细的业务维度
  deviceInfo: {}, //设备信息
  globalData: {},
};

// 创建一个子数据集
export function createDataSet(id) {
  dataStore.activeDataSets[id] = {
    id,
    startTime: Date.now(),
    performanceMetrics: [], //性能指标
    userActions: [], //用户行为
    customData: [], //业务字段
  };
}

// 获取子数据集的方法
export function getDataSet(id) {
  return dataStore.activeDataSets[id];
}

// 删除子数据集的方法
export function deleteDataSet(id) {
  const data = dataStore.activeDataSets[id];
  delete dataStore.activeDataSets[id];
  // console.log("成功删除信息", data, dataStore.activeDataSets);
  return data;
}

// 更新子数据集的方法
export function updateDataSet(id, key, callback) {
  // console.log("更新数据", id, key, callback);
  const dataSet = getDataSet(id);
  if (dataSet) {
    dataSet[key] = callback(dataSet[key]);
  }
}

// 获取全局数据的方法
export function getGlobalData() {
  return dataStore.globalData;
}

// 更新全局数据的方法
export function updateGlobalData(key, value) {
  dataStore.globalData[key] = value;
}
