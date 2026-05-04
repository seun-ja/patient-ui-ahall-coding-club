export interface Patient {
  id: string;
  name: string;
  email: string;
}

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  allergies: string[];
  emergency_contact: string;
}

export interface UpdateProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  allergies?: string[];
  emergency_contact?: string;
}
