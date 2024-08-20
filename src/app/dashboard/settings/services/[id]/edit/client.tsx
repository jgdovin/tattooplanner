"use client";
import { ServiceForm, formSchema } from "@/forms/serviceForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ClientProps {
  defaultValues?: z.infer<typeof formSchema>;
}

export default function Client({ defaultValues }: ClientProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (formData: z.infer<typeof formSchema>) => {
    if (!formData.id) throw new Error("No Service ID provided");
    const url = `/api/service/${formData.id}`;
    const response = fetch(url, {
      method: "PATCH",
      body: JSON.stringify(formData),
    });
    response
      .then((res) => {
        if (res.ok) {
          return;
        }
        res.json().then((data) => {
          console.error(data);
        });
      })
      .catch((err) => {
        console.log("ERROR", err);

        console.error(err);
      });
  };
  return (
    <div className="flex flex-col w-[800px] mt-5 ml-16">
      <div className="">
        <ServiceForm
          form={form}
          defaultValues={defaultValues}
          submitAction={handleSubmit}
        />
      </div>
    </div>
  );
}
