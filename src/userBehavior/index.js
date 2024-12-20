import { trackClick } from "./click";

export function initBehaviorTracking(dataSetId) {
  const stopClickTracking = trackClick(dataSetId);

  return () => {
    stopClickTracking();
  };
}
