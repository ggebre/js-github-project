document.addEventListener("DOMContentLoaded", () => {
    let userName;
    let reposLink;

    const userNameInputForm = document.querySelector("#github-form");
    
    userNameInputForm.addEventListener('submit', (event) => {
    
        userName = event.target.children[0].value;
        fetchUserInfoWithUserName() 
        event.preventDefault();
    }, false )
    
    function fetchUserInfoWithUserName() {
        fetch(`https://api.github.com/users/${userName}`)
        .then(resp => resp.json())
        .then(githubObj => {
            
            document.querySelector('body').innerHTML += displayUserProfile(githubObj)
            reposLink = document.querySelector('#profile');
            reposLink.addEventListener('click',(event)=> {
                fetchRepos(githubObj.repos_url);
                event.preventDefault();
            })
        })
    }

    function displayUserProfile(obj) {
        return `<div> <h3> <a id=profile href=# target=blank>${obj.login} </a> </h3>
        <img src=${obj.avatar_url}><br>
        <p> Public Repo Count : ${obj.public_repos} </p>
        <a href=${obj.html_url}> Github Profile </a>
        </div>`
    } 
    function displayUserAllRepos(obj) {
        return `<div> <h3>${obj.name}</h3> 
        </div>`
    }
    function fetchRepos(url) {
        
        fetch(url).then(resp => resp.json())
        .then(reposObj => {
            reposObj.forEach (repoObj => {
                document.querySelector('body').innerHTML += displayUserAllRepos(repoObj)
            })
        })
    }
})

