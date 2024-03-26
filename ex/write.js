// const boardTitle = document.querySelector('#board-title')
// const boardWriter = document.querySelector('#board-writer')
// const boardContent = document.querySelector('#board-content')
// const boardBtn = document.querySelector('#board-button')
// const boardList = document.querySelector('#board-list')
// let boardNum = 1

// document.addEventListener('DOMContentLoaded', getLocal)
// boardBtn.addEventListener('click', addBoard)
// // boardList.addEventListener('click', manageBoard)

// function getLocal() {
//     let boards;
//     if (localStorage.getItem('boards') === null) {
//         boards = []
//     } else {
//         boards = JSON.parse(localStorage.getItem('boards'))
//     }

//     boards.forEach(function (board) {
//         const newDiv = document.createElement('div')

//         const newTitle = document.createElement('li')
//         newTitle.innerText = boardTitle.value;
//         newDiv.appendChild(newTitle)

//         const newWriter = document.createElement('li')
//         newWriter.innerText = boardWriter.value;
//         newDiv.appendChild(newWriter)

//         const checkBtn = document.createElement('button')
//         checkBtn.innerText = '상세 보기'
//         newDiv.appendChild(checkBtn)

//         const deleteBtn = document.createElement('button')
//         deleteBtn.innerText = '삭제'
//         newDiv.appendChild(deleteBtn)

//         boardList.appendChild(newDiv)
//         boardTitle.value = ""
//         boardWriter.value = ""
//         boardContent.value = ""
//     })
// }

// function addBoard(e) {
//     e.preventDefault();

//     const newDiv = document.createElement('div')

//     const newTitle = document.createElement('li')
//     newTitle.innerText = boardTitle.value;
//     newDiv.appendChild(newTitle)

//     const newWriter = document.createElement('li')
//     newWriter.innerText = boardWriter.value;
//     newDiv.appendChild(newWriter)

//     saveToLocal(boardTitle.value, boardWriter.value, boardContent.value)

//     const checkBtn = document.createElement('button')
//     checkBtn.innerText = '상세 보기'
//     newDiv.appendChild(checkBtn)

//     const deleteBtn = document.createElement('button')
//     deleteBtn.innerText = '삭제'
//     newDiv.appendChild(deleteBtn)

//     boardList.appendChild(newDiv)
//     boardTitle.value = ""
//     boardWriter.value = ""
//     boardContent.value = ""
// }

// function saveToLocal(title, writer, content) {
//     let boards;
//     if (localStorage.getItem('boards') === null) {
//         boards = []
//     } else {
//         boards = JSON.parse(localStorage.getItem('boards'))
//     }

//     // 객체 만들어서 집어넣기 수정하기
//     boards.push(`{title : ${title}, writer : ${writer}, content : ${content}}`)
//     localStorage.setItem('boards', JSON.stringify(boards))
// }