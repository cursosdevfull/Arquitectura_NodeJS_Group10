import { ValidationError } from 'class-validator';

/**
 * Extrae todos los mensajes de error de los constraints de un ValidationError
 * de forma recursiva, incluyendo errores anidados en children
 *
 * @param errors - Array de ValidationError
 * @returns Array de strings con todos los mensajes de error
 *
 * @example
 * ```typescript
 * const errors = [
 *   {
 *     target: CourseCreateDto { title: undefined },
 *     value: undefined,
 *     property: 'title',
 *     children: [],
 *     constraints: {
 *       isString: 'title must be a string',
 *       isNotEmpty: 'title should not be empty'
 *     }
 *   }
 * ];
 *
 * const messages = getConstraintMessages(errors);
 * // Returns: ['title must be a string', 'title should not be empty']
 * ```
 *
 * @example Con errores anidados
 * ```typescript
 * const errors = [
 *   {
 *     property: 'address',
 *     children: [
 *       {
 *         property: 'street',
 *         constraints: { isNotEmpty: 'street should not be empty' }
 *       }
 *     ]
 *   }
 * ];
 *
 * const messages = getConstraintMessages(errors);
 * // Returns: ['street should not be empty']
 * ```
 */
export function getConstraintMessages(errors: ValidationError[]): string[] {
  const messages: string[] = [];

  for (const error of errors) {
    // Si el error tiene constraints, extraer sus valores
    if (error.constraints) {
      const constraintMessages = Object.values(error.constraints);
      messages.push(...constraintMessages);
    }

    // Si el error tiene children, procesar recursivamente
    if (error.children && error.children.length > 0) {
      const childMessages = getConstraintMessages(error.children);
      messages.push(...childMessages);
    }
  }

  return messages;
}
