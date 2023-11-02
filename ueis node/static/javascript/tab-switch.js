function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }


  function fetchData() {
    fetch('/get_desc_data')
        .then(response => response.json())
        .then(data => {
            const descList = document.getElementById('desc-list');
            descList.innerHTML = ''; // Clear previous data

            data.data.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${item.article}</strong>: ${item.description}<br>Updated: ${item.data_updated}`;
                descList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Call fetchData() when the 'home' tab is opened
document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});