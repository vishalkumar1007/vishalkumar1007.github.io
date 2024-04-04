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
    link.href = 'https://drive.google.com/file/d/13SjJ_G1CmiBkJcBoWM2i48UiRuTStgAI/view?usp=sharing';
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


// .................. Toggle Nav BarProp ............... 
let bool = true;
document.getElementById("lightMode").disabled = true;

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

    recb_sec1_input.addEventListener('change', async function() {
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
    profileMain.addEventListener('mousemove', function(event) {
      const rect = profileMain.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left)-(cursorBackBlurEffect.offsetWidth/2));
      const mouseY = ((event.clientY - rect.top)-(cursorBackBlurEffect.offsetHeight/2));
      cursorBackBlurEffect.style.left = (mouseX ) + 'px';
      cursorBackBlurEffect.style.top = (mouseY ) + 'px';
    //   console.log('Mouse coordinates relative to main div: ', mouseX, mouseY);
    //   console.log(cursorBackBlurEffect.offsetHeight);
    });

    cursorBackBlurEffect.addEventListener('mousemove', function(event) {
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
    var x = setInterval(function() {

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
    window.open(url, '_blank');
}

// .................. upComingFeatureAlert .......................
function upComingFeatureAlert() {
    alert("This feature is coming soon");
}

// when open this site one alert will show

function intro_alert(){
    alert("This site is under development phase , many new features will come soon . please visit again after some time.");
}


// user visit show . 