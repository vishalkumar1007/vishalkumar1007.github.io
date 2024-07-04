// import Email from 'some-email-library';
// remove inspect element
// document.addEventListener('contextmenu', (e)=> {
//     e.preventDefault();
// });

// connecting to firebase database and handel............................

const firebaseConfig = {
    apiKey: "AIzaSyCah_QhLAN9NtRvykp_D7IHQhKCPhzV778",
    authDomain: "portfoliodata-1007.firebaseapp.com",
    databaseURL: "https://portfoliodata-1007-default-rtdb.firebaseio.com",
    projectId: "portfoliodata-1007",
    storageBucket: "portfoliodata-1007.appspot.com",
    messagingSenderId: "420137143564",
    appId: "1:420137143564:web:b90a04690b3f51fdd78d29",
    measurementId: "G-D79W4M7TK2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the database
const database = firebase.database();

// Get User IP
// Function to generate a random code
const generateRandomCodeForUser = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#%&_123456789';
    const minLength = 8;
    const maxLength = 10;
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let randomCode = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomCode += characters[randomIndex];
    }
    return randomCode;
}

// Function to check if a code exists in the database
const findCodeInDB = async (code) => {
    try {
        const codeRef = database.ref('user_local_storage_code');
        const user_code_snapshot = await codeRef.once('value');
        let codeExists = false;
        user_code_snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().local_storage_userVisit_code === code) {
                codeExists = true;
            }
        });
        return codeExists;
    } catch (error) {
        console.log('Error fetching in findCodeInDB:', error);
        return false;
    }
}

// Function to save a code to the database
const saveCodeToDB = async (code) => {
    try {
        const myMsgRef = database.ref('All_visited_user_local_storage_code');
        await myMsgRef.push().set({ local_storage_userVisit_code: code });
    } catch (error) {
        console.error("Error saving data:", error);
    }
}

// Function to update the visit count
const updateVisitCount = async () => {
    try {
        const userVisitRef = database.ref('users_visit_count');
        const snapshot = await userVisitRef.once('value');
        let userVisitCount = snapshot.val()?.visit_count || 0;
        userVisitCount += 1;
        await userVisitRef.set({ visit_count: userVisitCount });
    } catch (error) {
        console.error("Error updating visit count:", error);
    }
}

// Function to fetch and display visit data
const fetchToShow_visit_data = async () => {
    try {
        const userVisitRef = database.ref('users_visit_count');
        const snapshot = await userVisitRef.once('value');
        const userVisitCount = snapshot.val()?.visit_count || '" opps! error occurred "';
        const visitDataElement = document.getElementById('site_visit_data');
        if (visitDataElement) {
            visitDataElement.innerText = userVisitCount;
        } else {
            console.error("Element with id 'site_visit_data' not found.");
        }
    } catch (error) {
        console.error("Error fetching visit data:", error);
    }
}

// Function to get or generate a local storage code
const getLocalStorageCode = async () => {
    let LS_code = localStorage.getItem('local_storage_userVisit_code');
    if (LS_code === null) {
        let G_code;
        let codeInDatabase;
        do {
            G_code = generateRandomCodeForUser();
            codeInDatabase = await findCodeInDB(G_code);
        } while (codeInDatabase);

        localStorage.setItem('local_storage_userVisit_code', G_code);
        await saveCodeToDB(G_code);
        await updateVisitCount();
        await fetchToShow_visit_data();

        LS_code = G_code;
        console.log('WELCOME "This is first time you visit my portfolio Thank you" ');
    } else {
        console.log('WELCOME AGAIN "You already visited my portfolio before" ');
        await fetchToShow_visit_data();
        OpenLinkInNewTab('https://learn.microsoft.com/en-us/training/modules/get-started-ai-fundamentals/?wt.mc_id=studentamb_396769'); // DELETE PART
    }
}

// other Ui funcanility ...............................


