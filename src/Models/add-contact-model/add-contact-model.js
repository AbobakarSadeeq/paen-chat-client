import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import AddContactCss from "./add-contact-model.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import useInput from "../../hooks/form-control";
import { useFormik } from "formik";
import * as Yup from "yup";
const AddContactModel = (props) => {
  function hideDialogOfModel() {
    props.hideDialog();
  }

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Please write the firstName"),

      lastName: Yup.string()
        .max(15, "Must be 15 characters or less") // if max then show this error
        .required("Please write the lastName"), // if only clicked or invalid then this message will be shown

      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits") // used for pattern like angular
        .min(10, "Must be exactly 10 digits")
        .max(11, "Must be exactly 11 digits")
        .required("Please write the phone number"),
    }),
    onSubmit: (value, { resetForm }) => {
      console.log(value);
      resetForm();
    },
  });

  const employeeFormik = useFormik({
    initialValues: {
      inputNames: "",
      inputNames2: "",
      inputNames3: "",
    },
    validationSchema: Yup.object({
      inputNames: Yup.string(),
      inputNames2: Yup.string(),
      inputNames3: Yup.string(),
    }),
    onSubmit: (formInputValuesObj, { resetForm }) => {
      console.log(formInputValuesObj.inputNames); // also give the validation to you of the inputs
      console.log(formInputValuesObj.inputNames2);
      console.log(formInputValuesObj.inputNames3);

      resetForm();
    },
  });

  return (
    <>
      <Dialog
        header="Add Contact"
        visible={true}
        style={{ width: "20vw" }}
        onHide={hideDialogOfModel}
        className={AddContactCss["add-contact-model"]}
        contentStyle={{ backgroundColor: "#2c3638" }}
        headerStyle={{ backgroundColor: "#2c3638", color: "#8a98ac" }}
      >
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            className={AddContactCss["input"]}
            placeholder="FirstName"
            name="firstName"
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className={AddContactCss["validation-error"]}>
              {formik.errors.firstName}
            </div>
          ) : null}
          <input
            type="text"
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            className={AddContactCss["input"]}
            placeholder="LastName"
            name="lastName"
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className={AddContactCss["validation-error"]}>
              {formik.errors.lastName}
            </div>
          ) : null}
          <input
            type="number"
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            className={AddContactCss["search-input"]}
            placeholder="PhoneNumber"
            name="phoneNumber"
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className={AddContactCss["validation-error"]}>
              {formik.errors.phoneNumber}
            </div>
          ) : null}

          <div style={{ backgroundColor: "#2c3638", float: "right" }}>
            <button
              disabled={!(formik.isValid && formik.dirty)} // it will be enable when all inputs is valid
              type="submit"
              className={
                !(formik.isValid && formik.dirty)
                  ? AddContactCss["add-contact-btn-disable"]
                  : AddContactCss["add-contact-btn"]
              }
            >
              Add &nbsp;&nbsp;
              <FontAwesomeIcon icon={faUserPlus} />
            </button>
          </div>
        </form>

        {/* <form onSubmit={employeeFormik.handleSubmit}>
          <input
            type="text"
            onBlur={employeeFormik.handleBlur}
            value={employeeFormik.values.inputNames}
            onChange={employeeFormik.handleChange}
            className={AddContactCss["input"]}
            placeholder="inputNames"
            name="inputNames"
          />
          {employeeFormik.touched.inputNames &&
          employeeFormik.errors.inputNames ? (
            <div className={AddContactCss["validation-error"]}>
              {employeeFormik.errors.firstName}
            </div>
          ) : null}
          <input
            type="text"
            onBlur={employeeFormik.handleBlur}
            value={employeeFormik.values.inputNames2}
            onChange={employeeFormik.handleChange}
            className={AddContactCss["input"]}
            placeholder="inputNames2"
            name="inputNames2"
          />
          {employeeFormik.touched.lastName && employeeFormik.errors.lastName ? (
            <div className={AddContactCss["validation-error"]}>
              {employeeFormik.errors.lastName}
            </div>
          ) : null}
          <input
            type="number"
            onBlur={employeeFormik.values.inputNames3.handleBlur}
            value={employeeFormik.values.phoneNumber}
            onChange={employeeFormik.handleChange}
            className={AddContactCss["search-input"]}
            placeholder="PhoneNumber"
            name="phoneNumber"
          />
          {employeeFormik.touched.inputNames3 &&
          employeeFormik.errors.inputNames3 ? (
            <div className={AddContactCss["validation-error"]}>
              {formik.errors.inputNames3}
            </div>
          ) : null}

          <div style={{ backgroundColor: "#2c3638", float: "right" }}>
            <button
              disabled={!(employeeFormik.isValid && employeeFormik.dirty)} // it will be enable when all inputs is valid
              type="submit"
              className={
                !(employeeFormik.isValid && employeeFormik.dirty)
                  ? AddContactCss["add-contact-btn-disable"]
                  : AddContactCss["add-contact-btn"]
              }
            >
              Add &nbsp;&nbsp;
              <FontAwesomeIcon icon={faUserPlus} />
            </button>
          </div>
        </form> */}
      </Dialog>
    </>
  );
};

export default AddContactModel;
