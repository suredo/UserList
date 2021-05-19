import styled from "styled-components";
import InputMask from "react-input-mask";
import { Link } from "react-router-dom";

export const HomeStyle = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
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

export const Input = styled(InputMask)`
  text-align: center;
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

export const UserData = styled.div`
  border: 1px solid #b3cde0;
  padding: 10px;
  background-color: #03396c;
`;

export const Field = styled.p`
  color: #b3cde0;
  font-weight: bold;
`;
export const Value = styled.span`
  font-weight: lighter;
`;

export const LinkTo = styled(Link)`
  border: 1px solid white;
  color: white;
  padding: 10px;
  text-decoration: none;
`;
