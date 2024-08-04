// const { response } = require("express");

function saveData() {
    document.getElementById('sendbtn').disabled = true
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    console.log(name, age)

    fetch('http://localhost:3000/data', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Accept": 'application/json'
        },
        body: JSON.stringify({
            name: name,
            age: age
        })
    })
}

function clearData(){
    document.getElementById('sendbtn').disabled = false
    document.getElementById('name').value = ''
    document.getElementById('age').value =''
    location.reload()
}

fetch('http://localhost:3000/users')
.then(response => response.json())
.then(data => {
    const tbody = document.getElementById('tableBody')
    data.forEach(row => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.age}</td>
        `
        tbody.appendChild(tr)
    })
})