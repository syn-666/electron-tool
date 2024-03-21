const { screen } = require("electron");

const windowWidth = 414; // 窗口宽度
const windowHeight = 896; // 窗口高度

const getActivityDisplay = () => {
  const displays = screen.getAllDisplays();
  let activeDisplay;
  // 找到激活屏幕
  displays.forEach((display) => {
    if (display.bounds.x <= screen.getCursorScreenPoint().x && screen.getCursorScreenPoint().x <= display.bounds.x + display.bounds.width &&
        display.bounds.y <= screen.getCursorScreenPoint().y && screen.getCursorScreenPoint().y <= display.bounds.y + display.bounds.height) {
        activeDisplay = display;
    }
  });

  return activeDisplay

}

const getAppBoundsInfo = () => {
  const activeDisplay = getActivityDisplay()
  // 将窗口移动到激活屏幕的右上角
  const { x, y, width } = activeDisplay.workArea;
  const newX = x + width - windowWidth;
  const newY = y;
  return {windowWidth, windowHeight, newX, newY}
}

module.exports = { getAppBoundsInfo }