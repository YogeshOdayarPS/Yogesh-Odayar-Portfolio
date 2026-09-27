export const heroShapes = [
  { geometry: "icosahedron", position: [-2.6, 3.2, -2.5], size: 0.8, speed: 0.05, color: "#5b7fff", opacity: 0.3 },
  { geometry: "tetrahedron", position: [0.8, 3.6, -2], size: 0.5, speed: 0.07, color: "#5b7fff", opacity: 0.22 },
];

export const projectsShapes = [
  { geometry: "octahedron", position: [-5, 2.4, -3], size: 0.9, speed: 0.04, color: "#9b6bff", opacity: 0.18 },
  { geometry: "icosahedron", position: [5.2, -2.2, -3.5], size: 0.75, speed: 0.05, color: "#5b7fff", opacity: 0.18 },
];

// Contact shapes are placed at runtime (Contact.jsx) in the free space
// around the contact content, so they never sit over the text or cards.
// `place` lists preferred spots in order: a zone beside/above/below the
// content and where along it (0-1). The first spot the shape fits in wins.
export const contactShapes = [
  {
    geometry: "icosahedron", z: -2, size: 0.75, speed: 0.05, color: "#5b7fff", opacity: 0.28,
    place: [{ zone: "left", at: 0.3 }, { zone: "top", at: 0.14 }],
  },
  {
    geometry: "torus", z: -2.5, size: 0.65, speed: 0.06, color: "#9b6bff", opacity: 0.26,
    place: [{ zone: "right", at: 0.78 }, { zone: "bottom", at: 0.86 }],
  },
  {
    geometry: "tetrahedron", z: -3, size: 0.5, speed: 0.065, color: "#9b6bff", opacity: 0.2,
    place: [{ zone: "top", at: 0.5 }, { zone: "top", at: 0.86 }],
  },
];