const toggleBtn = document.querySelector('.toggle_btn');
const toggleNav = document.querySelector('.toggle_nav');
const toggle_nav_close = document.getElementById('toggle_nav_close');

document.getElementById("close_bar").style.display = "none";
document.getElementById("open_bar").style.display = "block";
let ckeck_toggle = true;
toggleBtn.addEventListener('click', () => {
    toggleNav.classList.toggle('open');
    if (ckeck_toggle) {
        document.getElementById("close_bar").style.display = "block";
        document.getElementById("open_bar").style.display = "none";
        ckeck_toggle = false;
    } else {
        document.getElementById("close_bar").style.display = "none";
        document.getElementById("open_bar").style.display = "block";
        ckeck_toggle = true;
    }
});
toggle_nav_close.addEventListener('click', () => {
    toggleNav.classList.toggle('open');
    if (ckeck_toggle) {
        document.getElementById("close_bar").style.display = "block";
        document.getElementById("open_bar").style.display = "none";
        ckeck_toggle = false;
    } else {
        document.getElementById("close_bar").style.display = "none";
        document.getElementById("open_bar").style.display = "block";
        ckeck_toggle = true;
    }
});
// ................... resume download ...............


function downloadResume() {
    var link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/1xf-J0xC0ZZbxpkld0HmKDVPCvIeFSDes/view?usp=drive_link';
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


// .................. Toggle Nav BarProp ............... 
// let bool = true;
// document.getElementById("lightMode").disabled = true;

// document.getElementById("darkmode-toggle").onclick = function () {
//     if (bool) {
//         bool = false;
//         document.getElementById("lightMode").disabled = false;
//     } else {
//         bool = true;
//         document.getElementById("lightMode").disabled = true;
//     }
// };

// $(window).scroll(function () {
//     if ($(window).scrollTop() > 10) {
//         $('.nav').addClass('floatingNav');
//     } else {
//         $('.nav').removeClass('floatingNav');
//     }
// });

// .......................profile back circle move ........................

const text = document.querySelectorAll('.text_one #p_one');
const text2 = document.querySelectorAll('.text_two #p_two');
const text3 = document.querySelectorAll('.text_three #p_three');
text.forEach(paragraph => {
    paragraph.innerHTML = paragraph.innerText.split('').map(
        (char, i) =>
            `<span style="transform:rotate(${i * 8.3}deg)">${char}</span>`
    ).join('');
});
text2.forEach(paragraph => {
    paragraph.innerHTML = paragraph.innerText.split('').map(
        (char, i) =>
            `<span style="transform:rotate(${i * 9}deg)">${char}</span>`
    ).join('');
});
text3.forEach(paragraph => {
    paragraph.innerHTML = paragraph.innerText.split('').map(
        (char, i) =>
            `<span style="transform:rotate(${i * 11}deg)">${char}</span>`
    ).join('');
});



// .........................events_and_certification...............................


async function fetchJSON(url) {
    const response = await fetch(url);
    return response.json();
}

async function loadDataAndProcess() {
    const recb_sec1_input = document.getElementById('recb_sec1_input');
    const recb_btn = document.getElementById('recb_btn');
    const recb_title = document.getElementById('recb_title');
    const recb_companyname = document.getElementById('recb_companyname');
    const recb_exp_about = document.getElementById('recb_exp_about');
    const scrimg = document.getElementById('scrimg');
    const recb_btn_before_div = document.getElementById('recb_btn_before_div');
    const recb_btn_a = document.getElementById('recb_btn_a');
    let data = await fetchJSON('./recb_img_data.json');
    let keys = Object.keys(data);

    recb_sec1_input.addEventListener('change', async function () {
        if (this.checked) {
            data = await fetchJSON('./recb_event_data.json');
            keys = Object.keys(data);
            recb_btn.style.display = 'none';
        } else {
            data = await fetchJSON('./recb_img_data.json');
            keys = Object.keys(data);
            recb_btn.style.display = 'block';
        }
    });

    let i = 0;
    while (true) {
        const key = keys[i];
        const item = data[key];

        recb_title.innerHTML = item.recb_title;
        recb_title.style.color = `#${item.heading_color}`;
        recb_title.style.textShadow = `0px 0px 25px #${item.heading_color}`;
        recb_companyname.innerHTML = item.recb_company;
        recb_exp_about.innerHTML = item.recb_about;
        scrimg.src = item.src;
        recb_btn.style.border = `1px solid #${item.heading_color}`;
        recb_btn_before_div.style.backgroundColor = `#${item.heading_color}`;
        recb_btn_a.href = item.view_link;

        await new Promise(resolve => setTimeout(resolve, 5000));

        i = (i + 1) % keys.length;
    }
}

loadDataAndProcess();

// .........................................background blur effect .........................................

function attachMouseMoveListener(profileMain, cursorBackBlurEffect) {
    profileMain.addEventListener('mousemove', function (event) {
        const rect = profileMain.getBoundingClientRect();
        const mouseX = ((event.clientX - rect.left) - (cursorBackBlurEffect.offsetWidth / 2));
        const mouseY = ((event.clientY - rect.top) - (cursorBackBlurEffect.offsetHeight / 2));
        cursorBackBlurEffect.style.left = (mouseX) + 'px';
        cursorBackBlurEffect.style.top = (mouseY) + 'px';
        //   console.log('Mouse coordinates relative to main div: ', mouseX, mouseY);
        //   console.log(cursorBackBlurEffect.offsetHeight);
    });

    cursorBackBlurEffect.addEventListener('mousemove', function (event) {
        event.stopPropagation();
    });
}

const socialProfileMain = document.querySelector('.social_profile_main');
const socialCursorBackBlurEffect = document.querySelector('.social_cursor_back_blur_effect');
attachMouseMoveListener(socialProfileMain, socialCursorBackBlurEffect);

const codingProfileMain = document.querySelector('.coding_profile_main');
const codingCursorBackBlurEffect = document.querySelector('.coding_cursor_back_blur_effect');
attachMouseMoveListener(codingProfileMain, codingCursorBackBlurEffect);

const pms_card = document.querySelector('.pms_card');
const pms_card_back_blur_effect = document.querySelector('.pms_card_back_blur_effect');
attachMouseMoveListener(pms_card, pms_card_back_blur_effect);



// coming soon----------------------------

var countDownDate = new Date();
countDownDate.setDate(countDownDate.getDate() + 4);

// Update the countdown every 1 second
var x = setInterval(function () {

    // Get the current date and time
    var now = new Date().getTime();

    // Calculate the remaining time
    var distance = countDownDate - now;

    // Calculate days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the countdown
    document.querySelector(".days").innerText = days < 10 ? `0${days}` : days;
    document.querySelector(".hours").innerText = hours < 10 ? `0${hours}` : hours;
    document.querySelector(".minutes").innerText = minutes < 10 ? `0${minutes}` : minutes;
    document.querySelector(".seconds").innerText = seconds < 10 ? `0${seconds}` : seconds;

    // If the countdown is over, display a message
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "<p>EXPIRED</p>";
    }
}, 1000);

