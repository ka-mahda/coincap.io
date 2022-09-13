// separator function 
function separator(numb) {
  var str = numb.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}

//fixed function
function After2Decimal(number){
  return Number.parseFloat(number).toFixed(2)
}

// function for  label M/B/k
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


//fetch
let url = "https://api.coincap.io/v2/assets";
let list = fetch(url)
  .then(function recievedData(res) {
    console.log(res);
    return res.json();
    
  })
  .then(function soWhat(input) {
    
      console.log(input);
      let dataInput=input.data;
      creatRow(dataInput); 
  });
// creating 2 main rows of table
let tableData=document.querySelector(".tableData");
let tableHeader=document.createElement("div");
tableHeader.classList.add("tableHeader");
let tableRow=document.createElement("div");
tableRow.classList.add("tableRow");


tableData.appendChild(tableHeader);
console.log(tableHeader);
tableData.appendChild(tableRow);



// creat elements of header (first row)
let rankTitle=document.createElement("div")
rankTitle.classList.add("mediumText","grayText","smallBox");
rankTitle.textContent="Rank";

tableHeader.appendChild(rankTitle);


let nameTitle=document.createElement("div")
nameTitle.classList.add("mediumText","grayText","largeBox");
nameTitle.textContent="Name";

tableHeader.appendChild(nameTitle);

let priceTitle=document.createElement("div")
priceTitle.classList.add("mediumText","grayText","mediumBox");
priceTitle.textContent="Price";

tableHeader.appendChild(priceTitle);

let marketCapTitle=document.createElement("div")
marketCapTitle.classList.add("mediumText","grayText","mediumBox");
marketCapTitle.textContent="MarketCap";

tableHeader.appendChild(marketCapTitle);


let VWapTitle=document.createElement("div")
VWapTitle.classList.add("mediumText","grayText","mediumBox");
VWapTitle.textContent="VWap (24HR)";

tableHeader.appendChild(VWapTitle);


let supplyTitle=document.createElement("div")
supplyTitle.classList.add("mediumText","grayText","mediumBox");
supplyTitle.textContent="Supply";

tableHeader.appendChild(supplyTitle);

let VolumeTitle=document.createElement("div")
VolumeTitle.classList.add("mediumText","grayText","mediumBox");
VolumeTitle.textContent="Volume (24HR)";

tableHeader.appendChild(VolumeTitle);

let changeTitle=document.createElement("div")
changeTitle.classList.add("mediumText","grayText","mediumBox");
changeTitle.textContent="Change (24HR)";

tableHeader.appendChild(changeTitle);


// creat elements of Datarow (second row) with loop
function creatRow(list){
  for(let i=0; i<20; i++){
    let data=list[i];
    let imgSrc="https://assets.coincap.io/assets/icons/"+data.symbol.toLowerCase()+"@2x.png";
    let coinHref="coin.html?id="+data.id
 function changeItem(){
  let changePercent=Number(After2Decimal(data.changePercent24Hr)) ;
  if (changePercent< 0){
    change.classList.remove("greenText");
    change.classList.add("redText");
  }
  change.textContent=changePercent+"%";
 }
// define row
let row=document.createElement("div");
row.classList.add("row");
tableRow.appendChild(row);
// define all columns-rank
let rankData=document.createElement("div");
rankData.classList.add("mediumText","blackText","smallBox");
rankData.textContent=data.rank;

row.appendChild(rankData);



// define all columns-name
let nameData=document.createElement("div");
nameData.classList.add("mediumText","blackText","largeBox");
let imgContainer=document.createElement("div");

let image=document.createElement("img");
image.classList.add("coinImage");
image.setAttribute("src",imgSrc);
imgContainer.appendChild(image);

nameData.appendChild(imgContainer);

let nameLink=document.createElement("a");
nameLink.classList.add("mediumText","blackText");
nameLink.setAttribute("href", coinHref);
nameLink.classList.add("largeText","blackText");

let coinName=document.createElement("div");
coinName.textContent=data.name;

let symbol=document.createElement("p");
symbol.classList.add("smallText","grayText");
symbol.textContent=data.symbol;

nameLink.appendChild(coinName);
nameLink.appendChild(symbol);

nameData.appendChild(nameLink);
row.appendChild(nameData)

// define price column

let priceData=document.createElement("div");
priceData.classList.add("largeText","blackText","mediumBox")
priceData.textContent="$"+ separator(After2Decimal(data.priceUsd));

row.appendChild(priceData);

// define MarketCap column

let marketCap= document.createElement("div");
marketCap.classList.add("largeText","blackText","mediumBox");
marketCap.textContent="$"+convertToInternationalCurrencySystem(data.marketCapUsd);

row.appendChild(marketCap);


// define VWap column

let vWap=document.createElement("div");
vWap.classList.add("largeText","blackText","mediumBox");
vWap.textContent="$"+separator(After2Decimal(data.vwap24Hr));

row.appendChild(vWap);

// define supply column

let supply=document.createElement("div");
supply.classList.add("largeText","blackText","mediumBox")
supply.textContent=convertToInternationalCurrencySystem(data.supply);
row.appendChild(supply)

// define volume column
let volume=document.createElement("div")
volume.classList.add("largeText","blackText","mediumBox");
volume.textContent="$"+ convertToInternationalCurrencySystem(data.volumeUsd24Hr);
row.appendChild(volume);

// define change column
let change=document.createElement("div")
change.classList.add("largeText","greenText","mediumBox")
changeItem();

row.appendChild(change);

  }
}













