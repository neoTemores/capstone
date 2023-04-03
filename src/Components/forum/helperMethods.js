
export const hideAll = (classToFind) => {
    document.querySelectorAll(classToFind).forEach(elem => elem.classList.add('hide'))
}
export const showAll = (classToFind) => {
    document.querySelectorAll(classToFind).forEach(elem => elem.classList.remove('hide'))
}

export const hideSpecific = (classToFind, target) => {
    document.querySelectorAll(classToFind).forEach(elem => {
        if (elem.dataset.id == target)
            return elem.classList.add("hide")
    })
}

export const showSpecific = (classToFind, target) => {
    let result;
    document.querySelectorAll(classToFind).forEach(elem => {
        if (elem.dataset.id == target) {
            elem.classList.remove("hide")
            result = elem;
        }
    })
    return result;
}

export const focusElement = (classToFind, target) => {
    document.querySelectorAll(classToFind).forEach(elem => {
        if (elem.dataset.id == target) {
            elem.focus()
            return
        }
    })
}

export const containsComment = (id, allComments) => {
    let result = false
    allComments.forEach(comment => {
        if (comment.postId == id) {
            result = true;
        }
    })
    return result;
}
