import { type ChangeEventHandler, type ReactElement } from "react";

interface TextareaProps {
  rows: number;
  placeholder: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  value?: string | number | string[];
  large?: boolean;
  defaultValue?: string | number | string[];
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

function Textarea({
  rows,
  placeholder,
  name,
  id,
  disabled,
  value,
  large = false,
  defaultValue,
  onChange,
}: TextareaProps): ReactElement {
  return (
    <fieldset className="form-group" disabled={disabled}>
      <textarea
        className={`form-control ${large ? "form-control-lg" : ""}`}
        rows={rows}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </fieldset>
  );
}

export default Textarea;
