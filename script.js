const icon = document.querySelector('.arrow');

const arrow = document.querySelector('.fa-arrow-down')
const packageDropdown = document.querySelector('#packageDropDown');
const allDropDown = packageDropdown.querySelectorAll('li');
const prizeList = document.querySelector('.calc-summary ul')
const inputProducts = document.querySelector('#products');
const inputOrders = document.querySelector('#orders');
const summary = document.querySelector('.summary-total');
const firstLi = prizeList.querySelector('li:nth-of-type(1)');
const secondLi = prizeList.querySelector('li:nth-of-type(2)');
const thirdLi = prizeList.querySelector('li:nth-of-type(3)');
const fourthLi = prizeList.querySelector('li:nth-of-type(4)');
const fifthLi = prizeList.querySelector('li:nth-of-type(5)');


const account = document.querySelector('#accounting');
const rental = document.querySelector('#terminal');
packageDropdown.classList.remove('show');




const  accountingPrize = 40;
const  rentalPrizes = 30;
let selectedAccountingPrize = 0;
let selectedRentalPrize = 0;

let selectedProductsQuantity = 0;
let estimentedOrdersInMonths = 0;
let selectedPackage = 0;
const productPrice = 25;
const ordersInMonthsPrice = 10;
const packages = [{name :"basic", value: 10}, {name: "professional", value: 30}, {name: "premium", value: 50}];

const sumProductsQuantity = () => {
    return (selectedProductsQuantity * productPrice);
}
const sumEstimatedOrders = () => {
    return (estimentedOrdersInMonths * ordersInMonthsPrice);
}
const sumTotal = () => {
    return sumProductsQuantity() + sumEstimatedOrders() + selectedPackage + selectedAccountingPrize + selectedRentalPrize;
}
const showTotal = () => {
    const total = sumTotal();
   if(total > 0) {
       summary.style.visibility = "visible";
   } else {
       summary.style.visibility = "hidden";
   }
    summary.innerHTML = `<span>Total</span> <span class="total-price">$ ${total}</span>`
}
const productsInMonths = () => {
    selectedProductsQuantity = inputProducts.value;

     if(selectedProductsQuantity > 0 ) {
         firstLi.style.visibility = "visible";
     } else {
              firstLi.style.visibility = "hidden"
          }

     const sumProducts = sumProductsQuantity();
    firstLi.innerHTML = `<span class="item-type">Products</span><span class="item-calc">${selectedProductsQuantity} * $ ${productPrice}</span><span class="item-price">$ ${sumProducts}</span>`;
     showTotal();
}
const ordersInMonths = () => {
    estimentedOrdersInMonths = inputOrders.value;
    if(estimentedOrdersInMonths > 0) {
        secondLi.style.visibility = "visible";
    } else {
        secondLi.style.visibility = "hidden"
    }
     const sumOrder = sumEstimatedOrders();
    secondLi.innerHTML = `<span class="item-type">Orders</span><span class="item0calc">${estimentedOrdersInMonths} * $ ${ordersInMonthsPrice}</span><span class="item-price">$ ${sumOrder}</span>`
    showTotal();
}
const packageSelected = (el) => {

    const package = el.target.dataset.package;
    const prize = packages.find(x => x.name == package).value;

    selectedPackage = prize;
    if(selectedPackage > 0) {
        thirdLi.style.visibility = 'visible'
        thirdLi.innerHTML = `<span class="item-type">Package</span> <span class="item-calc">${package}</span><span class="item-price">$${prize}</span>`
    } else {
        thirdLi.style.visibility = 'hidden'
    }
       showTotal();
}



const accountChecked = () => {
    if (account.checked) {
        selectedAccountingPrize = accountingPrize;
        fourthLi.style.visibility = 'visible'
        fourthLi.innerHTML = ` <span class="item-type">Accounting</span><span class="item-price">$${selectedAccountingPrize}</span>`

    } else {
       selectedAccountingPrize = 0;
       fourthLi.style.visibility = 'hidden'
    }
    showTotal();
}
    const rentalInfo = () => {
        if (rental.checked) {
            selectedRentalPrize = rentalPrizes;
            fifthLi.style.visibility = "visible";
            fifthLi.innerHTML = `<span class="item-type">Terminal</span>  <span class="item-price">$ ${selectedRentalPrize}</span>`

        } else {
            fifthLi.style.visibility = "hidden";
            selectedRentalPrize = 0;
        }
        showTotal();
    }


    icon.addEventListener('click', function () {
        packageDropdown.classList.toggle("show");
        if (packageDropdown.classList.contains('show')) {
            arrow.style.rotate = '180deg';
        } else {
            arrow.style.rotate = '0deg'
        }

    })


    account.addEventListener('click', accountChecked);
    rental.addEventListener('click', rentalInfo);
    inputProducts.addEventListener('change', productsInMonths);
    inputOrders.addEventListener('change', ordersInMonths);
    allDropDown.forEach(function (e){
    e.addEventListener('click',packageSelected)
})



