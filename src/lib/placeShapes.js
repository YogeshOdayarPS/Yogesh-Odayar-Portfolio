// Places decorative Scene3D shapes in the empty space around a content box,
// so they never overlap it. Works in the canvas' pixel space, then converts
// to world units for Scene3D's camera (z = 8, fov 50).

const CAMERA_Z = 8;
const HALF_FOV_TAN = Math.tan((50 * Math.PI) / 360);
const MAX_FLOAT = 0.2; // Scene3D's default vertical bob, in world units
const PAD = 8; // px kept clear between a shape and the content / canvas edge
const MIN_RADIUS = 12; // px - smaller than this and the shape is skipped

// Bounding radius of each geometry as a multiple of its `size`, plus ~15%
// for perspective (the near side of a rotating shape looks bigger).
const EXTENT = { icosahedron: 1, octahedron: 1, tetrahedron: 1, torus: 1.35 };
const PERSPECTIVE = 1.15;

// width/height: canvas size. box: content rect {left, top, right, bottom}
// in the same pixel space (already including any margin).
export default function placeShapes(shapes, width, height, box) {
  const zones = {
    left: { x0: 0, x1: box.left, y0: 0, y1: height, vertical: true },
    right: { x0: box.right, x1: width, y0: 0, y1: height, vertical: true },
    top: { x0: 0, x1: width, y0: 0, y1: box.top, vertical: false },
    bottom: { x0: 0, x1: width, y0: box.bottom, y1: height, vertical: false },
  };

  const placed = [];
  for (const { place, z, size, geometry, ...rest } of shapes) {
    const worldPerPx = (2 * HALF_FOV_TAN * (CAMERA_Z - z)) / height;
    const extent = (EXTENT[geometry] ?? 1) * PERSPECTIVE;
    const naturalR = (size * extent) / worldPerPx;
    const maxFloatPx = MAX_FLOAT / worldPerPx;

    // Try every preferred spot and keep the one with the most room
    // (earlier spots win ties).
    let best = null;
    for (const { zone: name, at } of place) {
      const zone = zones[name];
      const halfW = (zone.x1 - zone.x0) / 2 - PAD;
      const halfH = (zone.y1 - zone.y0) / 2 - PAD;
      if (halfW <= 0 || halfH <= 0) continue;

      // Largest radius that fits, leaving room for the vertical bob.
      const rough = Math.min(naturalR, halfW, halfH / 1.3);
      const floatPx = Math.min(maxFloatPx, 0.3 * rough);
      const r = Math.min(naturalR, halfW, halfH - floatPx);
      if (r < MIN_RADIUS || (best && r <= best.r)) continue;

      const reach = r + floatPx + PAD;
      let cx;
      let cy;
      if (zone.vertical) {
        cx = (zone.x0 + zone.x1) / 2;
        cy = box.top + at * (box.bottom - box.top);
        cy = Math.min(Math.max(cy, reach), height - reach);
      } else {
        cy = (zone.y0 + zone.y1) / 2;
        cx = Math.min(Math.max(at * width, r + PAD), width - r - PAD);
      }
      best = { r, floatPx, cx, cy };
    }

    if (best) {
      placed.push({
        ...rest,
        geometry,
        size: (best.r / extent) * worldPerPx,
        float: best.floatPx * worldPerPx,
        position: [(best.cx - width / 2) * worldPerPx, (height / 2 - best.cy) * worldPerPx, z],
      });
    }
  }
  return placed;
}
