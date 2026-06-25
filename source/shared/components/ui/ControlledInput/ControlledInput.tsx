import React from 'react';
import { Controller, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { Input, InputProps } from '../Input';

export interface ControlledInputProps<TFieldValues extends FieldValues>
  extends Omit<InputProps, 'value' | 'onChangeText'> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues, any>;
  rules?: Omit<RegisterOptions<TFieldValues, Path<TFieldValues>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
}

export function ControlledInput<TFieldValues extends FieldValues>({
  name,
  control,
  rules,
  ...inputProps
}: ControlledInputProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Input
          {...inputProps}
          onBlur={(e) => {
            onBlur();
            inputProps.onBlur?.(e);
          }}
          onChangeText={onChange}
          value={value as string}
          error={error?.message} 
        />
      )}
    />
  );
}
