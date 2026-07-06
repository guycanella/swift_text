export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    console.log('SwiftText content script loaded');
  },
});
