let submit_btn = document.querySelector('#submit_btn');
let Find_btn = document.querySelector('#Find_btn');

submit_btn.addEventListener('click', event => {
  let Find_btn = document.querySelector('#Find_btn');

  // form defalt reload stop
  event.preventDefault();
  let name = document.querySelector('#name').value.trim();
  let nameStyle = document.querySelector('#name');
  let email = document.querySelector('#email').value;
  let emailStyle = document.querySelector('#email');
  let password = document.querySelector('#password').value;
  let passwordStyle = document.querySelector('#password');
  let confirmpassword = document.querySelector('#Confirmpassword').value;
  let confirmPasswordStyle = document.querySelector('#Confirmpassword');
  let country_name = document.querySelector('#country_name').value;
  let country_nameStyle = document.querySelector('#country_name');
  let name_error = document.querySelector('#name_error');
  let email_error = document.querySelector('#email_error');
  let password_error = document.querySelector('#password_error');
  let confirm_password_error = document.querySelector(
    '#Confirm_password_error'
  );
  let contriy_error = document.querySelector('#contriy_error');

  if (name == '') {
    name_error.innerHTML = 'Enter your valid name';
    nameStyle.style.borderColor = 'red';
    nameStyle.style.color = 'red';
  } else {
    // email.style.marginTop = '-15px';
    name_error.innerHTML = '';
  }
  if (email == '') {
    email_error.innerHTML = 'Enter your valid email';
    emailStyle.style.borderColor = 'red';
    emailStyle.style.color = 'red';
  } else {
    email_error.innerHTML = '';
  }
  if (password == '') {
    password_error.innerHTML = 'Enter your valid password';
    passwordStyle.style.borderColor = 'red';
    passwordStyle.style.color = 'red';
  } else {
    password_error.innerHTML = '';
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (password < 6 || password > 10 || emailPattern.value(password)) {
      password_error.innerHTML =
        'your password is low min-6 max-10 spacear key @ $ % ^ & * (';
      passwordStyle.style.borderColor = 'red';
      passwordStyle.style.color = 'red';
    }
  }
  if (confirmpassword == '') {
    confirm_password_error.innerHTML = 'Enter your password';
    confirmPasswordStyle.style.borderColor = 'red';
    confirmPasswordStyle.style.color = 'red';
  } else {
    confirm_password_error.innerHTML = '';

    if (password === confirmpassword) {
      if (confirmpassword < 6 || confirmpassword > 10) {
        password_error.innerHTML = 'your password is low';
        confirmPasswordStyle.style.borderColor = 'red';
        confirmPasswordStyle.style.color = 'red';
      }
      confirm_password_error.innerHTML = '';
    } else {
      confirm_password_error.innerHTML = 'password not match';
      confirmPasswordStyle.style.borderColor = 'red';
      confirmPasswordStyle.style.color = 'red';
    }
  }
  if (country_name == '') {
    contriy_error.innerHTML = 'Enter your countriy name';
    country_nameStyle.style.borderColor = 'red';
    country_nameStyle.style.color = 'red';
    Find_btn.style.marginTop = '-5px';
  } else {
    contriy_error.innerHTML = '';

    Find_btn.style.marginTop = '13px';
  }

  alert('click');
});

function dynamic_cuntriy_name_Fun(country_name) {
  let API = `https://restcountries.com/v3.1/name/${country_name}`;

  fetch(API)
    .then(data => data.json())
    .then(main_data => {
      // console.log(man_data);
      let [mainDataStore] = main_data;
      console.log(mainDataStore);
      comon_html(mainDataStore);
    })
    .catch(error => {
      console.log(error);
    });
}
function comon_html(mainDataStore) {
  let html_append = document.querySelector('.html_append');
  let mainTaka = mainDataStore.currencies;
  console.log(mainTaka);

  let randerHtml = `
  <div class="country_data_main">
  <div class="cuntry_img">
  <img src="${mainDataStore?.flags?.svg}" alt="">
  </div>
  <div class="cuntry_main_data">
  <h3>${mainDataStore?.name?.common}</h3>
  <p id="cuntry_Population">Population: ${formatNumber(
    mainDataStore?.population
  )}</p>
  <p id="cuntry_Borders">Borders: ${mainDataStore?.borders} </p>
  <p id="cuntry_currency">Currency: Money</p>
  <p id="cuntry_capital">Capital: ${mainDataStore?.capital}</p>
  <p id="cuntry_Area">Area: ${mainDataStore?.area} square kilometres</p>
  </div>
  </div>  
  
  `;
  // html_append.insertAdjacentHTML('beforeend', randerHtml);
  html_append.innerHTML = randerHtml;
}

Find_btn.addEventListener('click', event => {
  event.preventDefault();
  let main_cuntryname = document.querySelector('#country_name').value;
  let main_cuntryname_value = document.querySelector('#country_name');
  let contriy_error = document.querySelector('#contriy_error');
  if (main_cuntryname == '') {
    contriy_error.innerHTML = 'Enter your countiry name';
    Find_btn.style.marginTop = '-8px';
  } else {
    contriy_error.innerHTML = '';
    // console.log(main_cuntryname);
    dynamic_cuntriy_name_Fun(main_cuntryname);
    main_cuntryname_value.value = '';
  }
});

function formatNumber(num) {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + 'B'; // Billion
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M'; // Million
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K'; // Thousand
  } else {
    return num.toString(); // Less than 1K
  }
}
