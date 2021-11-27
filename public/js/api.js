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
            <h2>${escapeHtml(apiResponse.name)}'s Posts</h2>
        `;
        assocPosts.forEach(e => {
            divToChange.innerHTML += `
            <div id='extraContentCell'>
              <h2>
                <a href='/posts/view/${e.id}'>${escapeHtml(e.title)}</a>
              </h2>
              <p>${e.short_desc == null ? "No Description set" : escapeHtml(e.short_desc)}</p>
            </div>
            `;       
        });
    }
    
    xhttp.open("GET", `/api/profiles/${id}`);
    xhttp.send();
}

function viewMyProfile() {
    const myID = document.getElementById("myID").innerText;
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        let divToChange = document.getElementById("contentHolder");
        let apiResponse = JSON.parse(this.responseText);
        let assocPosts = apiResponse.posts;
        console.log(assocPosts);

        divToChange.innerHTML += `
            <div id='contentCell'>
              <h1>${escapeHtml(apiResponse.name)}</h1>
              <p>Description: ${apiResponse.description == null ? "No Description set" : escapeHtml(apiResponse.description)}</p>
            </div>
            <h2>${escapeHtml(apiResponse.name)}'s Posts</h2>
        `;
        assocPosts.forEach(e => {
            divToChange.innerHTML += `
            <div id='extraContentCell'>
              <h2>
                <a href='/posts/view/${e.id}'>${escapeHtml(e.title)}</a>
              </h2>
              <p>${e.short_desc == null ? "No Description set" : escapeHtml(e.short_desc)}</p>
            </div>
            `;       
        });
    }
    
    xhttp.open("GET", `/api/profiles/${myID}`);
    xhttp.send();
}

function editMyProfile() {
    const myID = document.getElementById("myID").innerText;
    
    let un = document.getElementById("Username").value != (null || '') ? document.getElementById("Username").value : document.getElementById("myName").value;
    let short_desc = document.getElementById("Short_Desc").value;
    let long_desc = document.getElementById("Long_Desc").value;

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        window.location.href = "/profiles/my";
    }
    
    xhttp.open("PUT", `/api/profiles/${myID}`);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        "name": un,
        "short_desc": short_desc,
        "description": long_desc
    }));
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
            <h4>by<a href='/profiles/view/${apiResponse.profile.id}'>${escapeHtml(apiResponse.profile.name)}</a></h4>
            <p>${escapeHtml(apiResponse.content)}</p>
            ${apiResponse.repositoryUrl == null ? "<p> No Repository Url set. </p>" : "<a href='"+ apiResponse.repositoryUrl +"'>Repository Link</a>"}
        </div>
        <div id='contentCell'>
            <input type="text" id="commentBox" class="big"></input>
            <button id="createPostCommentButton" onclick="createNewCommentOnPost()">Post Comment</button>
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

function createNewPost() {
    const myID = document.getElementById("myID").innerText;
    
    let title = document.getElementById("Username").value != (null || '') ? document.getElementById("Username").value : "Dunce didn't put in a title!"
    let short_desc = document.getElementById("Short_Desc").value;
    let long_desc = document.getElementById("Long_Desc").value;
    let repositoryUrl = document.getElementById("RepoURL").value;

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        window.location.href = `/posts`
    }
    
    xhttp.open("post", `/api/posts/`);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        "title": title,
        "short_desc": short_desc,
        "content": long_desc,
        "repositoryUrl": repositoryUrl,
        "profileId": myID
    }));
}

function createNewCommentOnPost() {
    const myID = document.getElementById("myID").innerText;
    const postID = getSplitPathName()[3];

    let content = document.getElementById("commentBox").value;

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        location.reload();
    }
    
    xhttp.open("post", `/api/postcomments/`);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        "content": content,
        "rating": 5,
        "profileId": myID,
        "postId": postID
    }));
}

// Login AJAX

function login() {
    var un = document.getElementById("Username").value;
    var pw = document.getElementById("Password").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        window.location.href = "/dashboard"
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
    var un = document.getElementById("Username").value;
    var pw = document.getElementById("Password").value;
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onload = function () {
        window.location.href = "/login"
    }

    xmlhttp.open("post", "/api/auth/register", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({
        "name": un,
        "password": pw
    }));
}

// This is to define where you are

let path = getSplitPathName();

switch (path[1]) {
    case "profiles":
        switch (path[2]) {
            case "view":
                viewOneProfile(path[3]);
                break;
            case "my":
                if (!(path[3] == "edit")) {
                    viewMyProfile();
                }
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
            case "create":
                break;
            default:
                document.getElementById('hidden').style.display = 'initial';
                viewAllPosts();
                break;
        }
        break;
    default:
        break;
}