import LayoutClient from "./layoutClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <LayoutClient>{children}</LayoutClient>
    </div>
  );
}
