import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Alert, Tabs, Tab, Box, Grid, Select, MenuItem, InputLabel } from '@mui/material';
import { useFormContext } from '../context/FormContext';
import type { FormData } from '../context/FormContext';
import { useTranslation } from 'react-i18next';

const helpPrompts: Record<keyof Pick<FormData, 'currentFinancial' | 'employmentCircumstances' | 'reason'>, string> = {
  currentFinancial: 'Describe your current financial situation.',
  employmentCircumstances: 'Describe your employment circumstances.',
  reason: 'Describe your reason for applying.',
};

/**
 * Calls backend API to get OpenAI suggestions for a field.
 * @param field - The field to get suggestions for
 * @returns Promise<string> - AI suggestion JSON string
 */
async function fetchOpenAISuggestion(field: keyof typeof helpPrompts): Promise<string> {
  // Call backend API
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch('http://localhost:4000/api/ai-suggestion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error('AI backend error');
    const data = await res.json();
    return data.suggestion || '';
  } catch (e: any) {
    if (e.name === 'AbortError') throw new Error('Request timed out');
    throw e;
  }
}

/**
 * Step 3: Situation Description form step.
 * Allows user to describe their financial situation, employment, and reason for applying.
 * Integrates with AI backend for language-specific suggestions.
 * @param onBack - Callback for back navigation
 * @param onSubmitFinal - Callback for final form submission
 * @param formStyleOverrides - Optional style overrides for fields/buttons
 */
