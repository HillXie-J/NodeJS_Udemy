/* const p = Promise.resolve({id: 1});
p.then(user => console.log('user', user.id));

const r = Promise.reject(new Error('error message'));
r.catch(err => console.log(err)); */

const p1 = new Promise(
    (resolve, reject) => {
        setTimeout(
            () => {
                console.log('Async operation 1...');
                //reject(new Error('because something failed.'));
                resolve(1);
            }, 3000

        );
    }
);


const p2 = new Promise(
    (resolve) => {
        setTimeout(
            () => {
                console.log('Async operation 2...');
                resolve(2);
            }, 2000

        );
    }
);


/* Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message)); */

    Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));