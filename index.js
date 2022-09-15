import "../styles/style.css";

const URL =
  "https://periodictableapi.herokuapp.com/api/getElement/bySymbol/:symbol";

async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data[0]);
  } catch (err) {
    console.error(err);
  }
}

function displayE() {
  DOMSelectors.display.insertAdjacentHTML(
    "afterbegin",
    `<div class="display-card">
 <h3 class="display-text" >${datas.symbol}</h2>
        </div>
 `
  );
}
