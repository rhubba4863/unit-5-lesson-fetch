const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS RPH
// ------------------------------------------

//make a reusable fetch method
function fetchData(url){
  return fetch(url)
            .then(checkStatus)
            .then(res => res.json()) //1) parsing the data with json (a.k.a get the raw data)
            .catch(error => console.log('Looks like there was a problem', error))
}

//waits until both are carreed out
Promise.all([
  fetchData('https://dog.ceo/api/breeds/list'),
  fetchData('https://dog.ceo/api/breeds/image/random')
])
//NOTE - replaces the 2 fetch data commented out below
.then(data => {
  const breedList = data[0].message;
  const randomImage = data[1].message;

  generateOptions(breedList);
  generateImage(randomImage);
})

// 2 below --------------------------------------------------------
// fetchData('https://dog.ceo/api/breeds/list')
// .then(data => generateOptions(data.message))//2) takes the data

// fetchData('https://dog.ceo/api/breeds/image/random')
// .then(data => generateImage(data.message)) //takes the data
// 2 above --------------------------------------------------------

/*NOTE - BELOW IS ANOTHER WAY TO DO THE FETCH AND PROMISE.ALL
// store urls to fetch in an array
const urls = [
  'https://dog.ceo/api/breeds/list',
  'https://dog.ceo/api/breeds/image/random'
];

// use map() to perform a fetch and handle the response for each url
Promise.all(urls.map(url =>
  fetch(url)
    .then(checkStatus)                 
    .then(parseJSON)
    .catch(logError)
))
.then(data => {
  // do something with the data
})
*/







// fetch('https://dog.ceo/api/breeds/list')
// .then(response => response.json()) //1) parsing the data with json (a.k.a get the raw data)
// .then(data => generateOptions(data.message)//2) takes the data
// )
// //  .then(response => console.log(response))

// fetch('https://dog.ceo/api/breeds/image/random')
// .then(response => response.json()) //parsing the data with json (a.k.a get the raw data)
// .then(data => generateImage(data.message)) //takes the data
// //.then(response => console.log(response))
// //.then(data => console.log(data.message)) //takes the data


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response){
  if(response.ok) {
    return Promise.resolve(response);
  }else{
    return Promise.reject(new Error(response.statusText));
  }
}

//set the value and text of the dog
function generateOptions(data){
  const options = data.map(item => `
    <option value='${item}'>${item}</option>
  `).join(''); //3) removes the coma after each option  
  select.innerHTML = options;
}

function generateImage(data){
  const html = `
    <img src='${data}' alt>
    <p>Click to view images of ${select.values}s</p>
  `;
  card.innerHTML = html;
}

function fetchBreedImage() {
  const breed = select.value;
  const img = card.querySelector('img');
  const p = card.querySelector('p');

  fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(data => {
      img.src = data.message;
      img.alt = breed;
      p.textContent = `Click to view more ${breed}s`;
    })
}
// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);
form.addEventListener('submit', postData);

// ------------------------------------------
//  POST DATA
// ------------------------------------------

function postData(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const comment = document.getElementById('comment').value;

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/kson'
    },
    body: JSON.stringify({ name, comment})
    //or use----- body: JSON.stringify({ name:name, comment:comment})
  }

  fetch('https://jsonplaceholder.typicode.com/comments', config)
    .then(checkStatus)
    .then(res => res.json())
    .then(data => console.log(data))

    // fetch('https://jsonplaceholder.typicode.com/comments')
    // .then(checkStatus)
    // .then(res => res.json())
    // .then(data => console.log(data))
  
}