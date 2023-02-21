import { type ChangeEventHandler, type ReactElement } from "react";

interface TextareaProps {
  rows: number;
  placeholder: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  value?: string | number | string[];
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

function Textarea({
  rows,
  placeholder,
  name,
  id,
  disabled,
  value,
  onChange,
}: TextareaProps): ReactElement {
  return (
    <fieldset className="form-group" disabled={disabled}>
      <textarea
        className="form-control"
        rows={rows}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
    </fieldset>
  );
}

export default Textarea;
