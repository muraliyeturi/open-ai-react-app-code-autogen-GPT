import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Grid, MenuItem } from '@mui/material';
import { useFormContext } from '../context/FormContext';
import { useTranslation } from 'react-i18next';

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

/**
 * Step 1: Personal Information form step.
 * Collects user's personal details (name, ID, DOB, gender, address, etc.).
 * Uses React Hook Form for validation and Context API for state.
 * @param onNext - Callback to go to the next step
 * @param formStyleOverrides - Optional style overrides for fields/buttons
 */
export default function Step1PersonalInfo({ onNext, formStyleOverrides }: { onNext: () => void; formStyleOverrides?: any }) {
  const { t } = useTranslation();
  const { data, setData } = useFormContext();
  const { control, handleSubmit } = useForm({
    defaultValues: data,
    mode: 'onBlur',
  });

  /**
   * Handles form submission: saves data to context and advances to next step.
   * @param values - Form values from React Hook Form
   */
  const onSubmit = (values: any) => {
    setData({ ...data, ...values });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" aria-labelledby="step1-title">
      <Grid container spacing={2} role="group" aria-labelledby="step1-title">
        <Grid size={6}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label={t('step1.name')} id="name" fullWidth required inputProps={{ 'aria-required': true }} {...(formStyleOverrides?.field || {})} />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="nationalId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label={t('step1.nationalId')} id="nationalId" fullWidth required inputProps={{ 'aria-required': true }} {...(formStyleOverrides?.field || {})} />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="dob"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label={t('step1.dob')} id="dob" type="date" InputLabelProps={{ shrink: true }} fullWidth required inputProps={{ 'aria-required': true }} {...(formStyleOverrides?.field || {})} />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="gender"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label={t('step1.gender')} id="gender" select fullWidth required inputProps={{ 'aria-required': true }} {...(formStyleOverrides?.field || {})}>
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value} aria-label={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label={t('step1.address')} id="address" fullWidth required inputProps={{ 'aria-required': true }} {...(formStyleOverrides?.field || {})} />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="city"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label={t('step1.city')} id="city" fullWidth required inputProps={{ 'aria-required': true }} {...(formStyleOverrides?.field || {})} />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="state"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label={t('step1.state')} id="state" fullWidth required inputProps={{ 'aria-required': true }} {...(formStyleOverrides?.field || {})} />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="country"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label={t('step1.country')} id="country" fullWidth required inputProps={{ 'aria-required': true }} {...(formStyleOverrides?.field || {})} />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="phone"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} label={t('step1.phone')} id="phone" fullWidth required inputProps={{ 'aria-required': true }} {...(formStyleOverrides?.field || {})} />
            )}
          />
        </Grid>
        
        <Grid size={6}>
          <Controller
            name="email"
            control={control}
            rules={{ required: true, pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/ }}
            render={({ field }) => (
              <TextField {...field} label={t('step1.email')} id="email" fullWidth required type="email" inputProps={{ 'aria-required': true }} {...(formStyleOverrides?.field || {})} />
            )}
          />
        </Grid>
      </Grid>
      <div style={{ marginTop: 24, textAlign: 'right' }}>
        <button type="submit" {...(formStyleOverrides?.button || {})} aria-label={t('actions.next')}>{t('actions.next')}</button>
      </div>
    </form>
  );
}
