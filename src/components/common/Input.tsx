import {
  type ChangeEventHandler,
  type HTMLInputTypeAttribute,
  type ReactElement,
} from "react";

interface InputProps {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  value?: string | number;
  name?: string;
  id?: string;
  disabled?: boolean;
  large?: boolean;
  defaultValue?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

function Input({
  type,
  placeholder,
  value,
  name,
  id,
  disabled,
  large = false,
  defaultValue,
  onChange,
}: InputProps): ReactElement {
  return (
    <fieldset className="form-group" disabled={disabled}>
      <input
        className={`form-control ${large ? "form-control-lg" : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        defaultValue={defaultValue}
      />
    </fieldset>
  );
}

export default Input;
