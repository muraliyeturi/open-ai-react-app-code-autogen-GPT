import { createContext, useContext, useState, ReactNode } from 'react';

export interface FormData {
  // Step 1
  name: string;
  nationalId: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  // Step 2
  maritalStatus: string;
  dependents: string;
  employmentStatus: string;
  monthlyIncome: string;
  housingStatus: string;
  // Step 3
  currentFinancial: string;
  employmentCircumstances: string;
  reason: string;
  familySize: string;
}

const defaultData: FormData = {
  name: '',
  nationalId: '',
  dob: '',
  gender: '',
  address: '',
  city: '',
  state: '',
  country: '',
  phone: '',
  email: '',
  maritalStatus: '',
  dependents: '',
  employmentStatus: '',
  monthlyIncome: '',
  housingStatus: '',
  currentFinancial: '',
  employmentCircumstances: '',
  reason: '',
  familySize:'',
};

interface FormContextProps {
  data: FormData;
  setData: (data: FormData) => void;
  reset: () => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContext = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormContext must be used within FormProvider');
  return ctx;
};

const STORAGE_KEY = 'multiStepFormData';

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setDataState] = useState<FormData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultData;
  });

  const setData = (newData: FormData) => {
    setDataState(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const reset = () => {
    setDataState(defaultData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <FormContext.Provider value={{ data, setData, reset }}>
      {children}
    </FormContext.Provider>
  );
};
