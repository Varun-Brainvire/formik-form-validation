import { ErrorMessage, Field, FieldInputProps } from "formik";

interface Props {
  name?: string;
  setFieldValue?: any;
}

const options = ["Google", "Facebook", "Friends", "Newsletter", "Other"];

const ReferralSelect: React.FC<Props> = ({ name, setFieldValue }) => {
  return (
    <div>
      {options.map((option) => (
        <label key={option}>
          <Field type="radio" name={name} value={option} />
          {option}
        </label>
      ))}

      <Field name={`${name}`}>
        {({ field }: { field: FieldInputProps<string> }) =>
          field.value === "Other" ? (
            <input
              onChange={(e) => {
                // setFieldValue(name, e.target.value);
              }}
            />
          ) : null
        }
      </Field>

    </div>
  );
};

export default ReferralSelect;