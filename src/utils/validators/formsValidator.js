export const requiredField = value => value ? undefined : 'Required';
export const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined);

