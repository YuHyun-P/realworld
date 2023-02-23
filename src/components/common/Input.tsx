import { type InputHTMLAttributes, type ReactElement } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  large?: boolean;
  disabled?: boolean;
}

function Input({
  large = false,
  disabled = false,
  ...rest
}: InputProps): ReactElement {
  return (
    <fieldset className="form-group" disabled={disabled}>
      <input
        className={`form-control ${large ? "form-control-lg" : ""}`}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </fieldset>
  );
}

export default Input;
