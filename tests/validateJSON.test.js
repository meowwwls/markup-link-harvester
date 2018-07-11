import validateJSON from '../src/js/validator';

describe('validateJSON', () => {
  describe('given an empty string', () => {
    test('returns "Invalid JSON"', () => {
      expect(validateJSON('').validationMsg).toBe('Invalid JSON');
    });
  });

  describe('given an invalid JSON input', () => {
    test('returns "Invalid JSON"', () => {
      const testInput = `{country:"UnitedStates""capital":"Washington,DC","states":{},"one":12,"two":[],"one":12,"something":{}}`;

      expect(validateJSON(testInput).validationMsg).toBe('Invalid JSON');
      expect(validateJSON('{one: 1}').validationMsg).toBe('Invalid JSON');
      expect(validateJSON(`[{"two:" 'two'}]`).validationMsg).toBe(
        'Invalid JSON'
      );
      expect(validateJSON('{"prop": "val" "prop2:" "val2"').validationMsg).toBe(
        'Invalid JSON'
      );
    });

    test('returns an array of errors', () => {
      const testInput = `{"country":"UnitedStates""capital":"Washington,DC","states":{},"one":12,"two":[],"one":12,"something":{}}`;
      const { errors } = validateJSON(testInput);

      expect(errors).toContain('Valid JSON cannot have missing commas');
    });
  });

  describe('given a valid JSON input', () => {
    test('returns "Valid JSON"', () => {
      const testInput = `{"country":"UnitedStates","capital":"Washington,DC","states":{},"one":12,"two":[],"one":12,"something":{}}`;

      expect(validateJSON(testInput).validationMsg).toBe('Valid JSON');
      expect(validateJSON('[{"prop": "val"}]').validationMsg).toBe(
        'Valid JSON'
      );
      expect(
        validateJSON('[{"prop": "val1"}, {"prop2": "val2"}]').validationMsg
      ).toBe('Valid JSON');
    });

    test('returns an empty array', () => {
      const testInput = `{"capital":"Washington,DC","states":[],"one":12,"two":[],"one":12,"something":{}}`;
      const { errors } = validateJSON(testInput);

      expect(errors.length).toBe(0);
    });
  });
});
