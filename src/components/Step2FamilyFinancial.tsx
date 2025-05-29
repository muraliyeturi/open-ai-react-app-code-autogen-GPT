import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Grid } from '@mui/material';
import { useFormContext } from '../context/FormContext';
import { useTranslation } from 'react-i18next';

export default function Step2FamilyFinancial({ onNext, onBack, formStyleOverrides }: { onNext: () => void; onBack: () => void; formStyleOverrides?: any }) {
  const { t } = useTranslation();
  const { data, setData } = useFormContext();
  const { control, handleSubmit } = useForm({
    defaultValues: data,
    mode: 'onBlur',
  });

  const onSubmit = (values: any) => {
    setData({ ...data, ...values });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" aria-labelledby="step2-title">
      <Grid container spacing={2} role="group" aria-labelledby="step2-title">
        <Grid size={6}>
          <Controller
            name="familySize"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label={t('step2.familySize')} id="familySize" fullWidth required inputProps={{ 'aria-required': true }} {...(formStyleOverrides?.field || {})} />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="dependents"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label={t('step2.dependents')} id="dependents" fullWidth required inputProps={{ 'aria-required': true }} {...(formStyleOverrides?.field || {})} />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="housingStatus"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label={t('step2.housingStatus')} id="housingStatus" fullWidth required inputProps={{ 'aria-required': true }} {...(formStyleOverrides?.field || {})} />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="monthlyIncome"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label={t('step2.monthlyIncome')} id="monthlyIncome" fullWidth required inputProps={{ 'aria-required': true }} {...(formStyleOverrides?.field || {})} />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="maritalStatus"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label={t('step2.maritalStatus')} id="maritalStatus" fullWidth required inputProps={{ 'aria-required': true }} {...(formStyleOverrides?.field || {})} />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="employmentStatus"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label={t('step2.employmentStatus')} id="employmentStatus" fullWidth required inputProps={{ 'aria-required': true }} {...(formStyleOverrides?.field || {})} />
            )}
          />
        </Grid>
      </Grid>
      <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between' }}>
        <button type="button" onClick={onBack} {...(formStyleOverrides?.backButton || {})}>{t('actions.back')}</button>
        <button type="submit" {...(formStyleOverrides?.button || {})} aria-label={t('actions.next')}>{t('actions.next')}</button>
      </div>
    </form>
  );
}
