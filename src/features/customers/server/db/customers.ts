import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getCustomersQuery = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await axios.get("/api/customers");
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
