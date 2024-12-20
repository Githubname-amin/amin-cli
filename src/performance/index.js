// 收集性能指标
export function collectPerformanceMetrics() {
  const metrics = {};

  // DOM 加载时间
  metrics.domContentLoadedTime =
    document.timing.domContentLoadedEventEnd -
    document.timing.domContentLoadedEventStart;

  // 页面加载时间
  metrics.loadEventTime =
    document.timing.loadEventEnd - document.timing.loadEventStart;

  // 首次绘制时间
  const [paint] = document.timing.getEntriesByType("paint");
  if (paint) {
    metrics.firstPaintTime = paint.startTime;
  }

  return metrics;
}
