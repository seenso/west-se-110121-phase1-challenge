// write your code here
const url = "http://localhost:3000/images/1";
const imgContainer = document.querySelector(".image-container");
const imgCard = document.querySelector(".image-card");

//render feed
fetch(url)
.then(res => res.json())
.then(data => { // returns obj with id, image, likes, title, comments (arr of obj with id, imageId, content)
  imgContainer.innerHTML = "";  //clear out placeholder image card
  //create image Card 1
  renderCard(data);
});

function renderCard(data) {
  //img card container
  let container = document.createElement("div");
    container.className = "image-card";

  //img contents

  //TITLE
  let title = document.createElement("h2");
    title.id = "card-image";
    title.className = "title";
    title.innerText = data.title;
    container.append(title);
    
    //IMAGE
    let image = document.createElement("img");
    image.id = "card-image";
    image.className = "image";
    image.src = data.image;
    image.alt = data.title;
    toggleImage(data, title, image);
    container.append(image);

  //LIKES
  let likesSection = document.createElement("div");
    likesSection.className = "likes-section";
    let likesSpan = document.createElement("span");
      likesSpan.id = "like-count";
      likesSpan.className = "likes";
      likesSpan.textContent = `${data.likes} Likes`;
      likesSection.append(likesSpan);
    let likeBttn = document.createElement("button");
      likeBttn.id = "like-button";
      likeBttn.className = "like-button";
      likeBttn.textContent = "♥";
      likesSection.append(likeBttn);
      likeBttn.addEventListener("click", e => {
        e.preventDefault();
        data.likes++;
        likesSpan.textContent = `${data.likes} Likes`;
      });
    container.append(likesSection);

  //COMMENTS CONTAINER
  let commentsList = document.createElement("ul");
    commentsList.id = "comments-list";
    commentsList.className = "comments";
    data.comments.forEach(commentObj => {
      let comment = document.createElement("li");
      comment.innerText = commentObj.content;
      commentsList.append(comment);
    })
    container.append(commentsList);
  
  //COMMENT FORM & ADD COMMENT LISTENER
  let commentForm = document.createElement("form");
    commentForm.id = "comment-form";
    commentForm.className = "comment-form";
      let formInput = document.createElement("input");
        formInput.className = "comment-input"
        formInput.type = "text";
        formInput.name = "comment";
        formInput.id = "comment";
        formInput.placeholder = "Add a comment...";
        commentForm.append(formInput);
      let formButton = document.createElement("button");
        formButton.className = "comment-button";
        formButton.type = "submit";
        formButton.textContent = "Post";
        commentForm.append(formButton);

    //add event listener for posting
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let newComment = document.createElement("li");
      newComment.innerText = formInput.value;
      commentsList.append(newComment);
      addCommentDelete(newComment);
    });

    container.append(commentForm);

  //Add to Feed
  imgContainer.append(container);
};

//BONUS DELIVERABLES

//1. remove comment when clicked **no persistence**
  //added event listener to commentForm's event listener
function addCommentDelete(newComment) {
  newComment.addEventListener("click", (e) => {
    e.target.remove();
    console.log("newComment", e.target);
  });
}

//2. Click title of image to toggle image displayed
function toggleImage(data, title, image) {
  console.log("TOGGLEIMG DATA", data);

  title.addEventListener("click", (e) => {
    e.preventDefault();
    if (image.src === " ") {
      image.src = data.image;
    } else {
      image.src = ' ';
    }
  });
}