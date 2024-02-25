document.addEventListener('DOMContentLoaded', function() {
    let editInfo = document.getElementById("edit-info");
    let addExperience = document.getElementById("add-experience");
    let addEducation = document.getElementById("add-education");
    let addSkills = document.getElementById("add-skills");

    let closeInfo = document.querySelector(`#close-info`);
    let closeExperience = document.querySelector(`#close-experience`);
    let closeEducation = document.querySelector(`#close-education`);
    let closeSkills = document.querySelector(`#close-skills`);

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
    // let profileInfo = user.profileInfo;
    // console.log(profileInfo);
    

    //Information
    editInfo.addEventListener(`click`, function(){
        console.log(`I got clicked`);
        document.querySelector(`#user-info-popup`).classList.toggle(`active`);
    })
    closeInfo.addEventListener(`click`, function(){
        console.log(`Pop up closing`);
        document.querySelector(`#user-info-popup`).classList.remove(`active`);
    })

    //Experience
    addExperience.addEventListener(`click`, function(){
        console.log(`I got clicked`);
        document.querySelector(`#experience-popup`).classList.toggle(`active`);
    })
    closeExperience.addEventListener(`click`, function(){
        console.log(`Pop up closing`);
        document.querySelector(`#experience-popup`).classList.remove(`active`);
    })
    
    //Education
    addEducation.addEventListener(`click`, function(){
        console.log(`I got clicked`);
        document.querySelector(`#education-popup`).classList.toggle(`active`);
    })
    closeEducation.addEventListener(`click`, function(){
        console.log(`Pop up closing`);
        document.querySelector(`#education-popup`).classList.remove(`active`);
    })

    //Skills
    addSkills.addEventListener(`click`, function(){
        console.log(`I got clicked`);
        document.querySelector(`#skills-popup`).classList.toggle(`active`);
    })
    closeSkills.addEventListener(`click`, function(){
        console.log(`Pop up closing`);
        document.querySelector(`#skills-popup`).classList.remove(`active`);
    })

    // if(profileInfo){
    //     console.log(profileInfo);
    //     nameHeader.innerText = profileInfo.fullName;
    //     pHeadline.innerText = profileInfo.headline;
    //     pLocation.innerText = profileInfo.location;
    //     pAbout.innerText = profileInfo.about;

    //     const sectionsAndContents = [
    //         [ experienceSection, profileInfo.experience],
    //         [ educationSection, profileInfo.education ],
    //         [ skillSection, profileInfo.skills],
    //         ];

    //     for ( const sectionAndContent of sectionsAndContents){
    //         for ( const content of sectionAndContent[1]){
    //             sectionAndContent[0].innerHTML += content;
    //         }
    //     }
    // } else {
    //     console.log("profile.js: Profile information not available.")
    // }

});
