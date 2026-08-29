/**
 * 清理準備寫入 Firestore 的物件，遞迴移除所有 `undefined` 欄位並將陣列中的 `undefined` 轉為 `null`，
 * 避免觸發 Firestore「Unsupported field value: undefined」錯誤。
 */
export function sanitizeForFirestore<T>(data: T): T {
  if (data === undefined) {
    return null as any;
  }
  if (data === null || typeof data !== 'object') {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map(item => (item === undefined ? null : sanitizeForFirestore(item))) as any;
  }
  if (data instanceof Date) {
    return data;
  }
  // 保留 Firestore 內部特殊 FieldValue（如 serverTimestamp()、deleteField()）
  if ((data as any)?._methodName || (data as any)?.constructor?.name === 'FieldValue') {
    return data;
  }

  const cleaned: Record<string, any> = {};
  for (const [key, val] of Object.entries(data)) {
    if (val !== undefined) {
      cleaned[key] = sanitizeForFirestore(val);
    }
  }
  return cleaned as T;
}
