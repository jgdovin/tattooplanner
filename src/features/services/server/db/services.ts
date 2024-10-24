import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";
import { ServiceType } from "@/features/services/schemas/services";

export const useServiceQuery = (id?: string) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      if (!id) return {};
      const res = await axios.get(`/api/services/${id}`);
      return res.data;
    },
  });
};

export const getArtistServicesQuery = () => {
  return useQuery({
    queryKey: ["artistServices"],
    queryFn: async () => {
      const res = await axios.get("/api/services");
      return res.data;
    },
  });
};

export const updateServiceMutation = ({
  client,
  router,
}: {
  client: QueryClient;
  router: AppRouterInstance;
}) => {
  return useMutation({
    mutationFn: (service: ServiceType) => {
      return axios.put(`/api/services/${service.id}`, service);
    },
    onSuccess: () => {
      toast.success("Service updated");
      client.invalidateQueries({ queryKey: ["services"] });
      router.push("/dashboard/services");
    },
  });
};

export const deleteServiceMutation = ({ client }: { client: QueryClient }) => {
  return useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/api/services/${id}`);
    },
    onMutate: async (id) => {
      await client.cancelQueries({ queryKey: ["artistServices"] });
      const previousServices = client.getQueryData(["artistServices"]);
      client.setQueryData(["artistServices"], (old: any) => {
        return old.filter((location: any) => location.id !== id);
      });
      return { previousServices: previousServices };
    },
    onError: (_a, _b, context) => {
      toast.error("Error deleting service");
      client.setQueryData(["artistServices"], context?.previousServices);
    },
    onSuccess: () => {
      toast.success("Service deleted");
      client.invalidateQueries({ queryKey: ["artistServices"] });
    },
  });
};
