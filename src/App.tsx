import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import Step1PersonalInfo from './components/Step1PersonalInfo';
import Step2FamilyFinancial from './components/Step2FamilyFinancial';
import Step3SituationDesc from './components/Step3SituationDesc';
import ProgressBar from './components/ProgressBar';
import Header from './components/Header';
import './i18n';
import { useTranslation } from 'react-i18next';
import { Container, Paper, Typography } from '@mui/material';

const TOTAL_STEPS = 3;

function Wizard() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);
  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return <Typography variant="h5" align="center" sx={{ mt: 4 }}>{t('success')}</Typography>;
  }

  return (
    <Paper sx={{
      p: { xs: 2, sm: 4 },
      mt: 4,
      borderRadius: 4,
      boxShadow: 3,
      maxWidth: 600,
      mx: 'auto',
      backgroundColor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
    }}>
      <ProgressBar current={step} total={TOTAL_STEPS} />
      {step === 1 && <Step1PersonalInfo onNext={handleNext} formStyleOverrides={{
        field: {
          sx: { mb: 2, backgroundColor: 'background.default', borderRadius: 2 },
        },
        button: {
          style: { minWidth: 120, borderRadius: 8, boxShadow: '0 2px 8px #0001', marginTop: 16 },
          className: 'MuiButton-contained MuiButton-containedPrimary',
        },
      }} />}
      {step === 2 && <Step2FamilyFinancial onNext={handleNext} onBack={handleBack} formStyleOverrides={{
        field: {
          sx: { mb: 2, backgroundColor: 'background.default', borderRadius: 2 },
        },
        button: {
          style: { minWidth: 120, borderRadius: 8, boxShadow: '0 2px 8px #0001', marginTop: 16 },
          className: 'MuiButton-contained MuiButton-containedPrimary',
        },
        backButton: {
          style: { minWidth: 120, borderRadius: 8, marginTop: 16 },
          className: 'MuiButton-outlined MuiButton-outlinedSecondary',
        },
      }} />}
      {step === 3 && <Step3SituationDesc onBack={handleBack} onSubmitFinal={handleSubmit} formStyleOverrides={{
        field: {
          sx: { mb: 2, backgroundColor: 'background.default', borderRadius: 2 },
        },
        button: {
          style: { minWidth: 120, borderRadius: 8, boxShadow: '0 2px 8px #0001', marginTop: 16 },
          className: 'MuiButton-contained MuiButton-containedPrimary',
        },
        backButton: {
          style: { minWidth: 120, borderRadius: 8, marginTop: 16 },
          className: 'MuiButton-outlined MuiButton-outlinedSecondary',
        },
      }} />}
    </Paper>
  );
}

function App() {
  return (
    <FormProvider>
      <Router>
        <Header />
        <Container maxWidth="md">
          <Routes>
            <Route path="/" element={<Wizard />} />
          </Routes>
        </Container>
      </Router>
    </FormProvider>
  );
}

export default App;