export default function Step3SituationDesc({ onBack, onSubmitFinal, formStyleOverrides }: { onBack: () => void; onSubmitFinal: () => void; formStyleOverrides?: any }) {
  const { t } = useTranslation();
  const { data, setData } = useFormContext();
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: data as any,
    mode: 'onBlur',
  });
  const [selectedTab, setSelectedTab] = useState<keyof typeof helpPrompts>('currentFinancial');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Partial<Record<keyof typeof helpPrompts, string>>>({});
  const [apiOptions, setApiOptions] = useState<any[]>([]);
  const [selectedValues, setSelectedValues] = useState<{ [K in keyof typeof helpPrompts]: string[] }>({
    currentFinancial: [],
    employmentCircumstances: [],
    reason: [],
  });

  // Fetch and parse API suggestions as array
  /**
   * Fetches AI suggestions for a given field, parses the response, and updates state.
   * @param field - The field to get suggestions for
   */
  const fetchAndSetSuggestion = async (field: keyof typeof helpPrompts) => {
    setLoading(true);
    setError(null);
    try {
      const suggestion = await fetchOpenAISuggestion(field);
      
      // Try to parse as JSON array, fallback to string
      let parsed: any[] = [];
      try {
        const respObj = JSON.stringify(suggestion);
        const json = JSON.parse(JSON.parse(respObj));
        
        if (Array.isArray(json.response)) {
          parsed = json.response;
        }
      } catch {
        // fallback: treat as single string
        parsed = [];
      }
      setApiOptions(parsed);
      setSuggestions(prev => ({ ...prev, [field]: suggestion }));
    } catch (e: any) {
      setError(e.message || 'Failed to fetch suggestion');
      setApiOptions([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles dialog open, resets state, and fetches suggestions for the selected tab.
   */
  const onHelpClick = () => {
    setDialogOpen(true);
    setSuggestion('');
    setError(null);
    setSuggestions({});
    fetchAndSetSuggestion(selectedTab);
  };


  /**
   * Handles dialog accept: applies selected AI suggestions to form fields.
   * Joins selected values for each field and updates the form state.
   */
  const handleAccept = () => {
    // Assign selected values to form fields (join as string)
    (Object.keys(helpPrompts) as (keyof typeof helpPrompts)[]).forEach(field => {
      if (selectedValues[field]?.length) setValue(field, selectedValues[field].join(', '));
    });
    setDialogOpen(false);
    setSuggestion('');
    setSuggestions({});
    setApiOptions([]);
    setSelectedValues({ currentFinancial: [], employmentCircumstances: [], reason: [] });
  };

  /**
   * Handles dialog discard: closes dialog and resets state for all AI suggestion fields.
   */
  const handleDiscard = () => {
    setDialogOpen(false);
    setSuggestion('');
    setSuggestions({});
    setApiOptions([]);
    setSelectedValues({ currentFinancial: [], employmentCircumstances: [], reason: [] });
  };

  /**
   * Handles form submit: saves data to context and triggers the final submit callback.
   * @param values - The form values from React Hook Form
   */
  const onSubmit = (values: FormData) => {
    setData({ ...data, ...values });
    onSubmitFinal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Controller
            name="currentFinancial"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div style={{ position: 'relative' }}>
                <TextField {...field} label={t('step3.currentFinancial')} fullWidth required multiline rows={2}
                  sx={{ mb: 2, backgroundColor: 'background.default', borderRadius: 2, ...formStyleOverrides?.field }}
                  InputProps={{ style: { paddingRight: 120 } }}
                />
              </div>
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="employmentCircumstances"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div style={{ position: 'relative' }}>
                <TextField {...field} label={t('step3.employmentCircumstances')} fullWidth required multiline rows={2}
                  sx={{ mb: 2, backgroundColor: 'background.default', borderRadius: 2, ...formStyleOverrides?.field }}
                  InputProps={{ style: { paddingRight: 120 } }}
                />
              </div>
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="reason"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div style={{ position: 'relative' }}>
                <TextField {...field} label={t('step3.reason')} fullWidth required multiline rows={2}
                  sx={{ mb: 2, backgroundColor: 'background.default', borderRadius: 2, ...formStyleOverrides?.field }}
                  InputProps={{ style: { paddingRight: 120 } }}
                />
              </div>
            )}
          />
        </Grid>
      </Grid>

       <Button size="small" variant="outlined" onClick={onHelpClick}>
        {t('step3.helpMeWrite')}
      </Button>
        
      <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between' }}>
        <button type="button" onClick={onBack} {...(formStyleOverrides?.backButton || {})}>{t('actions.back')}</button>
        <button type="submit" {...(formStyleOverrides?.button || {})}>{t('actions.submit')}</button>
      </div>
      <Dialog open={dialogOpen} onClose={handleDiscard} aria-labelledby="help-dialog-title" fullWidth maxWidth="sm">
        <DialogTitle id="help-dialog-title">{t('step3.aiSuggestion')}</DialogTitle>
        <DialogContent aria-labelledby="ai-suggestion-fields">
          
          {loading && <Box display="flex" justifyContent="center" alignItems="center" minHeight={80}><CircularProgress aria-label={t('loading')} /></Box>}
          {error && <Alert severity="error" role="alert">{t(error === 'Request timed out' ? 'timeout' : 'error')}</Alert>}
          {!loading && !error && apiOptions.length > 0 && (
            <>
              <Box mb={2}>
                <label htmlFor="currentFinancial-select" style={{ marginBottom: 8, display: 'block' }}>{t('step3.currentFinancial')}</label>
                <Select
                  
                  fullWidth
                  id="currentFinancial-select"
                  value={selectedValues.currentFinancial}
                  onChange={e => {
                    const value = typeof e.target.value === 'string' ? [e.target.value] : e.target.value;
                    setSelectedValues(prev => ({ ...prev, currentFinancial: value }));
                  }}
                  renderValue={selected => (selected as string[]).join(', ')}
                  label={t('step3.currentFinancial')}
                  sx={{ mb: 2 }}
                  inputProps={{ 'aria-label': t('step3.currentFinancial'), 'aria-required': true }}
                >
                  {apiOptions.map((option, idx) => (
                    option.currentFinancial && <MenuItem key={idx} value={option.currentFinancial} aria-label={option.currentFinancial}>{option.currentFinancial}</MenuItem>
                  ))}
                </Select>
              </Box>
              <Box mb={2}>
                <label htmlFor="employmentCircumstances-select" style={{ marginBottom: 8, display: 'block' }}>{t('step3.employmentCircumstances')}</label>
                <Select
                  
                  fullWidth
                  id="employmentCircumstances-select"
                  value={selectedValues.employmentCircumstances}
                  onChange={e => {
                    const value = typeof e.target.value === 'string' ? [e.target.value] : e.target.value;
                    setSelectedValues(prev => ({ ...prev, employmentCircumstances: value }));
                  }}
                  renderValue={selected => (selected as string[]).join(', ')}
                  label={t('step3.employmentCircumstances')}
                  sx={{ mb: 2 }}
                  inputProps={{ 'aria-label': t('step3.employmentCircumstances'), 'aria-required': true }}
                >
                  {apiOptions.map((option, idx) => (
                    option.employmentCircumstances && <MenuItem key={idx} value={option.employmentCircumstances} aria-label={option.employmentCircumstances}>{option.employmentCircumstances}</MenuItem>
                  ))}
                </Select>
              </Box>
              <Box mb={2}>
                <label htmlFor="reason-select" style={{ marginBottom: 8, display: 'block' }}>{t('step3.reason')}</label>
                <Select
                  
                  fullWidth
                  id="reason-select"
                  value={selectedValues.reason}
                  onChange={e => {
                    const value = typeof e.target.value === 'string' ? [e.target.value] : e.target.value;
                    setSelectedValues(prev => ({ ...prev, reason: value }));
                  }}
                  renderValue={selected => (selected as string[]).join(', ')}
                  label={t('step3.reason')}
                  sx={{ mb: 2 }}
                  inputProps={{ 'aria-label': t('step3.reason'), 'aria-required': true }}
                >
                  {apiOptions.map((option, idx) => (
                    option.reason && <MenuItem key={idx} value={option.reason} aria-label={option.reason}>{option.reason}</MenuItem>
                  ))}
                </Select>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDiscard} color="secondary" aria-label={t('discard')}>{t('discard')}</Button>
          <Button onClick={handleAccept} color="primary" disabled={loading || !!error} aria-label={t('accept')}>{t('accept')}</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
