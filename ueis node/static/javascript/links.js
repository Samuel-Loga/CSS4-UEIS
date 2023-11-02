const homeLink = document.getElementById("home_link");
const userLink = document.getElementById("user_link");
const helpLink = document.getElementById("help_link");
const aboutLink = document.getElementById("about_link");
const contactLink = document.getElementById("contact_link");
const thirdLink = document.getElementById("third_link");
const cardLink = document.getElementById("card_link");

const identity = document.getElementById("identity").innerText;

if(identity == 1)
{
    homeLink.classList.add('active');
    userLink.classList.remove('active');
    helpLink.classList.remove('active');
    aboutLink.classList.remove('active');
    contactLink.classList.remove('active');
}

if(identity == 2)
{
    userLink.classList.add('active');
    homeLink.classList.remove('active');
    helpLink.classList.remove('active');
    aboutLink.classList.remove('active');
    contactLink.classList.remove('active');
}

if(identity == 3)
{
    helpLink.classList.add('active');
    homeLink.classList.remove('active');
    userLink.classList.remove('active');
    aboutLink.classList.remove('active');
    contactLink.classList.remove('active');
}

if(identity == 4)
{
    aboutLink.classList.add('active');
    homeLink.classList.remove('active');
    userLink.classList.remove('active');
    helpLink.classList.remove('active');
    contactLink.classList.remove('active');
}

if(identity == 5)
{
    contactLink.classList.add('active');
    homeLink.classList.remove('active');
    userLink.classList.remove('active');
    helpLink.classList.remove('active');
    aboutLink.classList.remove('active');
}
