console.log ('javascript in frontend');

const cotacoesForm = document.querySelector ('form');
const mensager = document.querySelector ('h3');
const price = document.querySelector ('#price');
const day_low = document.querySelector ('#day-low');
const day_high = document.querySelector ('#day-high');

cotacoesForm.addEventListener ('submit', event => {
  event.preventDefault ();
  mensager.innerText = 'buscando...';

  const ativo = document.querySelector ('input').value;

  if (!ativo) {
    mensager.innerText = 'O ativo deve ser informado!';
    return;
  }

  const url = 'http://localhost:3000/cotacoes?ativo=';

  fetch (`${url}${ativo}`).then (response => {
    response.json ().then (data => {
      if (data.err) {
        mensager.innerText = `Algo deu errado`;
        price.innerText = `${data.err}`;
      } else {
        mensager.innerText = `Ativo: ${data.symbol}`;
        price.innerText = `Preço: R$${data.price}`;
        day_low.innerText = `Menor valor: R$${data.day_low}`;
        day_high.innerText = `Maior valor: R$${data.day_high}`;
      }
    });
  });
});
