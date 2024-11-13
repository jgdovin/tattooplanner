import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";
import { ProjectType } from "@/features/projects/schemas/projects";

export const createProjectMutation = ({
  client,
  router,
}: {
  client: QueryClient;
  router: AppRouterInstance;
}) => {
  return useMutation({
    mutationFn: (newLocation: ProjectType) => {
      return axios.post("/api/projects", newLocation);
    },
    onSuccess: () => {
      toast.success("Project created");
      client.invalidateQueries({ queryKey: ["projects"] });
      router.push("/dashboard/projects");
    },
  });
};

export const getProjectsQuery = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axios.get("/api/projects");
      return res.data;
    },
  });
};
