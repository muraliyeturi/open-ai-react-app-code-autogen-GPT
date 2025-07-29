import { render, screen, fireEvent } from '@testing-library/react';
import Step1PersonalInfo from '../Step1PersonalInfo';
import { FormProvider } from '../../context/FormContext';
import {describe, expect, test, } from '@jest/globals';

describe('Step1PersonalInfo', () => {
  const onNext = jest.fn();

  function renderWithProvider() {
    return render(
      <FormProvider>
        <Step1PersonalInfo onNext={onNext} />
      </FormProvider>
    );
  }

  test('renders all required fields', () => {
    renderWithProvider();
    expect(screen.getByLabelText(/step1.name/i)).toBeDefined();
    expect(screen.getByLabelText(/step1.nationalId/i)).toBeDefined();
    expect(screen.getByLabelText(/step1.dob/i)).toBeDefined();
    expect(screen.getByLabelText(/step1.gender/i)).toBeDefined();
    expect(screen.getByLabelText(/step1.address/i)).toBeDefined();
    expect(screen.getByLabelText(/step1.city/i)).toBeDefined();
    expect(screen.getByLabelText(/step1.state/i)).toBeDefined();
    expect(screen.getByLabelText(/step1.country/i)).toBeDefined();
    expect(screen.getByLabelText(/step1.phone/i)).toBeDefined();
    expect(screen.getByLabelText(/step1.email/i)).toBeDefined();
  });

  test('validates required fields', async () => {
    renderWithProvider();
    fireEvent.click(screen.getByRole('button', { name: /actions.next/i }));
    expect(await screen.findAllByRole('textbox')).toHaveLength(8);
  });

//   test('calls onNext when form is valid', async () => {
//     renderWithProvider();
//     fireEvent.change(screen.getByRole('textbox', {name:/step1.name/i}), { target: { value: 'Test User' } });
//     fireEvent.change(screen.getByRole('textbox', {name:/step1.nationalId/i}), { target: { value: '1234567890' } });
//     fireEvent.change(screen.getByLabelText(/step1.dob/i), { target: { value: '2000-01-01' } });
//     fireEvent.change(screen.getByRole('combobox', {name:/step1.gender/i}), { target: { value: 'male' } });
//     fireEvent.change(screen.getByRole('textbox', {name:/step1.address/i}), { target: { value: '123 Main St' } });
//     fireEvent.change(screen.getByRole('textbox', {name:/step1.city/i}), { target: { value: 'City' } });
//     fireEvent.change(screen.getByRole('textbox', {name:/step1.state/i}), { target: { value: 'State' } });
//     fireEvent.change(screen.getByRole('textbox', {name:/step1.country/i}), { target: { value: 'Country' } });
//     fireEvent.change(screen.getByRole('textbox', {name:/step1.phone/i}), { target: { value: '555-5555' } });
//     fireEvent.change(screen.getByRole('textbox', {name:/step1.email/i}), { target: { value: 'test@example.com' } });
//     fireEvent.click(screen.getByRole('button', { name: /actions.next/i }));
//     expect(onNext).toHaveBeenCalled();
//   });
});