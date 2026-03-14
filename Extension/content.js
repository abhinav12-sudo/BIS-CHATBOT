let database = {}
fetch("bis_database.json")
.then(res => res.json())
.then(data =>{
    database = data;
});

document.getElementById("checkBtn").addEventListener("click",function(){
    let model = document.getElementById("modelInput").value.trim();
    let resultDiv = document.getElementById("result");
    if(database[model] && database[model].bis_certified==true){
        resultDiv.innerHTML=
        "BIS CERTIFIED COMPANY: "+
        database[model].company + 
        "LICENSE" +
        database[model].license;

    }
    else{
        resultDiv.innerHTML = "NOT FOUND IN DATABASE"
    }
})