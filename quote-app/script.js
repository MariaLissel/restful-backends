const btnGetQuote = document.getElementById("btn-get");
const quoteHtml = document.getElementById("quote");
const authorHtml = document.getElementById("author");

let state = {
  quote: "Dreaming, after all, is a form of planning.",
  author: "Gloria Steinem",
};

function render() {
  quoteHtml.textContent = state.quote;
  authorHtml.textContent = state.author;
}
render();

btnGetQuote.addEventListener("click", () => {
  const p = fetch("https://dummy-apis.netlify.app/api/quote"); // in der Variablen p ist das promise
  p.then((response) => {
    //.then = wenn die Abfrage ergolreich war/ oder nicht, mache diese Aktion/ oder diese
    console.log(response.status); // 200
    console.log(response.ok); // true

    if (response.ok) {
      // nur wenn Status = ok dann weiter
      return response.json();
    }
  }).then((data) => {
    console.log(data);
    state.quote = data.quote;
    state.author = data.author;
    render();
  });
});
