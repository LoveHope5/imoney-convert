

//const url = 'https://api.myjson.com/bins/7xq2x';
 function openDatabase() {
          const idb = window.indexedDB;
            if (!navigator.serviceWorker) {
                return Promise.resolve();
            }

            return idb.open('icurrencydb', 1, function(db) {
                let store = db.createObjectStore('currencies', {
                keyPath: 'id'
                });
                
            });
    }


 

function loadCurrency(json,selectBox){
     
       let  dbPromise = openDatabase();

       
    
        //check if we are offline
       if(json.length >0){
        for (let index in json ) {
          option = document.createElement('option');
      	  option.text = json[index].currencyName;
      	  option.value = json[index].id;
      	  selectBox.add(option);
          dbPromise.then(function(db){
           if(!db) return;

           let tx = db.transaction('currencies','readwrite');
           let store = tx.objectStore('currencies');
           store.put(json[index]);
       });
          
           
    	} 
       }else{
        

       }
       

}

document.addEventListener("DOMContentLoaded",function(){
    const url = 'https://free.currencyconverterapi.com/api/v5/currencies'; // Get 10 random users
    const dropdownFrom = document.getElementById('from');
    const dropdownTo = document.getElementById('to');
    const userInput = document.getElementById('input');
    const resultInput = document.getElementById('result');

    dropdownFrom.length = 0;

    dropdownTo.length = 0;

    let defaultOption = document.createElement('option');
 
    defaultOption.text = 'Choose a currency';

    dropdownFrom.add(defaultOption);
    dropdownFrom.selectedIndex = 0;

    dropdownTo.add(defaultOption);
    dropdownTo.selectedIndex = 0;
    
    fetch(url)
    .then(function(response) {
        
        if (response.status !== 200) { 
            alert('error'); 
            console.warn('Oh la laaa !! Error occured. Status Code: ' + 
            response.status);  
            return;  
        }
        return response.json();
    })
    .then(function(myJson) {
    //  console.log(myJson);
            loadCurrency(myJson.results,dropdownFrom);

            loadCurrency(myJson.results,dropdownTo);

    });

  
});

  


   

function convertCurrency(){

     

    const dropdownFrom = document.getElementById('from');
    const dropdownTo = document.getElementById('to');
    const userInput = document.getElementById('input');
    const resultInput = document.getElementById('result');
    let url = "https://free.currencyconverterapi.com/api/v5/convert?q="+dropdownFrom.value+"_"+dropdownTo.value+"&compact=ultra";

        
    // alert('works');
    fetch(url)
    .then(function(response) {
        
        if (response.status !== 200) { 
            alert('error'); 
            console.warn('Oh la laaa !! Error occured. Status Code: ' + 
            response.status);  
            return;  
        }
        return response.json();
    })
    .then(function(result) {
        //alert(dropdownFrom.value+"_"+dropdownTo.value);
        for (let index in result){  
             let total = result[index] * userInput.value ;
             resultInput.value =  Math.round(total * 100) / 100 ;
        }
       
      
    });


}
