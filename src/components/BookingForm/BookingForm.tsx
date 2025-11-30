// src/components/BookingForm/BookingForm.tsx

"use client";

import React from "react";
import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// === COLORS AND CONSTANTS ===
const COLOR_PRIMARY = "#101828";
const COLOR_SECONDARY = "#8D929A";
const COLOR_BACKGROUND = "#F7F7F7";
const COLOR_BUTTON_PRIMARY = "#3470FF";
const COLOR_BORDER = "#DADDE1";
const COLOR_ERROR = "red";

// === CONTAINER AND HEADER STYLES ===

const BookingFormContainer = styled.div`
  width: 640px;
  height: 488px;
  border: 1px solid ${COLOR_BORDER};
  border-radius: 12px;
  padding: 32px;
`;

const FormHeader = styled.h2`
  width: 173px;
  font-family: Manrope;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${COLOR_PRIMARY};
  margin-bottom: 8px;
`;

const FormSubtext = styled.p`
  width: 576px;
  font-family: Manrope;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR_SECONDARY};
  margin-bottom: 24px;
`;

// === FORM AND INPUT STYLES ===

// 🔑 FIX: Removed gap: 16px from the form container
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  /* No gap here, inputs handle margin bottom */
`;

const FormFieldWrapper = styled.div<{ $marginBottom?: string }>`
  display: flex;
  flex-direction: column;
  gap: 4px; /* Space between input and error message */
  /* Apply 16px margin *after* the input/error group */
  margin-bottom: ${(props) => props.$marginBottom || "16px"};
`;

const InputBaseStyles = `
 width: 576px;
 border-radius: 12px;
 padding: 12px 20px;
 background-color: ${COLOR_BACKGROUND};
 border: 1px solid var(--border-color, transparent); 
 outline: none;
 transition: border-color 0.2s;
 font-family: Manrope;
 font-weight: 500;
 font-size: 16px;
 line-height: 20px;
 color: ${COLOR_SECONDARY};
 &::placeholder {
 color: ${COLOR_SECONDARY};
 }
`;

const StyledInput = styled(Field)<{ $hasError?: boolean }>`
  ${InputBaseStyles}
  height: 48px;
  border-color: ${(props) => (props.$hasError ? COLOR_ERROR : "transparent")};
`;

const CommentInput = styled(Field)<{ $hasError?: boolean }>`
  ${InputBaseStyles}
  height: 88px;
  resize: none;
  border-color: ${(props) => (props.$hasError ? COLOR_ERROR : "transparent")};
`;

// 🔑 FIX: Ensure button styles are correct (blue background) and handle margins
const SubmitButton = styled.button`
  width: 156px;
  height: 44px;
  /* Margin is now handled by the parent FormFieldWrapper */
  background-color: ${COLOR_BUTTON_PRIMARY};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 51px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover:not(:disabled) {
    background-color: #0b44b9;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessageText = styled(ErrorMessage)`
  color: ${COLOR_ERROR};
  font-size: 12px;
  font-weight: 500;
`;

// === YUP SCHEMA ===

interface BookingValues {
  name: string;
  email: string;
  date: string;
  comment: string;
}

const BookingSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum 2 letters required.")
    .matches(
      /^[a-zA-Zа-яА-ЯёЁіІўЎ\s]+$/,
      "Name can only contain letters and spaces."
    )
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required"),

  date: Yup.string().required("Booking date is required"),

  comment: Yup.string(),
});

// === MAIN COMPONENT ===

export const BookingForm: React.FC = () => {
  const initialValues: BookingValues = {
    name: "",
    email: "",
    date: "",
    comment: "",
  };

  const handleSubmission = async (
    values: BookingValues,
    { setSubmitting, resetForm }: FormikHelpers<BookingValues>
  ) => {
    setSubmitting(true);

    // Anti-blocking fix
    await new Promise((resolve) => setTimeout(resolve, 50));

    try {
      const orderInfo = `Name: ${values.name}, Email: ${values.email}, Date: ${values.date}`;
      toast.success(`Your order has been accepted! ${orderInfo}`, {
        position: "top-center",
        autoClose: 5000,
      });

      resetForm();
    } catch (_) {
      toast.error("Error submitting the order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <BookingFormContainer>
      <ToastContainer />
      {/* Header and Subtext as per design */}
      <FormHeader>Book your car now</FormHeader>
      <FormSubtext>
        Stay connected! We are always ready to help you.
      </FormSubtext>

      <Formik
        initialValues={initialValues}
        validationSchema={BookingSchema}
        onSubmit={handleSubmission}
      >
        {({ isSubmitting, errors, touched }) => (
          <StyledForm>
            {/* NAME (16px gap AFTER this block) */}
            <FormFieldWrapper>
              <StyledInput
                name="name"
                type="text"
                placeholder="Name*"
                as="input"
                $hasError={!!(errors.name && touched.name)}
                disabled={isSubmitting}
              />
              <ErrorMessageText name="name" component="div" />
            </FormFieldWrapper>

            {/* EMAIL (16px gap AFTER this block) */}
            <FormFieldWrapper>
              <StyledInput
                name="email"
                type="email"
                placeholder="Email*"
                as="input"
                $hasError={!!(errors.email && touched.email)}
                disabled={isSubmitting}
              />
              <ErrorMessageText name="email" component="div" />
            </FormFieldWrapper>

            <FormFieldWrapper>
              <StyledInput
                name="date"
                type="date"
                placeholder="Booking date*"
                as="input"
                $hasError={!!(errors.date && touched.date)}
                disabled={isSubmitting}
              />
              <ErrorMessageText name="date" component="div" />
            </FormFieldWrapper>

            <FormFieldWrapper $marginBottom="0">
              <CommentInput
                name="comment"
                placeholder="Comment"
                as="textarea"
                disabled={isSubmitting}
              />
            </FormFieldWrapper>

            <div style={{ marginTop: "24px" }}>
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send"}
              </SubmitButton>
            </div>
          </StyledForm>
        )}
      </Formik>
    </BookingFormContainer>
  );
};
