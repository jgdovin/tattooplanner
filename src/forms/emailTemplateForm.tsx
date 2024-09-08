"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { IFrame } from "@/components/custom/iframe";
import { InputField } from "./components/inputField";

import { useDebounce } from "@uidotdev/usehooks";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import * as z from "zod";

interface EmailTemplateFormProps {
  submitAction: any;
  form: any;
  isEditing: boolean;
}

export const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  subject: z.string().min(3),
  body: z.string(),
  global: z.boolean(),
});

export function EmailTemplateForm({
  submitAction,
  form,
  isEditing,
}: EmailTemplateFormProps) {
  const formText = isEditing ? "Update" : "Create";
  const [loading, setLoading] = useState(true);
  const [templatePreview, setTemplatePreview] = useState("");
  const debouncedTemplatePreview = useDebounce(templatePreview, 500);
  const { theme } = useTheme();

  const { handleSubmit } = form;

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Card className="w-full max-w-full mx-auto">
      <CardHeader>
        <CardTitle>{formText} Email Template</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="emailTemplateForm"
            onSubmit={handleSubmit(submitAction)}
            className="grid grid-cols-2 gap-2"
          >
            <div className="grid col-span-2 gap-2">
              <div className="grid gap-2">
                <InputField
                  name="name"
                  form={form}
                  label="Name"
                  required={true}
                />
              </div>
              <div className="grid gap-2">
                <InputField name="subject" form={form} label="Subject" />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => {
                    return (
                      <div className="flex flex-row w-full">
                        <Editor
                          className="border border-input rounded-md bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          height="50vh"
                          theme={theme === "dark" ? "vs-dark" : "vs"}
                          options={{
                            minimap: {
                              enabled: false,
                            },
                          }}
                          onMount={() => {
                            setTemplatePreview(field.value);
                          }}
                          onChange={(value) => {
                            field.onChange(value);
                            setTemplatePreview(value || "");
                          }}
                          defaultLanguage="html"
                          defaultValue={field.value}
                        />
                        <IFrame>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: debouncedTemplatePreview,
                            }}
                          />
                        </IFrame>
                      </div>
                    );
                  }}
                ></FormField>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button form="emailTemplateForm" type="submit" disabled={loading}>
          {formText} Email Template
        </Button>
      </CardFooter>
    </Card>
  );
}
