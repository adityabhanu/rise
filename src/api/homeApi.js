import apiClient from "./apiClient";

export const getUpcomingEvents = () => {
  return apiClient.get("/api/upcoming-events");
};