import "./style/index.scss";

fetch("http://localhost:8080/users/1")
  .then((response) => {
    return response.ok
      ? Promise.resolve(response.json())
      : Promise.reject(response.json());
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
