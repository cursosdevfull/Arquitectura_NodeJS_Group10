import { ValidationError } from 'class-validator';
import { getConstraintMessages } from './validation-errors.util';

describe('getConstraintMessages', () => {
  it('should extract messages from a single error with constraints', () => {
    const errors: ValidationError[] = [
      {
        target: { title: undefined },
        value: undefined,
        property: 'title',
        children: [],
        constraints: {
          isString: 'title must be a string',
          isNotEmpty: 'title should not be empty',
        },
      },
    ];

    const result = getConstraintMessages(errors);

    expect(result).toEqual([
      'title must be a string',
      'title should not be empty',
    ]);
  });

  it('should extract messages from multiple errors', () => {
    const errors: ValidationError[] = [
      {
        target: {},
        value: undefined,
        property: 'title',
        children: [],
        constraints: {
          isNotEmpty: 'title should not be empty',
        },
      },
      {
        target: {},
        value: 'invalid',
        property: 'email',
        children: [],
        constraints: {
          isEmail: 'email must be a valid email',
        },
      },
    ];

    const result = getConstraintMessages(errors);

    expect(result).toEqual([
      'title should not be empty',
      'email must be a valid email',
    ]);
  });

  it('should extract messages from nested errors in children', () => {
    const errors: ValidationError[] = [
      {
        target: {},
        value: {},
        property: 'address',
        children: [
          {
            target: {},
            value: undefined,
            property: 'street',
            children: [],
            constraints: {
              isNotEmpty: 'street should not be empty',
            },
          },
          {
            target: {},
            value: undefined,
            property: 'city',
            children: [],
            constraints: {
              isNotEmpty: 'city should not be empty',
            },
          },
        ],
        constraints: undefined,
      },
    ];

    const result = getConstraintMessages(errors);

    expect(result).toEqual([
      'street should not be empty',
      'city should not be empty',
    ]);
  });

  it('should extract messages from deeply nested errors', () => {
    const errors: ValidationError[] = [
      {
        target: {},
        value: {},
        property: 'user',
        children: [
          {
            target: {},
            value: {},
            property: 'profile',
            children: [
              {
                target: {},
                value: undefined,
                property: 'age',
                children: [],
                constraints: {
                  isNumber: 'age must be a number',
                  min: 'age must be at least 18',
                },
              },
            ],
            constraints: undefined,
          },
        ],
        constraints: undefined,
      },
    ];

    const result = getConstraintMessages(errors);

    expect(result).toEqual(['age must be a number', 'age must be at least 18']);
  });

  it('should handle errors with both constraints and children', () => {
    const errors: ValidationError[] = [
      {
        target: {},
        value: {},
        property: 'parent',
        children: [
          {
            target: {},
            value: undefined,
            property: 'child',
            children: [],
            constraints: {
              isNotEmpty: 'child should not be empty',
            },
          },
        ],
        constraints: {
          isObject: 'parent must be an object',
        },
      },
    ];

    const result = getConstraintMessages(errors);

    expect(result).toEqual([
      'parent must be an object',
      'child should not be empty',
    ]);
  });

  it('should return empty array when no errors', () => {
    const errors: ValidationError[] = [];

    const result = getConstraintMessages(errors);

    expect(result).toEqual([]);
  });

  it('should return empty array when errors have no constraints', () => {
    const errors: ValidationError[] = [
      {
        target: {},
        value: undefined,
        property: 'field',
        children: [],
        constraints: undefined,
      },
    ];

    const result = getConstraintMessages(errors);

    expect(result).toEqual([]);
  });
});
