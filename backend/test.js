fetch("http://127.0.0.1:8000").then(res => {
    return res.json()
}).then(data => {
    console.log(data)
})
