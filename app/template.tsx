export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="template">
      <h1>②我是 Template</h1>
      {children}
    </div>
  );
}
