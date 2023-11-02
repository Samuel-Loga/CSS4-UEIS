
// About UEIS - Read More Button Functionality
const readMoreButton = document.querySelector('.read-more-button');
const readMoreContent = document.querySelector('.read-more-content');
const icon = document.querySelector('.icon');

// Initially hide the content
readMoreContent.style.display = 'none';
icon.innerHTML = '<i class="bi bi-chevron-down"></i> ' + '  Read More';

// Read More Button Functionality
readMoreButton.addEventListener('click', function () {
    if (readMoreContent.style.display === 'none' || readMoreContent.style.display === '') {
        readMoreContent.style.display = 'inline';
        icon.innerHTML = '<i class="bi bi-chevron-up"></i> ' + '  Read Less';
    } else {
        readMoreContent.style.display = 'none';
        icon.innerHTML = '<i class="fbi bi-chevron-down"></i> ' + '  Read More';
    }
});



// Function to open a new page after selecting a service
function openNewPage() {
    // URL of new page to be opened
    var newPageURL = 'otp.html';

    // Open new page in a new browser window or tab
    window.open(newPageURL);
}

// Example: Attach the function to a button's click event
var openPageButton1 = document.getElementById('openPageButton1');
openPageButton1.addEventListener('click', openNewPage);

var openPageButton2 = document.getElementById('openPageButton2');
openPageButton2.addEventListener('click', openNewPage);

var openPageButton3 = document.getElementById('openPageButton3');
openPageButton3.addEventListener('click', openNewPage);

var openPageButton4 = document.getElementById('openPageButton4');
openPageButton4.addEventListener('click', openNewPage);

var openPageButton5 = document.getElementById('openPageButton5');
openPageButton5.addEventListener('click', openNewPage);




// Function to open a new page after registration
function openPage() {
    // URL of new page to be opened
    var pageURL = 'scan.html';

    // Open new page in a new browser window or tab
    window.open(pageURL);
}

// Example: Attach the function to a button's click event
var openPage1 = document.getElementById('openPage1');
openPage1.addEventListener('click', openPage);



// Function to open a new page after scan
function openPage1() {
    // URL of new page to be opened
    var pageURL1 = 'index.html';

    // Open new page in a new browser window or tab
    window.open(pageURL1);
}

// Example: Attach the function to a button's click event
var openPage1 = document.getElementById('openPage1');
openPage1.addEventListener('click', openPage1);



// Data Tables
new DataTable('#example', {
    scrollX: true
});
