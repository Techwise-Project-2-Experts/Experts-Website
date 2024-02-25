document.addEventListener('DOMContentLoaded', function() {
    let editButton = document.getElementById("edit-button");
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


    editButton.addEventListener("click", function(){
        document.querySelector("#user-info-popup").classList.remove("hidden");
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

});
