function buildElement(tag, className = null) {
    const element = document.createElement(tag);
    className !== null ? element.classList.add(className) : null;
    return element;
}

export function buildPost(message, currentUser) {

    // .post
    const post = buildElement("li", "post");

    // .post__avatar
    const avatar = buildElement("span", "post__avatar");
    avatar.textContent = message.author.username[0].toUpperCase();

    // name
    const name = buildElement("strong");
    name.textContent = message.author.username;

    // .post__date
    const date = buildElement("span", "post__date");
    const updatedDate = message.updatedAt !== null ? " · modifié" : "";
    date.textContent = message.createdAt + updatedDate;

    // .post__meta
    const meta = buildElement("div", "post__meta");

    meta.appendChild(name);
    meta.appendChild(date);

    // .post__header
    const header = buildElement("div", "post__header");

    header.appendChild(avatar);
    header.appendChild(meta);

    // .post__content
    const content = buildElement("p", "post__content");
    content.textContent = message.content;

    // Première création de l'élément
    post.appendChild(header);
    post.appendChild(content);

    // CONDITIONNEL

    if(currentUser.id === message.author.id) {
        // a.post__button
        const updateButton = buildElement("a", "post_button");
        updateButton.textContent = "Modifier";
        updateButton.setAttribute("href", `modifier.html?id=${message.id}`)

        // button.post__button
        const removeButton = buildElement("button", "post_button");
        removeButton.classList.add("post__button--danger")
        removeButton.textContent = "Supprimer";

        // .post__actions
        const actions = buildElement("div", "post__actions");

        actions.appendChild(updateButton);
        actions.appendChild(removeButton);
        post.appendChild(actions);

        // Ajout de la carte
        post.classList.add("post--mine");
    }

    return post;

}

/*

    <li class="post post--mine">
        <div class="post__header">
            <span class="post__avatar">C</span>
            <div class="post__meta">
                <strong>Camille</strong>
                <span class="post__date">21 nov. 2026, 15:30 · modifié</span>
            </div>
        </div>
        <p class="post__content">Petit conseil : testez vos routes avec REST Client.</p>
        <div class="post__actions">
            <a href="modifier.html?id=3" class="post__button">Modifier</a>
            <button type="button" class="post__button post__button--danger">Supprimer</button>
        </div>
    </li>

*/