// 工具函数定义

// 生成唯一ID
export function generateUniqueId() {
  return `id-${Date.now()}-${Math.random().toString(16).substring(2)}`;
}

