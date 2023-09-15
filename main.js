let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discounts = document.getElementById("discounts");
let items = document.getElementById('items')
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let allprices = document.getElementById("allprices");
let mode = "create";
let temp;
//get total price
function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discounts.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}

// function create new product
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}
submit.onclick = () => {
  let product = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discounts: discounts.value,
    items:items.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (mode === "create") {
    // if (product.count > 1) {
    //   for (let i = 0; i < product.count; i++) {
    //     dataProduct.push(product);
    //   }
    // } else {
    //   dataProduct.push(product);
    // }
    dataProduct.push(product);
  } else {
    dataProduct[temp] = product;
    mode = "create";
    submit.innerHTML = "create";
    count.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(dataProduct));
  cleaningInputs();
  showProducts();
};

//function cleaning inputs after add new product

let cleaningInputs = () => {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discounts.value = "";
  items.value=""
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  total.style.backgroundColor = "#a00d02";
};

//function creating new products
const showProducts = () => {
  let table = "";
  let pricing = 0;
  let numItems = 0
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
         <tr>
         <td>${i}</td>
         <td>${dataProduct[i].title}</td>
         <td>${dataProduct[i].price}</td>
         <td>${dataProduct[i].taxes}</td>
         <td>${dataProduct[i].ads}</td>
         <td>${dataProduct[i].discounts}</td>
         <td>${dataProduct[i].total}</td>
         <td>${dataProduct[i].items}</td>
         <td>${dataProduct[i].category}</td>
         <td><button onclick="updateData(${i})" id="update">Update</button></td>
         <td><button onclick="delproduct(${i})" id="delete">Delete</button></td>
         <td><button onclick="decrease(${i})" id="decrease">Decrease</button></td>
       </tr>
       `;
    let delAllBtn = document.getElementById("deleteAll");
    if (dataProduct.length > 0) {
      delAllBtn.innerHTML = `<button onclick="deleteAllProduct()">Delete All Product (${dataProduct.length})</button>`;
    } else {
      delAllBtn.innerHTML = "";
    }
    pricing += parseInt(`${dataProduct[i].price * dataProduct[i].items}`);
    // numItems += parseInt(`${dataProduct[i].items}`);
  }

  document.getElementById("tableBody").innerHTML = table;
  allprices.innerHTML = `Total Price For All Product In The Store : ${pricing  } L.E`;
};
showProducts();

//function delete one product
let delproduct = (product) => {
  let delConfirm =  confirm("Warning Youe Will delet This Product .. Are You Sure!");
  if(delConfirm === true){
    dataProduct.splice(product, 1);
    localStorage.product = JSON.stringify(dataProduct);
  
    showProducts();
  }
 
};

let deleteAllProduct = () => {
 let delallConfirm =  confirm("Warning Youe Will delet All products .. Are You Sure!");
 if(delallConfirm ==true ){
  localStorage.clear();
  dataProduct.splice(0);
  dataProduct.length = 0;
  showProducts();
 }

};
// update data

let updateData = (i) => {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discounts.value = dataProduct[i].discounts;
  items.value=dataProduct[i].items;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "UPDATE";
  category.value = dataProduct[i].category;
  mode = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
};

//search function

let searchMode = "title";
let getSearch = (id) => {
  let searchBlock = document.getElementById("search");
  if (id === "searchtitle") {
    searchMode = "title";
    searchBlock.placeholder = "Search By Title ";
  } else {
    searchMode = "category";
    searchBlock.placeholder = "Search By Category ";
  }
  searchBlock.focus();
  searchBlock.value = "";
  showProducts();
};

// search product

let searching = (value) => {
  let table = "";
  if (searchMode === "title") {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discounts}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].items}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="delproduct(${i})" id="delete">Delete</button></td>
        <td><button onclick="decrease(${i})" id="decrease">Decrease</button></td>
      </tr>
      `;
      }
    }
  } else {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += `
      <tr>
      <td>${i}</td>
      <td>${dataProduct[i].title}</td>
      <td>${dataProduct[i].price}</td>
      <td>${dataProduct[i].taxes}</td>
      <td>${dataProduct[i].ads}</td>
      <td>${dataProduct[i].discounts}</td>
      <td>${dataProduct[i].total}</td>
      <td>${dataProduct[i].items}</td>
      <td>${dataProduct[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">Update</button></td>
      <td><button onclick="delproduct(${i})" id="delete">Delete</button></td>
      <td><button onclick="decrease(${i})" id="decrease">Decrease</button></td>
    </tr>
    `;
      }
    }
  }
  document.getElementById("tableBody").innerHTML = table;
};


let decrease = (item)=>{
  for (let i = 0; i < dataProduct.length; i++) {
   if(dataProduct[i]===dataProduct[item]){
    if(dataProduct[item].items > 0){
      dataProduct[item].items--
      localStorage.setItem("product", JSON.stringify(dataProduct));
      showProducts()
    }else{
      alert('Quantity is equal 0 , you can press update and increase')
    }
   
   }
  }
}

// ALL IS DONE 