const BASE_URL='https://latest.currency-api.pages.dev/v1/currencies';

const selects=document.querySelectorAll('.selectionList');
const btn=document.querySelector('form button');
const fromCurr=document.querySelector('#from');
const toCurr=document.querySelector('#to');
const msgText=document.querySelector('.msg');
const resultBox=document.querySelector('#result-box')

for(let select of selects){
    countries.map((item)=>{
        let option=document.createElement('option');
        option.value=item.currencyCode;
        option.innerText=item.currencyCode;
        if(select.id=="from" && item.currencyCode=="USD"){
            option.selected=true;
        }
        if(select.id=="to" && item.currencyCode=="INR"){
            option.selected=true;
        }
        select.append(option);
    });
    select.addEventListener('change',(e)=>{
        updateImg(e.target)
    })
}

const updateImg=(ele)=>{
    console.log(ele.value);
    const countryCode=countries.filter(item=>item.currencyCode==ele.value)[0].countryCode;
    // console.log(countryCode);
    const newImgSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    ele.parentElement.querySelector('img').src=newImgSrc;
}

btn.addEventListener('click',async (e)=>{
    e.preventDefault();
    extractResult();
})

const extractResult=async ()=>{
    const inpBox=document.querySelector('#amount');
    let amount=inpBox.value;
    if(amount==""||amount<=0){
        amount=1;
        inpBox.value=1;
    }
    // console.log(fromCurr.value,toCurr.value);
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    const response=await fetch(URL);
    // console.log(response);
    const data=await response.json();
    const exchangeRate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    //Updating message
    document.querySelector('.from-curr').innerText=fromCurr.value;
    document.querySelector('.to-value').innerText=exchangeRate;
    document.querySelector('.to-curr').innerText=toCurr.value;
    
    //updating result
    const result=amount*exchangeRate;
    resultBox.value=result;
}

window.addEventListener('load',()=>extractResult());