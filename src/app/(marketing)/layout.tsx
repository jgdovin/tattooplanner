import { NavBar } from "./_components/NavBar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="selection:bg-[hsla(276,85%,52%,30%)]">
      <NavBar />
      {children}
    </div>
  );
}
