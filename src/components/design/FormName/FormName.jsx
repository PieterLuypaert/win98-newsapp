import React from "react";
import "./FormName.css";
import PropTypes from "prop-types";

export const FormName = ({
  firstNameName = "firstname",
  lastNameName = "lastname",
  firstPlaceholder = "Voornaam",
  lastPlaceholder = "Achternaam",
  className = "win98-input",
  required = false,
  idPrefix,
  firstFieldProps = {}, 
  lastFieldProps = {}, 
}) => {
  const firstId = idPrefix ? `${idPrefix}-firstname` : `${firstNameName}-id`;
  const lastId = idPrefix ? `${idPrefix}-lastname` : `${lastNameName}-id`;

  return (
    <div className="form-row form-name">
      <label className="form-label" htmlFor={firstId}>
        Naam:
      </label>
      <div className="form-name-fields">
        <input
          id={firstId}
          name={firstNameName}
          type="text"
          className={className}
          placeholder={firstPlaceholder}
          required={required}
          {...firstFieldProps}
        />
        <input
          id={lastId}
          name={lastNameName}
          type="text"
          className={className}
          placeholder={lastPlaceholder}
          required={required}
          {...lastFieldProps}
        />
      </div>
    </div>
  );
};

FormName.propTypes = {
  firstNameName: PropTypes.string,
  lastNameName: PropTypes.string,
  firstPlaceholder: PropTypes.string,
  lastPlaceholder: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  idPrefix: PropTypes.string,
  firstFieldProps: PropTypes.object,
  lastFieldProps: PropTypes.object,
};

export default FormName;
