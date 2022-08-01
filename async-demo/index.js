console.log('Before');
/* getUser(1, displayUser);

function displayUser(user) {
    console.log('user', user);
    getRepositories(user.gitHubUsername, displayRepos );
}

function displayRepos(repos) {
    console.log(repos);
} */



// getUser(1).then(user => getRepositories(user).then(repos => console.log(repos)));

/* getUser(1)
.then(user => getRepositories(user))
.then(repos => console.log(repos))
.catch(err => console.log('Error', err.message)); */

async function displayRepos() {
    try{
    const user = await getUser(1);
    console.log('xxxxxxx');
    const repos = await getRepositories(user);
    
    console.log(repos);
    }
    catch (err) {
        console.log('Error', err.message);
    }
}

displayRepos();



console.log('After');

function getUser(id) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            console.log('Reading a user from a database...');
            //resolve( {id: id, gitHubUsername: 'hx'});
            reject(new Error('error message'));
        }, 2000);


    });


}

function getRepositories(username) {

    return new Promise((resolve, reject) => {
        setTimeout(
            () => {
                resolve(['repo1', 'repo2', 'repo3']);
            }, 2000
        );
    });


}