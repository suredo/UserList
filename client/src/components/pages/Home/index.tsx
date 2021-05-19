import { useState } from "react";
import { getUser } from "../../../api/api";
import { Button, HomeStyle, Input, Form, Error } from "./style";

const Home = () => {
  const [cpf, setCpf] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    const result = await getUser(cpf);
    if (result.msg) {
      setError(result.msg);
    }
    if (result.success === true) {
      console.log(result.userData);
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
    </HomeStyle>
  );
};

export default Home;
