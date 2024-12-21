// 收集性能指标
export function collectPerformanceMetrics() {
  const metrics = {};

  try {
    // 页面加载时间
    const timing = performance?.timing;
    if (timing?.loadEventEnd && timing?.navigationStart) {
      metrics.loadTime = timing.loadEventEnd - timing.navigationStart;
    }

    // DNS解析时间
    if (timing?.domainLookupEnd && timing?.domainLookupStart) {
      metrics.dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
    }

    // TCP连接时间
    if (timing?.connectEnd && timing?.connectStart) {
      metrics.tcpTime = timing.connectEnd - timing.connectStart;
    }

    // DOM解析时间
    if (timing?.domComplete && timing?.domLoading) {
      metrics.domParseTime = timing.domComplete - timing.domLoading;
    }

    // 首次绘制时间
    const paintEntries = performance?.getEntriesByType?.("paint") || [];
    const [paint] = paintEntries;
    if (paint?.startTime) {
      metrics.firstPaintTime = paint.startTime;
    }

    // 首次内容绘制时间
    const [fcp] = paintEntries;
    if (fcp?.startTime) {
      metrics.firstContentfulPaint = fcp.startTime;
    }

    // 最大内容绘制时间
    const lcp =
      performance?.getEntriesByType?.("largest-contentful-paint") || [];
    if (lcp?.[0]?.startTime) {
      metrics.largestContentfulPaint = lcp[0].startTime;
    }
  } catch (error) {
    console.error("收集性能指标时发生错误:", error);
  }

  return metrics;
}
