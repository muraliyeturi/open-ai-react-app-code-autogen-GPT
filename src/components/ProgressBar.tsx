import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ProgressBarProps {
  current: number;
  total: number;
}

/**
 * ProgressBar component for multi-step wizard.
 * Shows current step and progress using Material UI LinearProgress.
 * @param current - Current step number
 * @param total - Total number of steps
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const { t } = useTranslation();
  const percent = (current / total) * 100;
  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        {t('progress.step', { current, total })}
      </Typography>
      <LinearProgress 
        variant="determinate" 
        value={percent} 
        aria-label={t('progress.step', { current, total })}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      />
    </Box>
  );
};

export default ProgressBar;
