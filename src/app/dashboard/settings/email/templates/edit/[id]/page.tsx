import { getTemplate } from "@/actions/emailTemplate";
import Client from "./client";
import MyError from "./myError";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const template = await getTemplate(id);
  if (!template) return redirect("/404");

  return (
    <main className="p-10 h-full">
      <Client template={template} />
    </main>
  );
}
