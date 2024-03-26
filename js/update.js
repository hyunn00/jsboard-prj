const modifyForm = document.querySelector('#modifyForm')
const formElements = document.querySelectorAll('#modifyForm > div')

const queryIndex = location.search.split('=')[1]
// console.log(queryIndex)
const boards = JSON.parse(localStorage.getItem('boards'))
const idx = boards.findIndex((item) => item.idx == queryIndex)
const boardToModify = boards[idx]

// console.log(boardToModify)

for(let i=0; i<formElements.length; i++) {
    const inputElement = formElements[i].childNodes[1]
    const fieldName = inputElement.name
    // console.log(inputElement)

    inputElement.value = boardToModify[fieldName]
}

function isEmpty(field, value) {
    if(value.length === 0) {
        throw new Error(`${field} 값을 입력하시오.`)
    }
}

function checkEmpty(field, value) {
    if(value.length === 0) {
        throw new Error(`${field} 값을 입력하시오.`)
    }
    return value
}

function modifyHandler(e) {
    e.preventDefault()

    // const title = e.target.title.value;
    // const writer = e.target.writer.value;
    // const content = e.target.content.value;

    try {
        // isEmpty('제목', title)
        // isEmpty('작성자', writer)
        // isEmpty('내용', content)
    
        // // console.log(`${title} - ${writer} - ${content}`)
        // boardToModify.title = title
        // boardToModify.writer = writer
        // boardToModify.content = content
        // // console.log(boardToModify)
    
        boardToModify.title = checkEmpty("제목", e.target.title.value)
        boardToModify.writer = checkEmpty("작성자", e.target.writer.value)
        boardToModify.content = checkEmpty("내용", e.target.content.value)

        const boardStr = JSON.stringify(boards)
        localStorage.setItem('boards', boardStr)
        location.href = `../view.html?index=${queryIndex}`
    } catch(e) {
        // console.log(e)
        alert(e)
    }
}

modifyForm.addEventListener('submit', modifyHandler)

const backBtn = document.querySelector('#back')

const backBtnHandler = (e) => {
    e.preventDefault()
    location.href = '../list.html'
}

backBtn.addEventListener('click', backBtnHandler)

