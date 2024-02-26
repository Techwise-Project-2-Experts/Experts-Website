document.addEventListener('DOMContentLoaded', function() {
    let editButton = document.getElementById("edit-info");
    let closeButton = document.querySelector(".close-btn")
    let nameHeader = document.getElementById("username");
    let pHeadline = document.getElementById("user-headline");
    let pLocation = document.getElementById("user-location");
    let pAbout = document.getElementById("about");
    let experienceSection = document.getElementById("experience");
    let educationSection = document.getElementById("education");
    let skillSection = document.getElementById("skills");

    let user = sessionStorage.getItem('user');
    user = JSON.parse(user)
    console.log("From profile.js...")
    console.log(user)
    let profileInfo = user.profileInfo;
    console.log(profileInfo);
    

    console.log(editButton)

    editButton.addEventListener(`click`, function(){
        console.log(`I got clicked`);
        document.querySelector(`#user-info-popup`).classList.toggle(`active`);
    })

    closeButton.addEventListener(`click`, function(){
        console.log(`Pop up closing`);
        document.querySelector(`#user-info-popup`).classList.remove(`active`);
    })

    if(profileInfo){
         console.log(profileInfo);
         nameHeader.innerText = profileInfo.fullName;
         pHeadline.innerText = profileInfo.headline;
         pLocation.innerText = profileInfo.location;
         pAbout.innerText = profileInfo.about;

         const sectionsAndContents = [
             [ experienceSection, profileInfo.experience],
             [ educationSection, profileInfo.education ],
             [ skillSection, profileInfo.skills],
             ];

         for ( const sectionAndContent of sectionsAndContents){
             for ( const content of sectionAndContent[1]){
                 sectionAndContent[0].innerHTML += content;
             }
         }
     } else {
         console.log("profile.js: Profile information not available.")
     }

    document.getElementById("profileHeaderForm").addEventListener("submit", async function(event){
        event.preventDefault(); 
        let fullNameValue = document.getElementById("input-full-name").value;
        let headlineValue = document.getElementById("input-headline").value;
        let locationValue = document.getElementById("input-location").value;
        
        if (fullNameValue != ""){
        nameHeader.innerText = user.profileInfo.fullName = fullNameValue
        }
        if (headlineValue != ""){
        pHeadline.innerText = user.profileInfo.headline = headlineValue
        }
        if (locationValue){
        pLocation.innerText = user.profileInfo.location = locationValue
        }

        try{
            const response = await fetch('/profile',{
              method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
        } catch(error){
            console.error('Error:', error);
        }
    });

});
