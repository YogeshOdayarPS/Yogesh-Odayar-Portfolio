import { lazy, Suspense } from "react";
import "./BackgroundField.css";

const Scene3D = lazy(() => import("./Scene3D"));

export default function BackgroundField() {
  return (
    <div className="bg-field" aria-hidden="true">
      <div className="bg-glow bg-glow-a" />
      <div className="bg-glow bg-glow-b" />
      <div className="bg-grid" />
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
    </div>
  );
}
