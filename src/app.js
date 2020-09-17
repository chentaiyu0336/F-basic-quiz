import "./style/index.scss";

const url = window.location.href;
// TODO feedback: 逻辑有漏洞，如果URL是/any/1，也是可以通过的
const id = url.split("users/")[1];

fetch(`http://localhost:8080/users/${id}`)
  .then((response) => {
    return response.ok
      ? Promise.resolve(response.json())
      : Promise.reject(response.json());
  })
  .then((data) => {
    // TODO feedback: 方法太长了。。。考虑拆分
    const img = document.querySelector("img");
    img.src = data.avatar;

    document
      .querySelector("h2")
      .append(` ${data.name} ${data.age} YO AND THIS IS MY RESUME / CV`);

    const about = document.querySelector(".about-msg");
    const aboutMsg = document.createElement("p");
    aboutMsg.textContent = data.description;
    about.appendChild(aboutMsg);

    // TODO feedback: education数据是一个单独的请求
    const { educationList } = data;
    const education = document.querySelector(".education");
    educationList.forEach((element) => {
      const { title, year, description } = element;

      const eduInfo = document.createElement("div");
      eduInfo.className = "edu-info";
      // TODO feedback: education用ul li更符合语义
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
