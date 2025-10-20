import React from "react";
import "./FormName.css";

export const FormName = ({
  firstNameName = "firstname",
  lastNameName = "lastname",
  firstPlaceholder = "Voornaam",
  lastPlaceholder = "Achternaam",
  className = "win98-input",
  required = false,
  idPrefix,
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
        />
        <input
          id={lastId}
          name={lastNameName}
          type="text"
          className={className}
          placeholder={lastPlaceholder}
          required={required}
        />
      </div>
    </div>
  );
};

export default FormName;
