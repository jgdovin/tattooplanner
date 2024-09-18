import Client from "./client";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <main className="p-10 h-full">
      <Client id={id} />
    </main>
  );
}
