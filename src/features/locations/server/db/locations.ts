import { LocationType } from "@/features/locations/schemas/locations";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

export const getArtistLocationsQuery = () => {
  return useQuery({
    queryKey: ["artistLocations"],
    queryFn: async () => {
      const res = await axios.get("/api/locations");
      return res.data;
    },
  });
};

export const getLocationsQuery = (id?: string) => {
  return useQuery({
    queryKey: ["location", id],
    queryFn: async () => {
      if (!id) return {};
      const res = await axios.get(`/api/locations/${id}`);
      return res.data;
    },
  });
};

export const createLocationMutation = ({
  client,
  router,
}: {
  client: QueryClient;
  router: AppRouterInstance;
}) => {
  return useMutation({
    mutationFn: (newLocation: LocationType) => {
      return axios.post("/api/locations", newLocation);
    },
    onSuccess: () => {
      toast.success("Location created");
      client.invalidateQueries({ queryKey: ["artistLocations"] });
      router.push("/dashboard/locations");
    },
  });
};

export const updateLocationMutation = ({
  client,
  router,
}: {
  client: QueryClient;
  router: AppRouterInstance;
}) => {
  return useMutation({
    mutationFn: (location: LocationType) => {
      return axios.put(`/api/locations/${location.id}`, location);
    },
    onSuccess: () => {
      toast.success("Location updated");
      client.invalidateQueries({ queryKey: ["artistLocations"] });
      router.push("/dashboard/locations");
    },
  });
};

export const deleteLocationMutation = ({ client }: { client: QueryClient }) => {
  return useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/api/locations/${id}`);
    },
    onMutate: async (id) => {
      await client.cancelQueries({ queryKey: ["artistLocations"] });
      const previousLocations = client.getQueryData(["artistLocations"]);
      client.setQueryData(["artistLocations"], (old: any) => {
        return old.filter((location: any) => location.id !== id);
      });
      return { previousLocations };
    },
    onError: (_a, _b, context) => {
      toast.error("Error deleting location");
      client.setQueryData(["artistLocations"], context?.previousLocations);
    },
    onSuccess: () => {
      toast.success("Location deleted");
      client.invalidateQueries({ queryKey: ["artistLocations"] });
    },
  });
};
