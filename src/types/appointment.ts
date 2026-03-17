export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  doctor_first_name: string;
  date: string;
  status: Status;
}

export interface AppointmentCreated {
  appointmentId: string;
  doctorFirstName: string;
  date: string;
  status: Status;
}

export interface AppointmentRequest {
  patient_id: string;
  date: string;
  preferred_doctor_first_name: string;
  preferred_doctor_id: string;
}

enum Status {
  Pending = "pending",
  OnGoing = "ongoing",
  Cancelled = "cancelled",
  NoShow = "noshow",
  Completed = "completed",
}
