function toggleAnswers(commentID) {
    var answerSection = document.getElementById("comment-user-answers-" + commentID);
    answerSection.classList.toggle("comment-user-answers");
}
