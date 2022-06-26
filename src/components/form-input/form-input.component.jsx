import { FormInputLabel, Input, Group } from "./form-input.styles.jsx";

const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input {...otherProps} />
            {
                label && (
                    //Dynamic value of className is used below.
                    <FormInputLabel shrink={otherProps.value.length}>
                        {label}
                    </FormInputLabel>
                )
            }
        </Group>
    );
};

export default FormInput;