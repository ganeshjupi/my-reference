const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const token = getCookie('tk');
console.log('Token:', token);

//set cookie
document.cookie = "tk=yourTokenValue; path=/; domain=.alltrade.ae; Secure; SameSite=None";


// express
res.cookie('tk', 'yourTokenValue', {
    domain: '.alltrade.ae', // Allows all subdomains to access the cookie
    path: '/',
    secure: true,          // Ensures the cookie is sent over HTTPS
    sameSite: 'None'       // Enables sharing across subdomains
});
