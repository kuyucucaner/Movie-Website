document.addEventListener('DOMContentLoaded', function() {
    const timestamp = new Date('<%= comment.Timestamp %>');
    const year = timestamp.getFullYear();
    const month = String(timestamp.getMonth() + 1).padStart(2, '0');
    const day = String(timestamp.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    document.querySelector('.comment-timestamp').textContent = formattedDate;
});
