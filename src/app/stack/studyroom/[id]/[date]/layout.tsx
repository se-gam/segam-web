export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh flex-col justify-between">
      <div className="container h-full overflow-auto bg-app_bg">{children}</div>
    </div>
  );
}
