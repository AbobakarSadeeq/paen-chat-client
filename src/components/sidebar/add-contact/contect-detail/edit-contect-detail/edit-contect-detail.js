import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import EditContectDetailCss from "./edit-contect-detail.module.css";
import { Dialog } from "primereact/dialog";
import { useContext } from "react";
import LoggedInContext from "../../../../../context/loggedIn/loggedIn";
import ContactContext from "../../../../../context/contact-context/contact-context";

const EditContectModel = (props) => {
  const contextApi = useContext(LoggedInContext);
  const contactContext = useContext(ContactContext);
  const formik = useFormik({
    initialValues: {
      firstName: props.SelectedContactData.firstName,
      lastName: props.SelectedContactData.lastName,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Please write the firstName"),

      lastName: Yup.string()
        .max(15, "Must be 15 characters or less") // if max then show this error
        .required("Please write the lastName"), // if only clicked or invalid then this message will be shown
    }),
    onSubmit: (value, { resetForm }) => {
      resetForm();
      // props.refreshMyContect();
      props.hideDialog();
      axios
        .put("https://localhost:44389/api/Contact/EditContact", {
          ...value,
          contactId: props.SelectedContactData.contactId,
        })
        .then(
          (response) => {

            const updatingContactName = {
              firstName: value.firstName,
              lastName: value.lastName,
              contactId: props.SelectedContactData.contactId
            }

      contactContext.setUpdatingUserContactProfile(updatingContactName);

            props.editContactName(value.firstName + " " + value.lastName);
            contextApi.updatedContactNameVal(
              value.firstName + " " + value.lastName
            );
          },
          (error) => {
            console.log(error);
          }
        );
    },
  });

  return (
    <>
      <Dialog
        header="Edit Contact"
        visible={true}
        onHide={props.hideDialog}
        className={EditContectDetailCss["add-contact-model"]}
        contentStyle={{ backgroundColor: "#2c3638" }}
        headerStyle={{ backgroundColor: "#2c3638", color: "#8a98ac" }}
      >
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            className={EditContectDetailCss["input"]}
            placeholder="FirstName"
            name="firstName"
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className={EditContectDetailCss["validation-error"]}>
              {formik.errors.firstName}
            </div>
          ) : null}
          <input
            type="text"
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            className={EditContectDetailCss["input"]}
            placeholder="LastName"
            name="lastName"
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className={EditContectDetailCss["validation-error"]}>
              {formik.errors.lastName}
            </div>
          ) : null}

          <div style={{ backgroundColor: "#2c3638", float: "right" }}>
            <button
              disabled={!(formik.isValid && formik.dirty)} // it will be enable when all inputs is valid
              type="submit"
              className={
                !(formik.isValid && formik.dirty)
                  ? EditContectDetailCss["add-contact-btn-disable"]
                  : EditContectDetailCss["add-contact-btn"]
              }
            >
              Edit &nbsp;&nbsp;
              <FontAwesomeIcon icon={faUserPlus} />
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default EditContectModel;
