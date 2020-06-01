// send-ajax-form2
const sendForm2 = () => {
  const errorMessage = "Что то пошло не так",
    loadMessage = "Загрузка...",
    successMessage = "Спасибо! Мы скоро с вами свяжемся!";
  const form = document.querySelector("#form2"),
    inputs = form.querySelectorAll("input"),
    formName = document.querySelector("#form2-name"),
    formPhone = document.querySelector("#form2-phone"),
    formMessage = document.querySelector("#form2-message");

  const statusMessage = document.createElement("div");
  statusMessage.style.cssText = "font-size: 2rem";

  //валидация
  formPhone.addEventListener("input", () => {
    formPhone.value = formPhone.value.match(/[\d\+]+/, "");
  });
  formName.addEventListener("input", () => {
    formName.value = formName.value.match(/[а-яёА-ЯЁ  ]+/u, "");
  });
  formMessage.addEventListener("input", () => {
    formMessage.value = formMessage.value.match(/[а-яёА-ЯЁ  ]+/u, "");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.append(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(form);
    //объект для внесения в него данных формы
    let body = {};
    //запись данных формы в объект body
    formData.forEach((val, key) => {
      body[key] = val;
    });

    const postData = (body) => {
      return fetch("./server.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    };

    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("status network not 200");
        }
        statusMessage.textContent = successMessage;
        inputs.forEach((elem) => {
          elem.value = "";
        });
      })
      .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      });
  });
};

export default sendForm2;