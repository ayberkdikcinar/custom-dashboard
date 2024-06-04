import type { LayoutCoordinates } from '../types/types';

function locateNext(lg: LayoutCoordinates[]): LayoutCoordinates {
  let maxValY = 0;
  let h = 0;
  const values = Object.values(lg);
  values.map((val, index) => {
    if (val.y > maxValY) {
      maxValY = val.y;
      h = val.h;
    }
  });
  return { i: '', x: 0, y: maxValY + h, w: 3, h: 3 };
}

export { locateNext };
