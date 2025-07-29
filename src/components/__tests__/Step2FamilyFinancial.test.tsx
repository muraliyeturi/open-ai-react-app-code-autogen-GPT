import { render, screen, fireEvent } from '@testing-library/react';
import Step2FamilyFinancial from '../Step2FamilyFinancial';
import { FormProvider } from '../../context/FormContext';
import {describe, expect, test, } from '@jest/globals';

describe('Step2FamilyFinancial', () => {
  const onNext = jest.fn();
  const onBack = jest.fn();

  function renderWithProvider() {
    return render(
      <FormProvider>
        <Step2FamilyFinancial onNext={onNext} onBack={onBack} />
      </FormProvider>
    );
  }

  test('renders all required fields', () => {
    renderWithProvider();
    expect(screen.getByLabelText(/step2.dependents/i)).toBeDefined();
    expect(screen.getByLabelText(/step2.monthlyIncome/i)).toBeDefined();
    expect(screen.getByLabelText(/step2.familySize/i)).toBeDefined();
    expect(screen.getByLabelText(/step2.housingStatus/i)).toBeDefined();
    expect(screen.getByLabelText(/step2.employmentStatus/i)).toBeDefined();
    expect(screen.getByLabelText(/step2.maritalStatus/i)).toBeDefined();
  });

//   test('calls onNext when form is valid', async () => {
//     renderWithProvider();
//     fireEvent.change(screen.getByRole('textbox', {name:/step2.dependents/i}), { target: { value: '2' } });
//     fireEvent.change(screen.getByRole('textbox', {name:/step2.monthlyIncome/i}), { target: { value: '5000' } });
// fireEvent.change(screen.getByRole('textbox', {name:/step2.income/i}), { target: { value: '5000' } });
// fireEvent.change(screen.getByRole('textbox', {name:/step2.familySize/i}), { target: { value: '5' } });
//     fireEvent.click(screen.getByRole('button', { name: /actions.next/i }));
//     expect(onNext).toHaveBeenCalled();
//   });

  test('calls onBack when back button is clicked', () => {
    renderWithProvider();
    fireEvent.click(screen.getByRole('button', { name: /actions.back/i }));
    expect(onBack).toHaveBeenCalled();
  });
});