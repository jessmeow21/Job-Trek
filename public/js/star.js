// document.addEventListener("DOMContentLoaded", function() {
//     addListeners();
//     setRating();
// });

// function addListeners() {
//   var stars = document.querySelectorAll(".star");
//   [].forEach.call(stars, function(star, index) {
//     star.addEventListener("click", (function(idx) {
//       console.log("adding rating on", index);
//       document.querySelector(".stars").setAttribute("data-rating", idx + 1);
//       console.log("Rating is now", idx + 1);
//       setRating();
//     }).bind(window, index));
//   });
//   });
// }

// function setRating() {
//   var stars = document.querySelectorAll(".star");
//   var rating = parseInt(document.querySelector(".stars").getAttribute("data-rating"));
//   [].forEach.call(stars, function(star, index) {
//     if (rating > index) {
//       star.classList.add("rated");
//       console.log("added rated on", index);
//     } else {
//       star.classList.remove("rated");
//       console.log("removed rated on", index);
//     }
//   });
// }
