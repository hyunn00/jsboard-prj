const writeForm = document.querySelector('#writeForm')
// console.log(writeForm)

function Board(idx) {
    // const {idx, title, writer, content} = Object.fromEntries(parama)
    this.idx = idx
    this.title = ""
    this.writer = ""
    this.content = ""
    this.date = recordDate()
    this.views = 0
}

Board.prototype.setTitle = function(value) {
    if(value.length === 0) {
        throw new Error('제목을 입력하시오.')
    }
    this.title = value
    return value;
}

Board.prototype.setWriter = function(value) {
    if(value.length === 0) {
        throw new Error('작성자를 입력하시오.')
    }
    this.writer = value
    return value;
}

Board.prototype.setContent = function(value) {
    if(value.length === 0) {
        throw new Error('내용을 입력하시오.')
    }
    this.content = value
    return value;
}

function recordDate() {
    const date = new Date()
    const yyyy= date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2,"0")
    const dd = String(date.getDate()).padStart(2, "0")

    return `${yyyy}-${mm}-${dd}`
}

const submitHandler = (e) => {
    e.preventDefault()
    // console.log(e)

    // const title = e.target.title.value
    // const writer = e.target.writer.value
    // const content = e.target.content.value
    // console.log(`${title} - ${writer} - ${content}`)

    try {
        const boardObj = JSON.parse(localStorage.getItem('boards')) || [];
        const idx = boardObj.length > 0 ? boardObj[boardObj.length-1].idx + 1 : 1
    
        const instance = new Board(idx)
        instance.setTitle(e.target.title.value)
        instance.setWriter(e.target.writer.value)
        instance.setContent(e.target.content.value)
        // console.log(instance)
        
        boardObj.push(instance)
        // console.log(boardObj)
        localStorage.setItem('boards', JSON.stringify(boardObj))

        location.href=`view.html?index=${idx}`
    } catch(e) {
        // console.log(e)
        alert(e)
    }

    
}

writeForm.addEventListener("submit", submitHandler)

const backBtn = document.querySelector('#back')

const backBtnHandler = (e) => {
    e.preventDefault()
    location.href = './list.html'
}

backBtn.addEventListener('click', backBtnHandler)