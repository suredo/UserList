import styled from "styled-components";
import InputMask from "react-input-mask";

export const RegisterStyle = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid #b3cde0;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #03396c;
`;

export const Title = styled.h1`
  color: #b3cde0;
  margin: 0;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 90%;
  height: 30px;
  color: #011f4b;
  :focus {
    outline: none;
  }
`;
export const InputWithMask = styled(InputMask)`
  width: 90%;
  height: 30px;
  color: #011f4b;
  :focus {
    outline: none;
  }
`;

export const Button = styled.input`
  background-color: #011f4b;
  border: 1px solid #b3cde0;
  color: #b3cde0;
  font-weight: bold;
  width: 90%;
  height: 30px;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

export const Error = styled.p`
  margin: 0;
  color: red;
`;
