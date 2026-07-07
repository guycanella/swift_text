import { z } from 'zod';

import { onValidatedMessage } from '@/lib/messaging';

const KEEP_ALIVE_ALARM_NAME = 'swifttext-keep-alive';

function registerKeepAliveAlarm() {
  browser.alarms.create(KEEP_ALIVE_ALARM_NAME, { periodInMinutes: 1 }).catch((error: unknown) => {
    console.error('[background] Failed to create keep-alive alarm', error);
  });
  browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === KEEP_ALIVE_ALARM_NAME) {
      console.debug('[background] keep-alive tick');
    }
  });
}

function registerMessageHandlers() {
  onValidatedMessage('ping', z.undefined(), () => 'pong');
}

export default defineBackground(() => {
  try {
    registerKeepAliveAlarm();
    registerMessageHandlers();
  } catch (error) {
    console.error('[background] Failed to initialize service worker', error);
  }
});
