// separator function 
function separator(numb) {
  var str = numb.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}

//fixed function after 2 number
function After2Decimal(number){
  return Number.parseFloat(number).toFixed(2)
}

// average with 2 number decimal
function averageNumber(numbs){
  let sum=0;
  let avg;
  numbs.forEach((number)=>{
    sum+=number;
  })
  avg=sum/number.length;
  return After2Decimal(avg)
}

// function for  label M/B/k instead od million and billion and etc.
function convertToInternationalCurrencySystem (labelValue) {
  
  // Twelve Zeroes for Trillion
  return Math.abs(Number(labelValue)) >= 1.0e+12

  
  ? (Math.abs(Number(labelValue)) / 1.0e+12).toFixed(2) + "T"
   // Nine Zeroes for Billions
  : Math.abs(Number(labelValue)) >= 1.0e+9

  ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"

  // Six Zeroes for Millions 
  : Math.abs(Number(labelValue)) >= 1.0e+6

  ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
  
  // Three Zeroes for Thousands
  : Math.abs(Number(labelValue)) >= 1.0e+3

  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

  : Math.abs(Number(labelValue));

}



let urlNew = "https://api.coincap.io/v2/assets";

let searchString = document.location.search;
let params = new URLSearchParams(searchString);
let id = params.get("id");
console.log("params");


fetch(urlNew)
  .then(function recievedData(res) {
    console.log(res);
    return res.json();

  })
  .then(function soWhat(input) {
    let listItem = input.data;
    console.log(listItem);
     creatCoin(listItem); 
 


    
    
function creatCoin(listItem){
  listItem.forEach((fileItem) => {
    let dataId=fileItem.id;
    
    // console.log(dataId);
    if(dataId==id){
      function changeItems(){
        let changePercent=Number(After2Decimal(fileItem.changePercent24Hr)) ;
        if (changePercent< 0){
          percentPrice.classList.remove("greenText");
          percentPrice.classList.add("redText");
        }
        percentPrice.textContent=changePercent+"%";
       }
      let rankNum=document.querySelector(".rank");
      rankNum.textContent=fileItem.rank;

      let coinNameAndId=document.querySelector(".titleCoin");
      coinNameAndId.textContent=fileItem.name+"("+fileItem.symbol+")";

      let coinPrice=document.querySelector(".price");
      coinPrice.textContent="$"+ separator(After2Decimal(fileItem.priceUsd));

      let percentPrice = document.querySelector(".percentPrice");
      percentPrice.classList.add("largeText","greenText","mediumBox")
      changeItems();
      
    }
  })
}

});



