import { LocationType } from "@/forms/locationForm";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

export const getArtistLocationsQuery = () => {
  return useQuery({
    queryKey: ["artistLocations"],
    queryFn: async () => {
      const res = await axios.get("/api/artist/location");
      return res.data;
    },
  });
};

export const useLocationQuery = (id?: string) => {
  return useQuery({
    queryKey: ["location", id],
    queryFn: async () => {
      if (!id) return {};
      const res = await axios.get(`/api/artist/location/${id}`);
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
      console.log("test");
      return axios.post("/api/artist/location", newLocation);
    },
    onSuccess: () => {
      toast.success("Location created");
      client.invalidateQueries({ queryKey: ["artistLocations"] });
      router.push("/dashboard/settings/locations");
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
      return axios.put(`/api/artist/location/${location.id}`, location);
    },
    onSuccess: () => {
      toast.success("Location updated");
      client.invalidateQueries({ queryKey: ["artistLocations"] });
      router.push("/dashboard/settings/locations");
    },
  });
};

export const deleteLocationMutation = ({ client }: { client: QueryClient }) => {
  return useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/api/artist/location/${id}`);
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