const form = document.getElementById('contact-form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.innerHTML = "Prosím čakajte...";
  result.style.color = "gray";

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
  .then(async (response) => {
    let json = await response.json();
    if (response.status == 200) {
      result.innerHTML = "Správa bola úspešne odoslaná!";
      result.style.color = "green";
      form.reset(); // Vyčistí formulár
    } else {
      console.log(response);
      result.innerHTML = json.message;
      result.style.color = "red";
    }
  })
  .catch(error => {
    console.log(error);
    result.innerHTML = "Niečo sa nepodarilo. Skúste to neskôr.";
    result.style.color = "red";
  })
  .then(function() {
    // Po 5 sekundách zmizne správa o stave
    setTimeout(() => {
      result.innerHTML = "";
    }, 5000);
  });
});