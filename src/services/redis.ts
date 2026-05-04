import api from "./api"; // TODO: change to redis call

export const getSlots = async (
  doctorId: string,
  selectedDate: string,
): Promise<string[]> => {
  const res = await api.get<{ slots: string[] }>(
    `/dr/appointments/${doctorId}/availability?date=${selectedDate}`,
  );

  return res.data.slots;
};
