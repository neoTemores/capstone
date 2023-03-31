
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

export const showAddCommentTextArea = (e) => {
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



//edit comment methods

export const hideAllEditTextAreas = () => {
    document.querySelectorAll(".editCommentTextArea").forEach(elem => elem.classList.add('hide'))
}
export const showEditCommentTextArea = (e) => {
    document.querySelectorAll(".editCommentTextArea").forEach(elem => {
        if (elem.dataset.commentId == e.target.dataset.commentId) {
            return elem.classList.remove('hide')
        }
    })
}

export const showAllCommentBodies = () => {
    document.querySelectorAll(".commentBody").forEach(elem => elem.classList.remove('hide'))
}

export const hideCurrentCommentBody = (e) => {
    document.querySelectorAll(".commentBody").forEach(elem => {
        if (elem.dataset.commentId == e.target.dataset.commentId) {
            return elem.classList.add('hide')
        }
    })
}

export const hideCommentEditDeleteBtns = (e) => {
    document.querySelectorAll(".commentEditDeleteBtn").forEach(elem => {
        elem.classList.remove('hide')
        if (elem.dataset.commentId === e.target.dataset.commentId)
            elem.classList.add('hide')
    })
}

export const showUpdateCancelEditBtns = (e) => {
    document.querySelectorAll(".commentUpdateCancelEditBtn").forEach(elem => {
        elem.classList.add('hide')
        if (elem.dataset.commentId === e.target.dataset.commentId)
            elem.classList.remove('hide')
    })
}

