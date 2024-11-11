import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const createSurveyMutation = ({ client }: { client: QueryClient }) => {
  return useMutation({
    mutationFn: (newSurvey: { name: string; json: Object }) => {
      return axios.post("/api/surveys", newSurvey);
    },
    onSuccess: () => {
      toast.success("Survey created");
      client.invalidateQueries({ queryKey: ["surveys"] });
    },
  });
};

export const updateSurveyMutation = ({ id }: { id: string }) => {
  return useMutation({
    mutationFn: (body: { json: any }) => {
      return axios.put(`/api/surveys/${id}`, body);
    },
    onSuccess: () => {
      toast.success("Survey updated");
    },
    onError: () => {
      toast.error("Failed to update survey, Please contact support");
    },
  });
};

export const deleteSurveyQuery = ({ client }: { client: QueryClient }) => {
  return useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/api/surveys/${id}`);
    },
    onSuccess: () => {
      toast.success("Survey deleted");
      client.invalidateQueries({ queryKey: ["surveys"] });
    },
  });
};

export const getSurveysQuery = () => {
  return useQuery({
    queryKey: ["surveys"],
    queryFn: async () => {
      const res = await axios.get("/api/surveys");
      return res.data;
    },
  });
};

export const getSurveyQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["survey", id],
    queryFn: async () => {
      const res = await axios.get(`/api/surveys/${id}`);

      return res.data;
    },
  });
};
