import { useState } from "react";
import { useHistory } from "react-router";
import { addUser } from "../../../api/api";
import {
  Button,
  Error,
  Form,
  Input,
  InputWithMask,
  RegisterStyle,
  Title,
} from "./style";

const Register = () => {
  const history = useHistory();
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [cpfError, setCpfError] = useState<string>("");

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cpfError || phoneError) return;
    setCpfError("");
    const result = await addUser({ name, surname, telephone, cpf });
    if (result.msg) {
      setCpfError(result.msg);
    }
    if (result.success === true) {
      history.push("/");
    }
  };

  const phoneValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelephone(e.target.value);
    const validate = e.target.value.match(
      /^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/
    );
    if (!validate) {
      setPhoneError("Formato incorreto");
    } else {
      setPhoneError("");
    }
  };

  const cpfValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(e.target.value);
    console.log(cpf);
    const validate = e.target.value.match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/);
    if (!validate) {
      setCpfError("Formato incorreto");
    } else {
      setCpfError("");
    }
  };

  return (
    <RegisterStyle>
      <Form onSubmit={handleSend}>
        <Title>Registro</Title>
        <Input
          type="text"
          role="name"
          placeholder="Nome"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          role="surname"
          placeholder="Sobrenome"
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <InputWithMask
          mask="+55 (99) 99999-9999"
          type="text"
          role="phone"
          placeholder="Telefone"
          required
          value={telephone}
          onChange={phoneValidation}
        />
        {phoneError ? <Error>{phoneError}</Error> : null}
        <InputWithMask
          mask="999.999.999-99"
          type="text"
          role="cpf"
          placeholder="CPF"
          required
          value={cpf}
          onChange={cpfValidation}
        />
        {cpfError ? <Error>{cpfError}</Error> : null}
        <Button type="submit" role="send" value="Enviar" />
      </Form>
    </RegisterStyle>
  );
};

export default Register;
