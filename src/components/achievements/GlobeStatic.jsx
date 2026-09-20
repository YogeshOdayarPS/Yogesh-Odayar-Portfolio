const QUOTE = "My Goal is not to be better than anyone else, but to be better then I used to be";

export default function GlobeStatic({ className = "" }) {
  return (
    <div className={`globe-static ${className}`} aria-hidden="true">
      <span className="globe-static-quote">&ldquo;{QUOTE}&rdquo;</span>
    </div>
  );
}
