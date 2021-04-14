/*
async function getCompany() {
    return 'fitpet';
}

getCompany().then((res) => {
    console.log('res -->', res);
})
*/

function serverRequest() {
    var promise = new Promise((resolve, reject) => {
        setTimeout(() => reject('error in getting'), 2000)
    })
    return promise;
}

async function getCompany() {
    let companyPromise = serverRequest();
    try {
        // handle succes
        let companyName = await companyPromise;
        console.log('companyName', companyName);
    } catch(error) {
        // handle error
        console.log('error', error);
    }
    
}
getCompany();


function getTallestPerson() {
    var promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(123), 100)
    })
    return promise;
}

function getUserDetails(userId) {
    var promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve({
            id: userId,
            name: 'Augustine',
            company: 'fitpet'
        }), 1000)
    })
    return promise;
}

async function getUser() {
    let userIdPromise = getTallestPerson();
    let userId = await userIdPromise;

    let userDetailPromise = getUserDetails(userId);
    let userDetail = await userDetailPromise;
    console.log('userDetails', userDetail);
}
getUser()