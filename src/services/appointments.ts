import api from "./api";
import {
  Appointment,
  AppointmentCreated,
  AppointmentRequest,
} from "@/types/appointment";

export const getAppointments = async (
  patient_id: string,
): Promise<Appointment[]> => {
  const res = await api.get<{ appointments: Appointment[] }>(
    `/appointments/${patient_id}`,
  );
  return res.data.appointments;
};

export const bookAppointments = async (
  appointment: AppointmentRequest,
): Promise<AppointmentCreated> => {
  const res = await api.post<AppointmentCreated>("/appointment", appointment);
  return res.data;
};
