
/* getCustomer(1, (customer) => {
  console.log('Customer: ', customer);
  if (customer.isGold) {
    getTopMovies((movies) => {
      console.log('Top movies: ', movies);
      sendEmail(customer.email, movies, () => {
        console.log('Email sent...')
      });
    });
  }
});
 */

async function notify() {
  const customer = await getCustomer(1);
  console.log('Customer: ', customer);
  const movies = await getTopMovies();
  console.log('Top movies: ', movies);
  const result = await sendEmail(customer.email, movies);
  console.log('Email sent...');


}

notify();

function getCustomer(id) {

  return new Promise(
    (resolve) => {

      setTimeout(() => {
        resolve({ 
          id: 1, 
          name: 'Mosh Hamedani', 
          isGold: true, 
          email: 'email' 
        });
      }, 4000); 

    }


  );


 
}

function getTopMovies() {

  return new Promise(
    (resolve) => {

      setTimeout(() => {
        resolve(['movie1', 'movie2']);
      }, 4000);
    }

  );


}

function sendEmail(email, movies) {

  return new Promise(
    (resolve) => {
      setTimeout(() => {
        resolve();
      }, 4000);

    }

  );


}