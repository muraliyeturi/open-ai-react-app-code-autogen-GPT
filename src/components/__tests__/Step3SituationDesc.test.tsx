import { render, screen, fireEvent } from '@testing-library/react';
import Step3SituationDesc from '../Step3SituationDesc';
import { FormProvider } from '../../context/FormContext';
import {describe, expect, test, } from '@jest/globals';

describe('Step3SituationDesc', () => {
  const onBack = jest.fn();
  const onSubmitFinal = jest.fn();

  function renderWithProvider() {
    return render(
      <FormProvider>
        <Step3SituationDesc onBack={onBack} onSubmitFinal={onSubmitFinal} />
      </FormProvider>
    );
  }

  test('renders all required fields', () => {
    renderWithProvider();
    expect(screen.getByLabelText(/step3.currentFinancial/i)).toBeDefined();
    expect(screen.getByLabelText(/step3.employmentCircumstances/i)).toBeDefined();
    expect(screen.getByLabelText(/step3.reason/i)).toBeDefined();
  });

//   test('calls onSubmitFinal when form is valid', async () => {
//     renderWithProvider();
//     fireEvent.change(screen.getByRole('textbox', {name:/step3.currentFinancial/i}), { target: { value: 'Stable' } });
//     fireEvent.change(screen.getByRole('textbox', {name:/step3.employmentCircumstances/i}), { target: { value: 'Employed' } });
//     fireEvent.change(screen.getByRole('textbox', {name:/step3.reason/i}), { target: { value: 'Need support' } });
//     fireEvent.click(screen.getByRole('button', { name: /actions.submit/i })); 
//     expect(onSubmitFinal).toHaveBeenCalled();
//   });

  test('calls onBack when back button is clicked', () => {
    renderWithProvider();
    fireEvent.click(screen.getByRole('button', { name: /actions.back/i }));
    expect(onBack).toHaveBeenCalled();
  });
});