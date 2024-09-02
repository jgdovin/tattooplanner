export default async function Layout({
  children,
}: {
  children: React.ReactElement;
}) {
  return <div className="flex justify-center mt-10">{children}</div>;
}
