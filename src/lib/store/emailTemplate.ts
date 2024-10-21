import {
  createTemplate,
  deleteTemplate,
  getTemplate,
  updateTemplate,
} from "@/lib/actions/emailTemplate";
import { formSchema } from "@/components/forms/emailTemplateForm";
import { atom } from "jotai";
import { toast } from "sonner";
import { z } from "zod";

const EMPTY_STRING = "";

export type EmailTemplateType = z.infer<typeof formSchema>;

export const EMPTY_TEMPLATE_DATA: EmailTemplateType = {
  id: EMPTY_STRING,
  name: EMPTY_STRING,
  subject: EMPTY_STRING,
  body: EMPTY_STRING,
  global: false,
};

export const templateAtom = atom<EmailTemplateType>(EMPTY_TEMPLATE_DATA);

export const templatesAtom = atom<EmailTemplateType[]>([]);

export const newTemplateAtom = atom<EmailTemplateType>(EMPTY_TEMPLATE_DATA);

export const fetchTemplateAtom = atom(
  (get) => get(templateAtom),
  async (_, set, templateId: string) => {
    if (!templateId) {
      set(templateAtom, EMPTY_TEMPLATE_DATA);
      return;
    }
    const res = await getTemplate(templateId);
    const data = (await res) as EmailTemplateType;
    set(templateAtom, data);
  }
);

const addTemplate = async (
  templates: EmailTemplateType[],
  template: EmailTemplateType
) => {
  return [...templates, template];
};

export const addTemplateAtom = atom(
  null,
  async (get, set, template: EmailTemplateType) => {
    const oldTemplates = get(templatesAtom);

    set(templatesAtom, await addTemplate(get(templatesAtom), template));
    const res = (await createTemplate(template)) as EmailTemplateType;

    if (!res.id) {
      toast.error("Template creation failed");
      set(templatesAtom, oldTemplates);
      return;
    }
    toast.success("Template created");
    const newTemplate = await res;

    set(templatesAtom, (templates) =>
      templates.map((l) => (l.id === "" ? newTemplate : l))
    );
  }
);

export const updateTemplateAtom = atom(
  null,
  async (get, set, template: EmailTemplateType) => {
    const oldTemplates = get(templatesAtom);

    set(templatesAtom, (templates) =>
      templates.map((l) => (l.id === template.id ? template : l))
    );

    const res = (await updateTemplate(template)) as EmailTemplateType;

    if (!res.id) {
      set(templatesAtom, oldTemplates);
      toast.error("Template update failed");
      return;
    }
    toast.success("Template updated");
  }
);

export const deleteTemplateAtom = atom(null, async (get, set, id: string) => {
  const templates = get(templatesAtom);
  let oldTemplate;
  const newTemplates = templates.filter((template) => {
    if (template.id === id) {
      oldTemplate = template;
      return false;
    }
    return true;
  });

  set(templatesAtom, newTemplates);
  const res = await deleteTemplate(id);

  if (!res?.ok && oldTemplate) {
    toast.error("Template failed to delete");
    set(templatesAtom, await addTemplate(get(templatesAtom), oldTemplate));
    return;
  }
  toast.success("Template deleted");
  return;
});
