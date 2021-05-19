import { useState } from "react";
import { getUser } from "../../../api/api";
import {
  Button,
  HomeStyle,
  Input,
  Form,
  Error,
  UserData,
  Field,
  Value,
  LinkTo,
} from "./style";
import { IUserData } from "../../../api/api";

const Home = () => {
  const [cpf, setCpf] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<IUserData>();

  //gets data from api
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser(undefined);
    setError("");
    const result = await getUser(cpf);
    if (result.msg) {
      setError(result.msg);
    }
    if (result.success === true) {
      setUser(result.userData);
    }
  };

  return (
    <HomeStyle>
      <Form onSubmit={handleSearch}>
        <Input
          mask="999.999.999-99"
          type="text"
          role="cpf"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <Button type="submit" value="PROCURAR" role="search" />
      </Form>
      {error ? <Error>{error}</Error> : null}
      {user ? (
        <UserData>
          <Field>
            Nome: <Value>{user.name}</Value>
          </Field>
          <Field>
            Sobrenome: <Value>{user.surname}</Value>
          </Field>
          <Field>
            Telefone: <Value>{user.telephone}</Value>
          </Field>
          <Field>
            CPF: <Value>{user.cpf}</Value>
          </Field>
        </UserData>
      ) : null}
      <LinkTo to="/register">REGISTRAR NOVO USUARIO</LinkTo>
    </HomeStyle>
  );
};

export default Home;
