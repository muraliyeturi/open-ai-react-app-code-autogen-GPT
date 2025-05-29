import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../ProgressBar';
import {describe, expect, test, } from '@jest/globals';

describe('ProgressBar', () => {
  test('renders progress with correct step', () => {
    render(<ProgressBar current={2} total={3} />);
    expect(screen.getByText(/progress.step/i)).toBeDefined();
  });
});