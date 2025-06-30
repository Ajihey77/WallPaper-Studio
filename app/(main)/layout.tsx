export default function MainLayout({
  children,
  preview,
}: {
  children: React.ReactNode;
  preview: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="w-3/4">{children}</div>
      <div className="w-1/4 pl-4">{preview}</div>
    </div>
  );
}
