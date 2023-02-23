import { type TextareaHTMLAttributes, type ReactElement } from "react";

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  large?: boolean;
  disabled?: boolean;
}

function Textarea({
  large = false,
  disabled = false,
  ...rest
}: TextareaProps): ReactElement {
  return (
    <fieldset className="form-group" disabled={disabled}>
      <textarea
        className={`form-control ${large ? "form-control-lg" : ""}`}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </fieldset>
  );
}

export default Textarea;
