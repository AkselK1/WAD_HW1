document.addEventListener('DOMContentLoaded', function() {
    const profilePicture = document.getElementById('profilePicture');
    const dropdown = document.getElementById('profileDropdown');

    profilePicture.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && !profilePicture.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
});