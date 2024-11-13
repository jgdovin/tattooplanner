import { toast } from "sonner";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CustomerType } from "@/features/customers/schemas/customers";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const getCustomersQuery = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await axios.get("/api/customers");
      return res.data;
    },
  });
};

export const getCustomersForProjectListQuery = () => {
  return useQuery({
    queryKey: ["customers", { projectList: true }],
    queryFn: async () => {
      const res = await axios.get("/api/customers?projectList=true");
      return res.data;
    },
  });
};

export const getCustomerQuery = (id: string) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: async () => {
      const res = await axios.get(`/api/customers/${id}`);
      return res.data;
    },
  });
};

export const createCustomerMutation = ({
  client,
  router,
}: {
  client: QueryClient;
  router: AppRouterInstance;
}) => {
  return useMutation({
    mutationFn: (newCustomer: CustomerType) => {
      return axios.post("/api/customers", newCustomer);
    },
    onSuccess: () => {
      toast.success("Customer created");
      client.invalidateQueries({ queryKey: ["customers"] });
      router.push("/dashboard/customers");
    },
  });
};
