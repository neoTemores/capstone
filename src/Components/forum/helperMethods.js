
export const showAllAddCommentBtns = () => {
    document.querySelectorAll(".addCommentBtn").forEach(item => item.classList.remove('hide'))
}

export const hideCurrentCommentBtn = (e) => {
    document.querySelectorAll(".addCommentBtn").forEach(item => {
        if (item.dataset.postId == e.target.dataset.postId)
            return item.classList.add("hide")
    })
}

export const hideAllTextAreas = () => {
    document.querySelectorAll(".newCommentContainer").forEach(item => item.classList.add("hide"))
}

export const showCurrentTextArea = (e) => {
    document.querySelectorAll(".newCommentContainer").forEach(item => {
        if (item.dataset.postId == e.target.dataset.postId) {
            item.classList.toggle("hide")
            return item.childNodes[0].focus()
        }
    })
}

export const containsComment = (id, allComments) => {
    let result = false;
    allComments.forEach(comment => {
        if (comment.postId === id)
            result = true;
    })
    return result;
}

