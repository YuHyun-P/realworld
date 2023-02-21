import {
  type ChangeEventHandler,
  type HTMLInputTypeAttribute,
  type ReactElement,
} from "react";

interface InputProps {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  id?: string;
  disabled?: boolean;
  large?: boolean;
}

function Input({
  type,
  placeholder,
  value,
  onChange,
  name,
  id,
  disabled,
  large = false,
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
      />
    </fieldset>
  );
}

export default Input;
