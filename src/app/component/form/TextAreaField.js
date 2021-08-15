import React from 'react'
import { useField, splitFormProps } from 'react-form'

function TextAreaField(props) {
  const [field, fieldOptions, rest] = splitFormProps(props)

  const {
    value = "",
    setValue,
    meta: { error, isTouched, isValidating }
  } = useField(field, fieldOptions)

  const handleTextChange = e => {
    setValue(e.target.value)
  }

  return (
    <>
      <textarea {...rest} value={value} onChange={handleTextChange}></textarea>{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  )
}

export default TextAreaField
