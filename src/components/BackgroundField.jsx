import "./BackgroundField.css";

export default function BackgroundField() {
  return (
    <div className="bg-field" aria-hidden="true">
      <div className="bg-glow bg-glow-a" />
      <div className="bg-glow bg-glow-b" />
      <div className="bg-grid" />
    </div>
  );
}
