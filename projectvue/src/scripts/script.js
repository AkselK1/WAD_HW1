// Endpoint where JSON data is stored
const endpoint = "https://api.npoint.io/0ee96d0e43f4093eb433";

// Local JSON file path
const localEndpoint = "./scripts/post.json";

// Function to fetch posts from the endpoint
async function fetchPosts() {
    try {
        const response = await fetch(localEndpoint);
        //const response = await fetch(endpoint);
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

// Function to display posts on the webpage
function displayPosts(posts) {
    const postContainer = document.getElementById("post-container");

    posts.forEach(post => {
        // Create a new post frame
        const postFrame = document.createElement("div");
        postFrame.className = "post-frame";

        // Create post div with title, date, and content
        const postDiv = document.createElement("div");
        postDiv.className = "post";

        // Post title
        const postTitle = document.createElement("h2");
        postTitle.textContent = post.title;
        postDiv.appendChild(postTitle);

        // Post date
        const postDate = document.createElement("p");
        postDate.className = "post-date";
        postDate.textContent = new Date(post.create_time).toLocaleDateString();
        postDiv.appendChild(postDate);

        const profilePic = document.createElement("img");
        profilePic.src = "images/profile_picture.jpg";
        profilePic.alt = "Profile Picture";
        profilePic.className = "profile-picture";
        postDiv.appendChild(profilePic);

        // Optional image
        if (post.image_url) {
            const postImage = document.createElement("img");
            postImage.src = post.image_url;
            postImage.alt = post.title;
            postDiv.appendChild(postImage);
        }

        // Post content
        const postContent = document.createElement("p");
        postContent.textContent = post.content;
        postDiv.appendChild(postContent);

        // Likes icon and count
        const likeContainer = document.createElement("div");
        likeContainer.className = "like-container";

        const likeIcon = document.createElement("img");
        likeIcon.src = "images/like.png";
        likeIcon.alt = "Like";
        likeIcon.className = "like-icon";
        likeContainer.appendChild(likeIcon);

        postDiv.appendChild(likeContainer);

        // Append post div to post frame, and post frame to container
        postFrame.appendChild(postDiv);
        postContainer.appendChild(postFrame);
    });
}

// Fetch posts when the page loads
window.onload = fetchPosts;
