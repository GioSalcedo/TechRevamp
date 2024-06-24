window.addEventListener("hashchange", () =>{
  console.log(window.location.hash);
})

// const router = (route) => {
//   switch(route) {
//     case "productos?page=3":
//     return console.log("Page 3");
//     case "productos?page=2":
//       return console.log("Page 3");
//     default:
//       return console.log("Page 1");
//   }
// };