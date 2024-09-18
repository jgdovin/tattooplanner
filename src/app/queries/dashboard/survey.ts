import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const createSurveyQuery = ({ client }: { client: any }) => {
  return useMutation({
    mutationFn: (newSurvey: { name: string; json: any }) => {
      return axios.post("/api/survey", newSurvey);
    },
    onSuccess: () => {
      toast.success("Survey created");
      client.invalidateQueries({ queryKey: ["surveys"] });
    },
  });
};

export const updateSurveyQuery = ({ id }: { id: string }) => {
  return useMutation({
    mutationFn: (body: { json: any }) => {
      return axios.put(`/api/survey/${id}`, body);
    },
    onSuccess: () => {
      toast.success("Survey updated");
    },
    onError: () => {
      toast.error("Failed to update survey, Please contact support");
    },
  });
};

export const deleteSurveyQuery = ({ client }: { client: any }) => {
  return useMutation({
    mutationFn: (id: string) => {
      return axios.delete(`/api/survey/${id}`);
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
      const res = await axios.get("/api/survey");
      return res.data;
    },
  });
};

export const getSurveyQuery = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["survey", id],
    queryFn: async () => {
      const res = await axios.get(`/api/survey/${id}`);

      return res.data;
    },
  });
};
