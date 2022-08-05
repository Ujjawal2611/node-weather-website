

function myFunction(){
    var name=document.getElementById("loc").value
    fetch('http://localhost:3000/weather?address='+name).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
                document.getElementById("result").innerHTML='error : '+ data.error
                
        }
        else{
            document.getElementById("result").innerHTML='Place : ' +data.location+'<br>'+' Address : '+data.place+'<br>'+' Forecast : '+data.forecast
            
        }
       
    })
})
return false;
}
var weatherForm=document.getElementById("form1")

    weatherForm.addEventListener('submit',(evt)=>{
        document.getElementById("result").innerHTML='Loading...'
        evt.preventDefault()
        myFunction()
       
})


