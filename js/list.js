// const boardStr = localStorage.getItem('boards')
// const boardObj = JSON.parse(boardStr) || {}
// console.log(boardObj)
// // if(boardStr === null) {
// //     const listStr = JSON.stringify([])
// //     localStorage.setItem('boards', listStr)
// //     boardStr = listStr
// // }

let searchTerm = ""

function JsonBoard(dataUrl, boardLimit, pageLimit, isDese, BtnActiveClassName) {
    this.dataUrl = dataUrl
    this.boardLimit = boardLimit
    this.pageLimit = pageLimit
    this.postCount;
    this.maxPage;
    this.currPage = 1
    this.blockNum = 0
    this.isDese = isDese
    this.BtnActiveClassName = BtnActiveClassName
}

function readDataFromLocalStorage() {
    return new Promise((resolve, reject) => {
        const data = localStorage.getItem('boards')
        if (data) {
            resolve(data)
        } else {
            reject(new Error("데이터가 없습니다."))
        }
    })
}

JsonBoard.prototype.getBoardLocalStorage = function (
    searchTerm,
    pageNum,
    callback
) {
    readDataFromLocalStorage()
        .then((data) => {
            const select = document.getElementById('select').value
            // console.log(select)
            //여기까지는 data가 json 형식
            const contents = searchObjects(searchTerm, select, data)
            // console.log(`데이터를 읽어 왔습니다. ${contents.length}`)
            this.postCount = contents.length
            this.maxPage = Math.ceil(this.postCount / this.boardLimit)

            // console.log(`postCount : ${this.postCount}`)
            // console.log(`maxPage : ${this.maxPage}`)

            const start = (pageNum - 1) * this.boardLimit
            if (pageNum === this.maxPage) {
                boardArr = contents.slice(start, this.postCount)
            } else {
                boardArr = contents.slice(
                    start, start + Number(this.boardLimit)
                )
            }
            // console.log(boardArr)
            callback(boardArr)
        })
        .catch((error) => {
            console.log('에러 발생', error)
        })
}

JsonBoard.prototype.printBoard = function (e) {
    let idxNum = Number((board.currPage-1) * board.pageLimit+1)
    
    const template = (idx, objValue) => {
        return `
        <ul>
            <li>${idxNum}</li>
            <li><a href="view.html?index=${objValue.idx}">${objValue.title}</a></li>
            <li>${objValue.writer}</li>
            <li>${objValue.date}</li>
            <li>${objValue.views}</li>
        </ul>
        `
    }

    const postList = document.querySelector('#post-list')
    postList.innerHTML = ""

    e.forEach((boardObj, idx) => {
        const row = template(idx, boardObj);
        postList.innerHTML += row
        idxNum++;
    })
}

// isDesc 작업 하면 true-> false로 변경
const board = new JsonBoard('boards', 5, 5, true, "active")
// console.log(board)

    // 즉시 실행 함수
    ; (function () {
        board.getBoardLocalStorage(searchTerm, 1, (e) => {
            // console.log(e)
            // console.log(`postCount : ${e.postCount}`)
            // console.log(`maxPage : ${e.maxPage}`)
            board.printBoard(e)
            board.printPage(e)
            activeBtn(1)
        })
    })()

function buildBoard(currPage) {
    board.getBoardLocalStorage(searchTerm, currPage, (e) => {
        board.printBoard(e)
    })
}

function pickBoard(pickNum) {
    removeBtn(board.currPage)
    board.currPage = pickNum
    activeBtn(pickNum)
    buildBoard(board.currPage)
}

JsonBoard.prototype.printPage = function () {
    const pStart = Number(this.pageLimit * this.blockNum) + Number(1)

    let pCount;
    if (Number(this.pageLimit * this.blockNum) + Number(this.pageLimit) > this.maxPage) {
        pCount = this.maxPage
    } else {
        pCount = Number(this.pageLimit * this.blockNum) + Number(this.pageLimit)
    }

    let str = `<button class="pageBtn" id="prev" onclick="prevBoard()">&lt;</button>`

    for (let i = pStart; i <= pCount; i++) {
        str += `<button class="pageBtn" onclick="pickBoard(${i})">${i}</button>`
    }

    str += `<button class="pageBtn" id="next" onclick="nextBoard()"> &gt;</button>`

    document.getElementById('paging').innerHTML = str
}

document.getElementById('searchBtn')
    .addEventListener('click', () => {
        searchTerm = document.getElementById('searchInput').value

        const { currPage, maxPage, pageLimit, blockNum } = board
        // console.log(searchTerm)
        board.getBoardLocalStorage(searchTerm, currPage, (e) => {
            board.printBoard(e)
            board.printPage()
        })
    })

function activeBtn(n) {
    n = n - board.pageLimit * board.blockNum
    const pageBtnEle = document.getElementsByClassName('pageBtn')
    pageBtnEle[n].className += " " + board.BtnActiveClassName;
}

function removeBtn(n) {
    n = n - board.pageLimit * board.blockNum
    const pageBtnEle = document.getElementsByClassName('pageBtn')
    const check = new RegExp("(\\s|^)" + board.BtnActiveClassName + "(\\s|$)")
    pageBtnEle[n].className = pageBtnEle[n].className.replace(check, " ").trim()
}

function prevBoard() {
    const { currPage, pageLimit, blockNum } = board;
    if (currPage <= 1) {
        return
    } else {
        if (currPage - 1 <= pageLimit * blockNum) {
            board.blockNum = blockNum - 1;
            board.printPage()
        }
        removeBtn(currPage)
        activeBtn(currPage - 1)
        buildBoard(--board.currPage)
    }
}

function nextBoard() {
    const { currPage, maxPage, pageLimit, blockNum } = board;
    if (currPage >= maxPage) {
        return
    } else {
        if (pageLimit * Number(blockNum + 1) < Number(currPage + 1)) {
            board.blockNum = Number(blockNum + 1);
            board.printPage()
        }
        removeBtn(currPage)
        activeBtn(currPage + 1)
        buildBoard(++board.currPage)
    }
}

function searchObjects(searchTerm, select, data) {
    searchTerm = searchTerm.toLowerCase()

    data = JSON.parse(data)
    return data.filter((item) => {
        // console.log(`${searchTerm} === ${item.title}`)
        switch(select) {
            case 'all' :
                return (
                    item.title.toLowerCase().includes(searchTerm) ||
                    item.writer.toLowerCase().includes(searchTerm) ||
                    item.content.toLowerCase().includes(searchTerm)
                )
            case 'title' :
                return (
                    item.title.toLowerCase().includes(searchTerm)
                )
            case 'writer' :
                return (
                    item.writer.toLowerCase().includes(searchTerm)
                )
        }
    })
}