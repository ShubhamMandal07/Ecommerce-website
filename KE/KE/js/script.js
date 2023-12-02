const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;
let searchForm = document.querySelector('.search-form');



document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    signupForm.classList.remove('active');
   
   // shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
   // navbar.classList.remove('active');
    
}

let shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () =>{
    //shoppingCart.classList.toggle('active');
    signupForm.classList.remove('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
   // navbar.classList.remove('active');
    
}



var LogInStatus = true
let loginForm = document.querySelector('.login-form');



// let LoginForm = document.querySelector('.login-form');

// document.querySelector('#loginbtn').onclick = () =>{
//     LoginForm.classList.toggle('active');
//     signupForm.classList.remove('active');
//     searchForm.classList.remove('active');
//    // shoppingCart.classList.remove('active');
//    // navbar.classList.remove('active');
    
// }

let signupForm = document.querySelector('.signup-form');



let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
   // navbar.classList.toggle('active');
    searchForm.classList.remove('active');
   // shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    signupForm.classList.remove('active');
}

window.onscroll = () =>{
    searchForm.classList.remove('active');
    
    // shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    signupForm.classList.remove('active');
   // navbar.classList.remove('active');
}



document.getElementById('test').onclick = function(){
  signupForm.classList.toggle('active')
}

var swiper = new Swiper(".home-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop:true,
});

var swiper = new Swiper(".review-slider", {
  spaceBetween: 10,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  loop:true,
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 3000);
}

window.onload = fadeOut;
imgBtns.forEach((imgItem) => {
  imgItem.addEventListener('click', (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
  });
});

function slideImage(){
  const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

  document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);