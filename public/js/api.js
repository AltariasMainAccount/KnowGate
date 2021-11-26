/*
    Placeholder Variable for "AppendChild"
    Just here so I have a reference to how I built these things.
*/
let contentCell = `
<div id='contentCell'>
  <h2>
    <a href='/profiles/view/'>TEST1</a>
  </h2>
  <p>testing the look of the profiles.</p>
</div>
`

/*
    Important Utility Functions
*/

function getSplitPathName() {
    return window.location.pathname.split('/');
}

function escapeHtml(unsafe)
{
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}


/*
    PROFILE FUNCTIONS
*/

function viewAllProfiles() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        let divToChange = document.getElementById("contentHolder");
        let apiResponse = JSON.parse(this.responseText);

        apiResponse.forEach(e => {
            divToChange.innerHTML += `
            <div id='contentCell'>
              <h2>
                <a href='/profiles/view/${e.id}'>${escapeHtml(e.name)}</a>
              </h2>
              <p>${e.short_desc == null ? "No Description set" : escapeHtml(e.short_desc)}</p>
            </div>
            `;
        });
    }
    
    xhttp.open("GET", "/api/profiles");
    xhttp.send();
}

function viewOneProfile(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        let divToChange = document.getElementById("contentHolder");
        let apiResponse = JSON.parse(this.responseText);
        let assocPosts = apiResponse.posts;

        divToChange.innerHTML += `
            <div id='contentCell'>
              <h1>${escapeHtml(apiResponse.name)}</h1>
              <p>Description: ${apiResponse.description == null ? "No Description set" : escapeHtml(apiResponse.description)}</p>
            </div>
        `;
        assocPosts.forEach(e => {
            divToChange.innerHTML += `
            <div id='extraContentCell'>
              <h2>
                <a href='/posts/view/${e.id}'>${escapeHtml(e.name)}</a>
              </h2>
              <p>${e.short_desc == null ? "No Description set" : escapeHtml(e.short_desc)}</p>
            </div>
            `;       
        });
    }
    
    xhttp.open("GET", `/api/profiles/${id}`);
    xhttp.send();
}

/*
    POST FUNCTIONS
*/

function viewAllPosts() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        let divToChange = document.getElementById("contentHolder");
        let apiResponse = JSON.parse(this.responseText);
  
        apiResponse.forEach(e => {
            divToChange.innerHTML += `
            <div id='contentCell'>
                <h2>
                    <a href='/posts/view/${e.id}'>${escapeHtml(e.title)}</a>
                </h2>
                <p>${e.short_desc == null ? "No Description set" : escapeHtml(e.short_desc)}</p>
            </div>
            `;
        });
    }
    
    xhttp.open("GET", "/api/posts");
    xhttp.send();
}

function viewOnePost(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        let divToChange = document.getElementById("contentHolder");
        let apiResponse = JSON.parse(this.responseText);
        let assocComments = apiResponse.comments;

        divToChange.innerHTML += `
        <div id='contentCell'>
            <h1>${escapeHtml(apiResponse.title)}</h1>
            <p>Content: ${escapeHtml(apiResponse.content)}</p>
            ${apiResponse.repositoryUrl == null ? "<p> No Repository Url set. </p>" : "<a href='"+ apiResponse.repositoryUrl +"'>Repository Link</a>"}
        </div>
        `;
        assocComments.forEach(e => {
            divToChange.innerHTML += `
            <div id='extraContentCell'>
              <h4>${escapeHtml(e.profile.name)}</h4>
              <p>${escapeHtml(e.content)}</p>
            </div>
            `;       
        });
    }
    
    xhttp.open("GET", `/api/posts/${id}`);
    xhttp.send();
}

// Login AJAX

function login() {
    var un = document.getElementById("Username").value;
    console.log(un);
    var pw = document.getElementById("Password").value;
    console.log(pw);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        console.log(un + " " + pw);
    }
    
    xmlhttp.open("post", "/api/auth/login", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({
        "name": un,
        "password": pw
    }));
}

// Registration AJAX

function register(form) {
    var un = form.Username.value;
    var pw = form.Password.value;
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onload = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            registerResults();
        }
    }

    xmlhttp.open("post", "/api/auth/register", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({
        "name": un,
        "password": pw
    }));
}

function registerResults() {
    var badRegistration = document.getElementById("BadRegistration");
    if (xmlhttp.responseText.indexOf("failed") == -1) {
        window.location.href = '/';
    } else {
        badRegistration.style.display = "block";
        form.Username.select();
        form.Username.className = "Highlighted";
        setTimeout(function() {
            badRegistration.style.display = 'none';
        }, 3000);
    }
}


// This is to define where you are

let path = getSplitPathName();

switch (path[1]) {
    case "profiles":
        switch (path[2]) {
            case "view":
                viewOneProfile(path[3]);
                break;
            default:
                viewAllProfiles();
                break;
        }
        break;
    case "posts":
        switch (path[2]) {
            case "view":
                viewOnePost(path[3]);
                break;
            default:
                viewAllPosts();
                break;
        }
        break;
    default:
        break;
}