// .................. OpenLinkInNewTab .......................

function OpenLinkInNewTab(url) {
    window.open(url, '_blank').focus();
}

// .................. upComingFeatureAlert .......................
function upComingFeatureAlert() {
    alert("This feature is coming soon");
}

// when open this site one alert will show

async function intro_alert() {
    alert("site is under development, features adding soon . please visit again after some time. we are going to redirect you on free course section on Microsoft website");
    // OpenLinkInNewTab('https://learn.microsoft.com/en-us/training/modules/get-started-ai-fundamentals/?wt.mc_id=studentamb_396769');
}



getLocalStorageCode();




//.................Implement Your Feedback.......................

const ValidateFeedbackInput = () => {
        const nameElement = document.getElementById('fed_input_name');
        nameElement.addEventListener('input', (e) => {
            const namePattern = /[^a-zA-Z ]/.test(e.target.value);
            if (e.target.value.trim() === "") {
                document.getElementById('fed_input_name_error').innerHTML = 'This is not a valid name';
            } else if (namePattern) {
                document.getElementById('fed_input_name_error').innerHTML = 'This is not a valid name';
            } else {
                document.getElementById('fed_input_name_error').innerHTML = '';
            }
        });
    
        const emailElement = document.getElementById('fed_input_email');
        emailElement.addEventListener('input', (e) => {
            const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+(com|COM)$/.test(e.target.value.trim());
            if (e.target.value === "") {
                document.getElementById('fed_input_email_error').innerHTML = 'Please enter valid email address';
            } else if (emailPattern) {
                document.getElementById('fed_input_email_error').innerHTML = '';
            } else {
                document.getElementById('fed_input_email_error').innerHTML = 'Please enter valid email address';
            }
        });
        const messageElement = document.getElementById('fed_input_message');
        messageElement.addEventListener('input', (e) => {
            if (e.target.value === "") {
                document.getElementById('fed_input_message_error').innerHTML = 'Enter your message, it cannot be null';

            } else {
                document.getElementById('fed_input_message_error').innerHTML = '';

            }
        });
}
ValidateFeedbackInput();

