interface IUserData {
  name: string;
  surname: string;
  telephone: string;
  cpf: string;
}

export const addUser = async (userData: IUserData) => {
  const data = await fetch("/api/adduser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userData.name,
      surname: userData.surname,
      telephone: userData.telephone,
      cpf: userData.cpf,
    }),
  });

  const result = await data.json();
  return result;
};

export const getUser = async (cpf: string) => {
  const data = await fetch(`/api/getuser?cpf=${cpf}`);
  const result = await data.json();
  return result;
};
