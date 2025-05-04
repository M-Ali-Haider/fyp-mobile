import axios from "axios";
const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

export const registerDoctor = async (username, password, expo_push_token) => {
  try {
    const response = await axios.post(`${backendUrl}/api/register_doctor`, {
      username: username.trim(),
      password: password.trim(),
      expo_push_token,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Login Failed");
    }
    throw error;
  }
};

// Get Doctor's Patients
export const getDoctorPatients = async (doctor_id) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/doctors/${doctor_id}/patients`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Login Failed");
    }
    throw error;
  }
};

export const getPatientById = async (patient_id) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/patients/${patient_id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Error fetching Patient data");
    }
    throw error;
  }
};

export const getImagesPatientById = async (patient_id) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/patients/${patient_id}/images`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (
        error.response?.data || new Error("Error fetching Patient Images data")
      );
    }
    throw error;
  }
};

export const getPrognosisById = async (patient_id) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/prognosis/${patient_id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (
        error.response?.data ||
        new Error("Error fetching Patient Prognosis data")
      );
    }
    throw error;
  }
};

export const getLLMReport = async (patient_id) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/prognosis_report/${patient_id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (
        error.response?.data ||
        new Error("Error fetching Patient Prognosis Report data")
      );
    }
    throw error;
  }
};

// Logout and clear expoPushToken from db
export const logoutDoctor = async (username, expo_push_token) => {
  try {
    const response = await axios.post(`${backendUrl}/api/doctors/logout`, {
      username,
      expo_push_token,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Login Failed");
    }
    throw error;
  }
};

// Change Username
export const changeUsername = async (new_username, doctor_id) => {
  try {
    const response = await axios.put(
      `${backendUrl}/api/doctors/${doctor_id}/change-username`,
      {
        new_username: new_username.trim(),
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Login Failed");
    }
    throw error;
  }
};

// Change Password
export const changePassword = async (old_password, new_password, doctor_id) => {
  try {
    const response = await axios.put(
      `${backendUrl}/api/doctors/${doctor_id}/change-password`,
      {
        old_password: old_password.trim(),
        new_password: new_password.trim(),
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Login Failed");
    }
    throw error;
  }
};

// Test Notification API
export const testNotification = async (patient_id) => {
  try {
    const response = await axios.post(`${backendUrl}/api/simulate_prediction`, {
      patient_id,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Login Failed");
    }
    throw error;
  }
};
