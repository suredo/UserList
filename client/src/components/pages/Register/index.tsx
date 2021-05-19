import { useState } from "react";
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
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const result = await addUser({ name, surname, telephone, cpf });
    if (result.msg) {
      setError(result.msg);
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
          onChange={(e) => setTelephone(e.target.value)}
        />
        <InputWithMask
          mask="999.999.999-99"
          type="text"
          role="cpf"
          placeholder="CPF"
          required
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        {error ? <Error>{error}</Error> : null}
        <Button type="submit" role="send" value="Enviar" />
      </Form>
    </RegisterStyle>
  );
};

export default Register;
