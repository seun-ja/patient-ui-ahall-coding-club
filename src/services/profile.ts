import api from "./api";
import type { Profile, UpdateProfile } from "../types/patient";

export const getProfile = async (patient_id: string): Promise<Profile> => {
  const res = await api.get<Profile>(`/profile/${patient_id}`);
  return res.data;
};

export const updateProfile = async (profile: UpdateProfile): Promise<void> => {
  const res = await api.post("/profile", profile);
  return res.data;
};
