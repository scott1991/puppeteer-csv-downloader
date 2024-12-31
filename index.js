const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  // === 啟動瀏覽器 ===
  const browser = await puppeteer.launch({
    headless: 'new', // 設定 false 以方便調試
    args: [
      '--no-sandbox', // 禁用沙箱，防止權限問題
      '--disable-setuid-sandbox', // 禁用 setuid 沙箱
      '--disable-gpu', // 禁用 GPU，加速渲染
      '--disable-dev-shm-usage', // 避免 /dev/shm 空間不足問題
      '--disable-software-rasterizer', // 禁用軟體光柵器
      '--window-size=1920,1080' // 指定視窗大小
    ],
    defaultViewport: null // 防止 viewport 自動覆蓋 --window-size
  });

  const page = await browser.newPage();

  // 設定自定義視窗大小（雙保險）
  await page.setViewport({
    width: 1920,
    height: 1080
  });

  // === 設定下載路徑 ===
  const downloadPath = path.resolve('./downloaded_csv');
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath, { recursive: true });
  }

  const client = await page.target().createCDPSession();
  await client.send('Browser.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadPath
  });

  // === 訪問目標網址 ===
  console.log('🔗 訪問頁面...');
  await page.goto(
    'https://solscan.io/account/AaZkwhkiDStDcgrU37XAj9fpNLrD8Erz5PNkdm4k5hjy?flow=out&token_address=So11111111111111111111111111111111111111111#transfers',
    { waitUntil: 'networkidle2' }
  );

  // === 滾動到按鈕可見 ===
  console.log('🖱️ 滾動到按鈕位置...');
  await page.evaluate(() => {
    document
      .querySelector('#radix-\\:ri\\:-content-transfers > div > div > div > div > div.px-4.py-3.sm\\:py-4.sm\\:pb-3.bg-neutral0 > div.gap-1.flex-row.items-center.justify-between.flex-wrap.w-full.lg\\:flex.hidden > div.flex.gap-2.flex-row.items-center.justify-start.flex-nowrap > button > div')
      .scrollIntoView();
  });

  // === 點擊第一個按鈕 ===
  console.log('🖱️ 點擊第一個按鈕...');
  await page.waitForSelector(
    '#radix-\\:ri\\:-content-transfers > div > div > div > div > div.px-4.py-3.sm\\:py-4.sm\\:pb-3.bg-neutral0 > div.gap-1.flex-row.items-center.justify-between.flex-wrap.w-full.lg\\:flex.hidden > div.flex.gap-2.flex-row.items-center.justify-start.flex-nowrap > button > div',
    { visible: true }
  );
  await page.click(
    '#radix-\\:ri\\:-content-transfers > div > div > div > div > div.px-4.py-3.sm\\:py-4.sm\\:pb-3.bg-neutral0 > div.gap-1.flex-row.items-center.justify-between.flex-wrap.w-full.lg\\:flex.hidden > div.flex.gap-2.flex-row.items-center.justify-start.flex-nowrap > button > div'
  );

  // === 等待第二個按鈕出現並點擊 ===
  console.log('🖱️ 點擊第二個按鈕以觸發下載...');
  await page.waitForSelector(
    '#radix-\\:r11\\: > div.flex.flex-col-reverse.sm\\:flex-row.sm\\:justify-end.sm\\:space-x-2.py-4.px-6.gap-2 > button.whitespace-nowrap.ring-offset-background.focus-visible\\:outline-none.focus-visible\\:ring-2.disabled\\:pointer-events-none.rounded-lg.inline-flex.items-center.justify-center.font-bold.h-auto.transition-colors.text-white.bg-secondarySolana-800.hover\\:bg-secondarySolana-900.disabled\\:opacity-40.ring-transparent.ring-offset-0.focus-visible\\:ring-offset-0.focus-visible\\:ring-transparent.py-1\\.5.text-\\[12px\\].leading-4\\.5.px-3.gap-1',
    { visible: true }
  );
  await page.click(
    '#radix-\\:r11\\: > div.flex.flex-col-reverse.sm\\:flex-row.sm\\:justify-end.sm\\:space-x-2.py-4.px-6.gap-2 > button.whitespace-nowrap.ring-offset-background.focus-visible\\:outline-none.focus-visible\\:ring-2.disabled\\:pointer-events-none.rounded-lg.inline-flex.items-center.justify-center.font-bold.h-auto.transition-colors.text-white.bg-secondarySolana-800.hover\\:bg-secondarySolana-900.disabled\\:opacity-40.ring-transparent.ring-offset-0.focus-visible\\:ring-offset-0.focus-visible\\:ring-transparent.py-1\\.5.text-\\[12px\\].leading-4\\.5.px-3.gap-1'
  );

  // === 等待下載完成 ===
  console.log('📥 等待 CSV 下載完成...');
  await new Promise(resolve => setTimeout(resolve, 10000)); // 等待 10 秒

  console.log(`✅ CSV 已下載到資料夾: ${downloadPath}`);

  await browser.close();
})();

