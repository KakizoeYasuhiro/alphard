// src/lib/microcms.js
import { createClient } from 'microcms-js-sdk';

// サービスドメインとAPIキー
const serviceDomain = 'alphard';
const apiKey = '67vTrC9ycCKiTDwmAcBuOjwVnSMGe9pv9Ll4';

// microCMSクライアントを作成
export const client = createClient({
  serviceDomain,
  apiKey,
});