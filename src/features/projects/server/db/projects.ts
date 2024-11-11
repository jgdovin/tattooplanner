import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

export const createProjectMutation = ({
  client,
  router,
}: {
  client: QueryClient;
  router: AppRouterInstance;
}) => {
  return useMutation({
    mutationFn: (newLocation: LocationType) => {
      return axios.post("/api/location", newLocation);
    },
    onSuccess: () => {
      toast.success("Location created");
      client.invalidateQueries({ queryKey: ["artistLocations"] });
      router.push("/dashboard/locations");
    },
  });
};