const FeedBackFromSubmit = async() => {
    const error_name = document.getElementById('fed_input_name_error').innerHTML.length === 0;
    const error_email = document.getElementById('fed_input_email_error').innerHTML.length === 0;
    const error_message = document.getElementById('fed_input_message_error').innerHTML.length === 0;
    const name_value = document.getElementById('fed_input_name').value;
    const email_value = document.getElementById('fed_input_email').value;
    const message_value = document.getElementById('fed_input_message').value;
    const checkNullInput = name_value!=''&&email_value!=''&&message_value!='';

    if(error_name&&error_email&&error_message&&checkNullInput){
        try {
            const myMsgRef = database.ref('User_FeedBack_Data');
            await myMsgRef.push().set({
                Name : name_value,
                Email : email_value,
                Message : message_value
            });

            await sendMail(email_value,name_value);

            document.querySelector('.non_submit_animation').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.non_submit_animation').style.display = 'none';
            }, 7000);

        } catch (error) {
            console.error("Error saving data:", error);
            document.querySelector('.non_error_animation').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.non_error_animation').style.display = 'none';
            }, 3000);
        }
    }else{
        document.querySelector('.non_error_animation').style.display = 'block';
        setTimeout(() => {
            document.querySelector('.non_error_animation').style.display = 'none';
        }, 3000);
    }
    document.getElementById('feedback_form_org').reset();
};


const sendMail = async (email, name) => {
    const mailApiUrl = "https://email-sender-api-five.vercel.app/api/sendMailFromVishalServer";

    const postData = {
        email: email,
        name:name
    };

    // Options for the fetch request
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
    };
    fetch(mailApiUrl, options)
    .then((response) => response.json())
    .then((data) => {
        // Process the response data from the API
        if (data.message == "Email successfully send" && data.success == true) {
            console.log("mail send");
        }
        else if(data.message == "Server error" && data.success == false){
            console.log("internal server error on email send");
        }
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Server Error");
    });
};


// ..................... Open Gmail in APP if user in mobile 


function isMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iPhone|iPad|iPod/i.test(userAgent);
}

function openGmail() {
    if (isMobile()) {
        // Attempt to open the Gmail app on Android
        window.location.href = 'intent://mail/#Intent;scheme=https;package=com.google.android.gm;end';
        // If the above fails, fallback to Gmail web (a timeout can be set to handle fallback gracefully)
    } else {
        // Open Gmail web page on desktop
        window.location.href = 'https://gmail.google.com/';
    }
}