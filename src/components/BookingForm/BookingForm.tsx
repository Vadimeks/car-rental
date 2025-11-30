// src/components/BookingForm/BookingForm.tsx

"use client";

import React from "react";
import styled from "styled-components";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FormikHelpers,
  FormikProps,
} from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const COLOR_ERROR = "red";

// === CONTAINER AND HEADER STYLES ===

const BookingFormContainer = styled.div`
  width: 640px;
  height: 488px;
  border: 1px solid var(--color-gray-light);
  border-radius: 12px;
  padding: 32px;
`;

const FormHeader = styled.h2`
  width: 173px;
  font-family: var(--font-family-main);
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: var(--color-main);
  margin-bottom: 8px;
`;

const FormSubtext = styled.p`
  width: 576px;
  font-family: var(--font-family-main);
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: var(--color-gray);
  margin-bottom: 24px;
`;

// === FORM AND INPUT STYLES ===

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const FormFieldWrapper = styled.div<{ $marginBottom?: string }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: ${(props) => props.$marginBottom || "16px"};
`;

const InputBaseStyles = `
 width: 576px;
 border-radius: 12px;
 padding: 12px 20px;
 background-color: var(--color-background-input); 
 border: 1px solid var(--border-color, transparent); 
 outline: none;
 transition: border-color 0.2s;
 
 font-family: var(--font-family-main);
 font-weight: 500;
 font-size: 16px;
 line-height: 20px;
 color: var(--color-main); 

 &::placeholder {
  color: var(--color-gray);
 }
 &:focus, &:not([value=""]) {
  color: var(--color-main);
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

const SubmitButton = styled.button`
  width: 156px;
  height: 44px;
  margin-top: 24px;
  background-color: var(--color-button-primary);
  color: var(--color-white);
  border: none;
  border-radius: 12px;
  padding: 12px 51px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover:not(:disabled) {
    background-color: var(--color-button-hover);
  }
  &:disabled {
    background-color: var(--color-gray);
    cursor: not-allowed;
  }
`;

const ErrorMessageText = styled(ErrorMessage)`
  color: ${COLOR_ERROR};
  font-size: 12px;
  font-weight: 500;
`;

// === YUP SCHEMA AND TYPES ===

interface BookingValues {
  name: string;
  email: string;
  date: string;
  comment: string;
}

const BookingSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum 2 letters required.")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces.")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required"),

  date: Yup.string().required("Booking date is required"),

  comment: Yup.string().nullable(),
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

    await new Promise((resolve) => setTimeout(resolve, 50));

    try {
      const orderInfo = `Name: ${values.name}, Email: ${values.email}, Date: ${values.date}`;
      toast.success(`Your order has been accepted! ${orderInfo}`, {
        position: "top-center",
        autoClose: 5000,
      });

      resetForm();
    } catch (_) {
      // Using English for toast messages
      toast.error("Error submitting the order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <BookingFormContainer>
      <ToastContainer />
      <FormHeader>Book your car now</FormHeader>
      <FormSubtext>
        Stay connected! We are always ready to help you.
      </FormSubtext>
      <Formik<BookingValues>
        initialValues={initialValues}
        validationSchema={BookingSchema}
        onSubmit={handleSubmission}
      >
        {({ isSubmitting, errors, touched }: FormikProps<BookingValues>) => (
          <StyledForm>
            {/* NAME */}
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
            {/* EMAIL */}
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
            {/* DATE */}
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
            {/* COMMENT */}
            <FormFieldWrapper $marginBottom="0">
              <CommentInput
                name="comment"
                placeholder="Comment"
                as="textarea"
                disabled={isSubmitting}
              />
            </FormFieldWrapper>
            {/* SUBMIT BUTTON */}
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send"}
            </SubmitButton>
          </StyledForm>
        )}
      </Formik>
    </BookingFormContainer>
  );
};
