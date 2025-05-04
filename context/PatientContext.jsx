// import { createContext, useContext } from "react";
// import { useAuth } from "./AuthContext";
// import { useQuery } from "react-query";
// import { getDoctorPatients } from "../api/actions";

// const PatientContext = createContext();

// export const usePatients = () => useContext(PatientContext);

// export const PatientProvider = ({ children }) => {
//   const { token } = useAuth();
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["patients", token?.doctor_id],
//     queryFn: () => getDoctorPatients(token.doctor_id),
//     // refetchInterval: 5000,
//     // keepPreviousData: true,
//     // enabled: !!token?.doctor_id,
//   });

//   return (
//     <PatientContext.Provider value={{ data, isLoading, error }}>
//       {children}
//     </PatientContext.Provider>
//   );
// };

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

const PatientContext = createContext();

export const usePatients = () => useContext(PatientContext);

export const PatientProvider = ({ children }) => {
  const { token } = useAuth();
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token?.doctor_id) return;

    // Reference to the Firestore collection
    const patientsRef = collection(db, "patients");
    const q = query(patientsRef, where("doctor_id", "==", token.doctor_id));

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const patientList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatients(patientList);
        setIsLoading(false);
      },
      (err) => {
        console.error("Error fetching patients:", err);
        setError(err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup on unmount
  }, [token?.doctor_id]);

  return (
    <PatientContext.Provider
      value={{
        data: { patients, total_patients: patients.length },
        isLoading,
        error,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
