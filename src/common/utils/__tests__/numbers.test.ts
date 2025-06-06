import { describe, expect, it } from 'vitest';

import { formatNumber, toNumberBetween } from 'common/utils/numbers';

describe('numbers', () => {
  describe('toNumberBetween', () => {
    it('should convert to number successfully', () => {
      // ARRANGE
      const value: string = '1';
      const result = toNumberBetween(value, 0, 2, 0);

      // ASSERT
      expect(result).toBe(1);
    });

    it('should convert boolean to number successfully', () => {
      // ARRANGE
      const falseValue: boolean = false;
      const trueValue: boolean = true;
      const falseResult = toNumberBetween(falseValue, 0, 2, 1);
      const trueResult = toNumberBetween(trueValue, 0, 2, 0);

      // ASSERT
      expect(falseResult).toBe(0);
      expect(trueResult).toBe(1);
    });

    it('should convert number to number successfully', () => {
      // ARRANGE
      const value: number = 1;
      const result = toNumberBetween(value, 0, 2, 0);

      // ASSERT
      expect(result).toBe(1);
    });

    it('should convert string to default', () => {
      // ARRANGE
      const value: string = 'a';
      const result = toNumberBetween(value, 0, 2, 0);

      // ASSERT
      expect(result).toBe(0);
    });

    it('should return min when number equal to min', () => {
      // ARRANGE
      const value: string = '10';
      const result = toNumberBetween(value, 10, 20, 15);

      // ASSERT
      expect(result).toBe(10);
    });

    it('should return default when number less than min', () => {
      // ARRANGE
      const value: string = '0';
      const result = toNumberBetween(value, 10, 20, 10);

      // ASSERT
      expect(result).toBe(10);
    });

    it('should return max when number equal to max', () => {
      // ARRANGE
      const value: string = '20';
      const result = toNumberBetween(value, 10, 20, 10);

      // ASSERT
      expect(result).toBe(20);
    });

    it('should return default when number greater than max', () => {
      // ARRANGE
      const value: string = '500';
      const result = toNumberBetween(value, 10, 20, 10);

      // ASSERT
      expect(result).toBe(10);
    });
  });

  describe('formatNumber', () => {
    it('should format number as integer', () => {
      const result = formatNumber(1000.0);

      expect(result).toBe('1,000');
    });

    it('should format number as decimal', () => {
      const result = formatNumber(1000.0, { maximumFractionDigits: 1, minimumFractionDigits: 1 });

      expect(result).toBe('1,000.0');
    });
  });
});
