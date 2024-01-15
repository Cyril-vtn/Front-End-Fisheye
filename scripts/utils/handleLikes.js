function incrementLikes(likes, id) {
  const likesValue = document.getElementById(id);
  const likeTotal = document.getElementById('sum');

  likesValue.children[0].textContent = likes + 1;
  const result = likes + 1;

  if (result) {
    likeTotal.textContent = parseInt(likeTotal.textContent) + 1;
    likesValue.children[1].disabled = true;
  }
}