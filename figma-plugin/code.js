// Social Frames — Figma plugin main thread.
// Receives insert requests from the UI and creates a correctly sized frame
// at the viewport center.

figma.showUI(__html__, { width: 320, height: 480, themeColors: true });

function hexToRGB(hex) {
  const n = parseInt(hex.slice(1), 16);
  return {
    r: ((n >> 16) & 255) / 255,
    g: ((n >> 8) & 255) / 255,
    b: (n & 255) / 255,
  };
}

figma.ui.onmessage = (msg) => {
  if (msg.type !== 'insert-frame') return;

  const { platformName, label, width, height, brandColor } = msg;

  const frame = figma.createFrame();
  frame.name = `${platformName} / ${label} — ${width}×${height}`;
  frame.resize(width, height);
  frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  frame.strokes = [{ type: 'SOLID', color: hexToRGB(brandColor) }];
  frame.strokeWeight = Math.max(1, Math.round(width / 540));
  frame.strokeAlign = 'INSIDE';

  // Drop at viewport center
  frame.x = Math.round(figma.viewport.center.x - width / 2);
  frame.y = Math.round(figma.viewport.center.y - height / 2);

  figma.currentPage.appendChild(frame);
  figma.currentPage.selection = [frame];
  figma.viewport.scrollAndZoomIntoView([frame]);

  figma.notify(`Inserted ${platformName} ${label} (${width}×${height})`);
};
