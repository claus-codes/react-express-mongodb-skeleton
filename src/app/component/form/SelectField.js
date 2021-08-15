import React from 'react'
import { useField, splitFormProps } from 'react-form'

function SelectField(props) {
  const [field, fieldOptions, { options, ...rest }] = splitFormProps(props)

  const {
    value = "",
    setValue,
    meta: { error, isTouched, isValidating }
  } = useField(field, fieldOptions)

  const handleSelectChange = e => {
    setValue(e.target.value)
  }

  return (
    <>
      <select {...rest} value={value} onChange={handleSelectChange}>
        <option disabled value="" />
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </select>{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  )
}

export default SelectField
