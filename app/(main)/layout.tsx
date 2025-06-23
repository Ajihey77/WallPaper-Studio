export default function MainLayout({
  children,
  preview,
}: {
  children: React.ReactNode;
  preview: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="w-2/3 p-4">{children}</div>
      <div className="w-1/3 border-l p-4">{preview}</div>
    </div>
  );
}
