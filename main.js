const URL = "https://periodic-table-elements-info.herokuapp.com/elements";

getData(URL);

async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data[0].symbol);

    function displayE(data) {
      DOMSelectors.display.insertAdjacentHTML(
        "afterbegin",
        `<div class="display-card">
<h3 class="display-text" >${data.symbol}</h2>
      </div>
 `
      );
    }
    displayE();
  } catch (err) {
    console.error(err);
  }
}

const DOMSelectors = {
  box: document.getElementById("box"),
  display: document.getElementById("display"),
};
