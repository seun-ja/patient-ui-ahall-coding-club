import api from "./api";
import {
  Appointment,
  AppointmentCreated,
  AppointmentRequest,
} from "@/types/appointment";

export const getAppointments = async (): Promise<Appointment[]> => {
  const res = await api.get<Appointment[]>("/appointments");
  return res.data;
};

export const bookAppointments = async (
  appointment: AppointmentRequest,
): Promise<AppointmentCreated> => {
  const res = await api.post<AppointmentCreated>("/appointment", appointment);
  return res.data;
};
