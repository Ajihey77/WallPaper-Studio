export default function MainLayout({
  children,
  preview,
}: {
  children: React.ReactNode;
  preview: React.ReactNode;
}) {
  return (
    <>
      {children}
      {preview}
    </>
  );
}
