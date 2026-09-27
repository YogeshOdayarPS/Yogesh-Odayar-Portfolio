import { useEffect, useState } from "react";

// True while the element is on (or near) screen. Used to pause WebGL render
// loops for canvases the visitor has scrolled away from - several always-on
// canvases rendering at 60fps off-screen is what made scrolling lag.
export default function useInViewport(ref, rootMargin = "200px") {
  // Without IntersectionObserver support, just keep rendering.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
