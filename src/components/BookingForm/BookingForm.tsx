// src/components/BookingForm/BookingForm.tsx

"use client";

import React, { useState } from "react";
import styled from "styled-components";

const COLOR_PRIMARY = "#101828";
const COLOR_SECONDARY = "#8D929A";
const COLOR_BACKGROUND = "#F7F7F7";
const COLOR_BUTTON_PRIMARY = "#3470FF";
const COLOR_BORDER = "#DADDE1";

const BookingFormContainer = styled.div`
  width: 640px;
  height: 488px; /* Вышыня формы 640x488 */
  border: 1px solid ${COLOR_BORDER}; /* Рамка */
  border-radius: 12px;
  padding: 32px; /* Унутраны падынг 32px */
`;

const FormHeader = styled.h2`
  font-family: Manrope;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${COLOR_PRIMARY};
  margin-bottom: 8px; /* 8px ніжэй */
  width: 173px;
`;

const FormSubtext = styled.p`
  font-family: Manrope;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR_SECONDARY};
  width: 576px;
  margin-bottom: 24px; /* 24px ніжэй */
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px; /* Паміж інпутамі 16px */
`;

const StyledInput = styled.input`
  width: 576px;
  height: 48px;
  border-radius: 12px;
  padding: 12px 20px;
  background-color: ${COLOR_BACKGROUND};
  border: none;

  font-family: Manrope;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR_SECONDARY};

  &::placeholder {
    color: ${COLOR_SECONDARY};
  }
`;

const CommentInput = styled.textarea`
  width: 576px;
  height: 88px; /* Павялічаная вышыня 88px */
  border-radius: 12px;
  padding: 12px 20px;
  background-color: ${COLOR_BACKGROUND};
  border: none;
  resize: none;

  font-family: Manrope;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR_SECONDARY};

  &::placeholder {
    color: ${COLOR_SECONDARY};
  }
`;

const SubmitButton = styled.button`
  width: 156px;
  height: 44px;
  margin-top: 24px; /* 24px ад апошняга інпута */

  background-color: ${COLOR_BUTTON_PRIMARY};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 51px;

  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: #0b44b9;
  }
`;

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Замова адпраўлена:", formData);
    alert("Ваша замова прынята!");
  };

  return (
    <BookingFormContainer>
      <FormHeader>Book your car now</FormHeader>
      <FormSubtext>
        Stay connected! We are always ready to help you.
      </FormSubtext>

      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          name="name"
          placeholder="Name*"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <StyledInput
          type="email"
          name="email"
          placeholder="Email*"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <StyledInput
          type="date"
          name="date"
          placeholder="Booking date"
          value={formData.date}
          onChange={handleChange}
        />
        <CommentInput
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
        />

        <SubmitButton type="submit">Send</SubmitButton>
      </StyledForm>
    </BookingFormContainer>
  );
};
