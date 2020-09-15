import "./style/index.scss";

const url = window.location.href;
const id = url.split("users/")[1];

fetch(`http://localhost:8080/users/${id}`)
  .then((response) => {
    return response.ok
      ? Promise.resolve(response.json())
      : Promise.reject(response.json());
  })
  .then((data) => {
    const img = document.querySelector("img");
    img.src = data.avatar;

    document
      .querySelector("h2")
      .append(` ${data.name} ${data.age} YO AND THIS IS MY RESUME / CV`);

    const about = document.querySelector(".about-msg");
    const aboutMsg = document.createElement("p");
    aboutMsg.textContent = data.description;
    about.appendChild(aboutMsg);

    const { educationList } = data;
    const education = document.querySelector(".education");
    educationList.forEach((element) => {
      const { title, year, description } = element;

      const eduInfo = document.createElement("div");
      eduInfo.className = "edu-info";

      eduInfo.innerHTML = `
      <span class="year">${year}</span>
        <div class="education-message">
            <h4>${title}</h4>
            <p>${description}</p>
        </div>`;
      education.appendChild(eduInfo);
    });
  })
  .catch((err) => {
    console.log(err);
  });
