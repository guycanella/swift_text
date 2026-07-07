const SYNC_STORAGE_QUOTA_BYTES = 102_400;
const SYNC_STORAGE_WARNING_THRESHOLD_BYTES = 81_920;

export interface SyncStorageUsage {
  bytesInUse: number;
  quotaBytes: number;
  isNearLimit: boolean;
}

export async function getSyncStorageUsage(): Promise<SyncStorageUsage> {
  const bytesInUse = await browser.storage.sync.getBytesInUse();
  return {
    bytesInUse,
    quotaBytes: SYNC_STORAGE_QUOTA_BYTES,
    isNearLimit: bytesInUse >= SYNC_STORAGE_WARNING_THRESHOLD_BYTES,
  };
}
