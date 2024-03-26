const boardStr = localStorage.getItem('boards')
const boardObj = JSON.parse(boardStr) || {}

const index = location.search
const idx = index.split('=')[1]
// console.log(idx)

const queryIndex = boardObj.findIndex((item) => item.idx == idx)
// console.log(queryIndex)
const board = boardObj[queryIndex] || {}
// console.log(board)


function increaseViewCount() {
    board.views++;
    const viewCountStr = JSON.stringify(boardObj)
    localStorage.setItem('boards', viewCountStr)
}

increaseViewCount()

const viewForm = document.querySelectorAll('#viewForm > div')
// console.log(viewForm)

// for(let i=0; i< viewForm.length; i++) {
//     const id = viewForm[i].id
//     console.log()
//     viewForm[i].innerHTML += `<p>${board[id]}</p>`
// }

viewForm.forEach((element) => {
    const id = element.id
    element.innerHTML += `<span>${board[id]}</span>`
})

const modifyBtn = document.querySelector('#modify')

function modifyBtnHandler() {
    console.log('수정 진입')
    console.log(idx)
    location.href = `../update.html?index=${idx}`
}

modifyBtn.addEventListener('click', modifyBtnHandler)

const deleteBtn = document.querySelector('#delete')

function deleteBtnHandler(e) {
    // console.log(e.target)
    // boardObj.splice(idx, 1)

    const indexRemove = boardObj.findIndex((item) => item.idx == idx)
    if(indexRemove !== -1) {
        boardObj.splice(indexRemove, 1)
    }

    const setBoardStr = JSON.stringify(boardObj)
    localStorage.setItem('boards', setBoardStr)
    location.href = '../list.html'
}

deleteBtn.addEventListener('click', deleteBtnHandler)