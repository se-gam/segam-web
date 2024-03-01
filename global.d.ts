declare global {
  interface Window {
    ReactNativeWebView: any;
  }
}

export default ReactNativeWebView = window.ReactNativeWebView;
