"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ContentCard from "@/components/ContentCard";
import { PageWithBackButton } from "@/components/PageWithBackButton";
import {
  EMPTY_PROJECT_DATA,
  projectInputSchema,
  ProjectType,
} from "@/features/projects/schemas/projects";
import { createProjectMutation } from "@/features/projects/server/db/projects";
import { ProjectForm } from "@/features/projects/components/forms/ProjectForm";

export default function NewProjectPage() {
  const router = useRouter();
  const client = useQueryClient();
  const createProject = createProjectMutation({ client, router });

  const form = useForm<ProjectType>({
    resolver: zodResolver(projectInputSchema),
    defaultValues: EMPTY_PROJECT_DATA,
  });

  const submitAction = (submittedData: ProjectType) => {
    createProject.mutate({ ...submittedData });
  };

  return (
    <PageWithBackButton
      pageTitle="New Project"
      backButtonHref="/dashboard/projects"
    >
      <ContentCard>
        <ProjectForm form={form} submitAction={submitAction} />
      </ContentCard>
    </PageWithBackButton>
  );
}
