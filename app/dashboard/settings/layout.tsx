export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>④我是根 Settings layout</h1>
      {children}
    </div>
  );
}
