import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js"
import {getDatabase,ref, set ,onValue , get,child,orderByChild ,query,equalTo,limitToFirst,startAt,endAt,orderByValue ,onChildAdded} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,updateProfile ,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js"



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkLEpTDNACAePlshbA-6VTmF5XHYrvbK4",
    authDomain: "kanekarelect.firebaseapp.com",
    databaseURL: "https://kanekarelect-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kanekarelect",
    storageBucket: "kanekarelect.appspot.com",
    messagingSenderId: "33301413608",
    appId: "1:33301413608:web:00ec71850d817fb35c535d",
    measurementId: "G-RV4W62YCKD"
  };

  // initialize  firebase app
  const app = initializeApp(firebaseConfig)

  const db = getDatabase();
  const auth = getAuth(app);
  const dbRef = ref(getDatabase());
//------------------------------------UPLOADING DATA INTO DATABASE ----------------------------------------------------------//
 

function AdminFuntion()
{
    console.log("done");
    document.getElementById('upload').onclick = function(){
        console.log("all done");
        var ProductMainImageLink = sessionStorage.getItem("MainImg");
        var ProductSideImageLink = sessionStorage.getItem("SideImg");
        var ProductSide2ImageLink = sessionStorage.getItem("Side2Img");
        var ProductName = sessionStorage.getItem("second");
        var ProductID = document.getElementById('ProductID').value;
        var ProductDescription = document.getElementById('Description').value;
        var ProductPrice = document.getElementById('Price').value;
        var ProductSalePrice = document.getElementById('Sale-Price').value;
        var ProductCompanyName ;
        var ProductCategory;
        var ProductSearchTags = document.getElementById('SearchTags').value;
        var radios = document.getElementsByName('CompanyName');
        for (var radio of radios)
        {
            if (radio.checked) {
                ProductCompanyName = radio.value;
            }
        }
        var radios1 = document.getElementsByName('categories');
        for (var radio of radios1)
        {
            if (radio.checked) {
                ProductCategory = radio.value;
            }
        }
        
        
        //let productImageLink = ProductImageLink.value;
    
        console.log(ProductName);
            console.log(ProductID);
            console.log(ProductDescription);
            console.log(ProductPrice);
            console.log(ProductCompanyName);
            console.log(ProductCategory);
            console.log(ProductMainImageLink);
            console.log(ProductSideImageLink);
            console.log(ProductSide2ImageLink);
            console.log(ProductSearchTags);
    
        
                
        set(ref(db, 'Products/' + ProductCompanyName + '/'+ ProductCategory + '/' + ProductID ), {
            ProductID : ProductID,
            ProductName : ProductName,
            ProductDescription : ProductDescription,
            ProductPrice : ProductPrice,
            ProductSalePrice : ProductSalePrice,
            ProductCompanyName : ProductCompanyName,
            ProductCategory : ProductCategory,
            ProductMainImageLink : ProductMainImageLink,
            ProductSideImageLink : ProductSideImageLink,
            ProductSide2ImageLink : ProductSide2ImageLink,
            ProductSearchTags : ProductSearchTags

        });
        alert("Product Added Succesfully");
      }
}
  




window.onload = function () 
{
    if ( document.URL.includes("LogInPage.html") ) {
        LogInSignUp()
        console.log("signupForm")
    }
    else if(document.URL.includes("Edit.html"))
    {
        document.getElementById('goBack').onclick = function(){
            window.location.href = 'AdminPage.html';
        }
        let productnumber = (sessionStorage.getItem('productNumberToView'));
        console.log(productnumber)
        var storedArray = JSON.parse('[' + sessionStorage.getItem("AdminProductPage") + ']');
        console.log(storedArray[0][productnumber])
        document.getElementById("ProductName").value = storedArray[0][productnumber].ProductName
        document.getElementById("ProductID").value = storedArray[0][productnumber].ProductID
        var str =  storedArray[0][productnumber].ProductDescription
      //console.log(str.split(",").join("\n"))
      var description =str.split(",").join("\n")
     
        document.getElementById("Description").value = description
        document.getElementById("Price").value = storedArray[0][productnumber].ProductPrice
        document.getElementById("Sale-Price").value = storedArray[0][productnumber].ProductSalePrice
        document.getElementById("SearchTags").value = storedArray[0][productnumber].ProductSearchTags

        document.getElementById("updates").onclick = function(){
            var ProductMainImageLink = storedArray[0][productnumber].ProductMainImageLink
            var ProductSideImageLink = storedArray[0][productnumber].ProductSideImageLink
            var ProductSide2ImageLink =storedArray[0][productnumber].ProductSide2ImageLink
            var ProductName = document.getElementById('ProductName').value
            
            var ProductID = document.getElementById('ProductID').value
            var ProductDescription = document.getElementById('Description').value
            var ProductPrice = document.getElementById('Price').value
            var ProductSalePrice = document.getElementById('Sale-Price').value
            var ProductCompanyName = storedArray[0][productnumber].ProductCompanyName ;
            var ProductCategory = storedArray[0][productnumber].ProductCategory;
            var ProductSearchTags = document.getElementById('SearchTags').value;
       
            set(ref(db, 'Products/' + ProductCompanyName + '/'+ ProductCategory + '/' + ProductID ), {
                ProductID : ProductID,
                ProductName : ProductName,
                ProductDescription : ProductDescription,
                ProductPrice : ProductPrice,
                ProductSalePrice : ProductSalePrice,
                ProductCompanyName : ProductCompanyName,
                ProductCategory : ProductCategory,
                ProductMainImageLink : ProductMainImageLink,
                ProductSideImageLink : ProductSideImageLink,
                ProductSide2ImageLink : ProductSide2ImageLink,
                ProductSearchTags : ProductSearchTags
    
            });
            alert("Product Details Updated succesfully")
          }
       
       

    }
    else if(document.URL.includes("AdminPage.html"))
    {
        console.log("wfdef")
        var clickBtn = document.getElementById("click")
        clickBtn.onclick = function()
        {
            var searchbox =  document.getElementById("ProductSearch").value

            var arr = []    
            var searchFor = searchbox.toLowerCase();

            //console.log(searchFor)
            var companyName = ["SONY","SAMSUNG","LG","ONIDA","PANASONIC","whirlpool"]
            var categoryName = ["FRIDGE","TV","AC","WASHING MACHINE"]

            for(var i = 0;i< companyName.length;i++)
            {
                
                for(var j=0;j<categoryName.length;j++)
                {
                    
                    const result = query(ref(db, 'Products/' + companyName[i]+'/'+ categoryName[j]), orderByChild('ProductSearchTags'))
                    //console.log(result)
                    
                    
                    onChildAdded(result, (data) => {
                        
                        var str = data.val().ProductSearchTags //pid p1
                        // console.log(str)
                        // console.log(str.search(searchFor)) 
                        if(str.search(searchFor) >=0)
                        {
                            var item = data.val();
                            // console.log(item)
                                item.key = data.key;
                        //console.log(item.key)
                                arr.push(item);
                            
                        }
                    });
                }
            }
            console.log(arr)
            sessionStorage.setItem("AdminProductPage", JSON.stringify(arr));

            for(var i = 0;i<arr.length;i++)
            {

                document.getElementById("ProductNameDb"+i).innerHTML = arr[i].ProductName
                document.getElementById("ProductPriceDb"+i).innerHTML = arr[i].ProductSalePrice
                document.getElementById("ProductImageLinkDb"+i).setAttribute('src',arr[i].ProductMainImageLink)
            
            }
       
          
        }

        let productnumber = (sessionStorage.getItem('productNumberToView'));
        console.log(productnumber)
    }
    else if(document.URL.includes("CheckOutPage.html"))
    {   var totalPrice = 0;
        let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
        for(var i =0 ; i< productsInCart.length ; i++)
        {
            totalPrice += productsInCart[i].price 
            console.log(totalPrice)
        }
        document.getElementById('totalPrice').innerHTML = totalPrice

        console.log(productsInCart)
        //---------------------------------------------------------------------------------------------------------------------
        //var newDate = new Date();
                var currentDate =  new Date().toLocaleDateString();
                var currentTime =  new Date().toLocaleTimeString();
                console.log(currentDate + currentTime)
                
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              console.log(uid)
              
              get(child(dbRef, `Users/` + uid ),
              ).then((snapshot) =>
              {
                  if (snapshot.exists()) 
                  {
                      var returnArr = [{}];
                      snapshot.forEach((child) =>
                      {
                        //   var item = child.val();
                        //  // console.log(item)
                        //   item.key = child.key;
                        //  // console.log(item.key)
                        //   returnArr.push(item);
                        returnArr = { key: snapshot.key, value: snapshot.val() }
                      });
                    console.log(returnArr.value)
                    var  name = returnArr.value.FirstName + " " + returnArr.value.LastName;
                    var email = returnArr.value.Email;
                    var number =  returnArr.value.PhoneNumber;
                    var address = returnArr.value.Address
                   document.getElementById("fullName").value = name
                   document.getElementById("email").value = email
                   document.getElementById("address1").value = address

                   
                  // var user = [{Name:"Shubham" , email:"svishswakarma1020@gmail.com" , Number:"9284305897"}]

                   //console.log(user)
                   
                   
                   document.getElementById('CheckOutBtn').onclick = function()
                  {
                    console.log("awdawdaw")
                    var emailCheck = document.getElementById('email');
                    if (emailCheck.value == "" )
                    {
                      emailCheck.textContent("Email is empty")
                      emailCheck.style.color = "red"
                    
                    }
                    else
                    {

                      // window.location.href ="https://rzp.io/l/KGqcwVKJI";
                      var options = 
                      {
                        "key": "rzp_test_1KEvNdm6IwbgQG",
                        "amount": totalPrice + "00", // Example: 2000 paise = INR 20
                        "name": "Kanekar Electronincs",
                        "description": "All Electronics Product Available here",
                        "image": "image/logo.png",// COMPANY LOGO
                        "handler": function (response) 
                        {
                            console.log(response);
                            if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id < 1) {
                              console.log("Not Paid")
                            } else {
                              console.log("PAid")
                              set(ref(db, 'OrderDetails/'+ uid + '/' +response.razorpay_payment_id), {
                               OrderId : response.razorpay_payment_id,
                               OrderDate : currentDate,
                               OrderTime : currentTime,
                               TotalAmount : totalPrice,
                               ProductDetails : productsInCart,
                               UserEmail : email

                                
                            });

                              swal({
                              title: "Your Products Have Been booked",

                              icon: "success",
                              
                              }).then(function() {
                               
                                window.location.href = "index.html"
                            });



                            }
                            // AFTER TRANSACTION IS COMPLETE YOU WILL GET THE RESPONSE HERE.
                        },
                        "prefill": {
                            "name": name, // pass customer name
                            "email": email,// customer email
                            "contact": '+91' + number //customer phone no.
                        },
                        "notes": {
                            "address": address //customer address 
                        },
                        "theme": {
                            "color": "#15b8f3" // screen color
                        }
                      };
                      console.log(options);
                      var propay = new Razorpay(options);
                      propay.open();
                      
                      //location.href = redirect_url;
                    }
                      
                    
                  }
                }
              })

              
              // ...
            } else {
              // User is signed out
              // ...
            }
          });
    }
    else if(document.URL.includes("AddNewItem.html"))
    {
        AdminFuntion();
    }
    else if(document.URL.includes("samsung2.html"))
    {
        console.log("Awawawawfawfawfd")
        document.getElementById('tvViewAll').onclick = function ()
        {
            console.log("Awawawd")
            sessionStorage.setItem("ProductCompanyName", "SAMSUNG") ;
           sessionStorage.setItem("ProductCategory", "TV") ;
            window.location.href = 'ProductShow.html';
        }
        document.getElementById('RefrigeratorViewAll').onclick = function ()
        {
            sessionStorage.setItem("ProductCompanyName", "SAMSUNG") ;
           sessionStorage.setItem("ProductCategory", "FRIDGE") ;
            window.location.href = 'ProductShow.html';
        }
        document.getElementById('WashingViewAll').onclick = function ()
        {
            sessionStorage.setItem("ProductCompanyName", "SAMSUNG") ;
           sessionStorage.setItem("ProductCategory", "WASHING MACHINE") ;
            window.location.href = 'ProductShow.html';
        }
        
        
        
    }
    else if(document.URL.includes("Panasonic2.html"))
    {
        document.getElementById('panatvViewAll').onclick = function ()
        {
            sessionStorage.setItem("ProductCompanyName", "PANASONIC") ;
            sessionStorage.setItem("ProductCategory", "TV") ;
             window.location.href = 'ProductShow.html';
        }
    }
    else if(document.URL.includes("index.html"))
    {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              console.log(uid)
        
             
        
                var LoginForm2 = document.getElementById("form-box")
                let loginForm = document.querySelector('.login-form');
                let signupForm = document.querySelector('.signup-form');
                document.querySelector('.home').style.filter = "blur(0px)";
                LoginForm2.style.visibility = "hidden";
                
        
                 
              document.querySelector('#login-btn').onclick = () =>{
                
                signupForm.classList.toggle('active')
                loginForm.classList.remove('active')
              }
              // ...
            } else {
              // User is signed out
              // ...
              console.log("sefshfisheifh")
              document.querySelector('#login-btn').onclick = () =>{
                signupForm.classList.remove('active')
                loginForm.classList.toggle('active')
              }
              
            }
          });
        
          document.getElementById('logout').onclick = function(){
            auth.signOut()
            onAuthStateChanged(auth, (user) => {
                if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/firebase.User
                  const uid = user.uid;
                  console.log(uid)
                  // ...
                } else {
                  // User is signed out
                  // ...
                    console.log("sefshfisheifh")
                    signupForm.classList.remove('active')
                loginForm.classList.toggle('active')    
                }
              });
          }
        LogInSignUp()
        console.log("signupForm")
        //-----------------------------Searching For Products ----------------------------------------------------------//

        document.getElementById("search-icon").onclick = function()
        {
            var searchbox = document.getElementById("search-box").value
            
            sessionStorage.setItem("SearchTag",searchbox)
        
           
           
            var arr = []    
            var searchFor = searchbox.toLowerCase();

            console.log(searchFor)
            var companyName = ["SONY","SAMSUNG","LG","ONIDA","PANASONIC","whirlpool"]
            var categoryName = ["FRIDGE","TV","AC","WASHING MACHINE"]

            for(var i = 0;i< companyName.length;i++)
            {
                
                for(var j=0;j<categoryName.length;j++)
                {
                    
                    const result = query(ref(db, 'Products/' + companyName[i]+'/'+ categoryName[j]), orderByChild('ProductSearchTags'))
                    //console.log(result)
                    
                    
                    onChildAdded(result, (data) => {
                        
                        var str = data.val().ProductSearchTags //pid p1
                        // console.log(str)
                        // console.log(str.search(searchFor)) 
                        if(str.search(searchFor) >=0)
                        {
                            var item = data.val();
                            // console.log(item)
                                item.key = data.key;
                           //console.log(item.key)
                                arr.push(item);
                            
                        }
                    });
                }
            }
            console.log(arr)
           
            
           
          
            
            sessionStorage.setItem("SerachItem", JSON.stringify(arr));
           
            var delayInMilliseconds = 1000; //1 second

            setTimeout(function() {
            //your code to be executed after 1 second
            
             sessionStorage.setItem("SerachItem", JSON.stringify(arr));
             var storedArray = JSON.parse('[' + sessionStorage.getItem("SerachItem") + ']');
                      console.log(storedArray)
                     
            }, delayInMilliseconds);
            
            var delayInMilliseconds = 1500; //1.5 second

            setTimeout(function() {
            //your code to be executed after 1 second
                window.location.href= "ProductShowSearch.html"
            }, delayInMilliseconds);
          
        // const mostViewedPosts = query(ref(db, 'Products/SONY/TV'), orderByChild('ProductSearchTags'))
        // //console.log(mostViewedPosts.val())
        
        
        // onChildAdded(mostViewedPosts, (data) => {
        //     var str = data.val().ProductSearchTags
        //     console.log(str)
        //     console.log(str.search(searchFor)) 
        //     if(str.search(searchFor) >=0)
        //     {
        //         arr.push(data.val())
        //     }
        // });
        // const mostViewedPosts3 = query(ref(db, 'Products/whirlpool/FRIDGE'), orderByChild('ProductSearchTags'))
        // //console.log(mostViewedPosts.val())
        
        
        // onChildAdded(mostViewedPosts3, (data) => {
        //     var str = data.val().ProductSearchTags
        //     console.log(str)
        //     console.log(str.search(searchFor)) 
        //     if(str.search(searchFor) >=0)
        //     {
        //         arr.push(data.val())
        //     }
        // });
        
        
        // const mostViewedPosts2 = query(ref(db, 'Products/PANASONIC/TV'), orderByChild('ProductSearchTags'))
        // //console.log(mostViewedPosts.val())
        
        
        // onChildAdded(mostViewedPosts2, (data) => {
        //     var str = data.val().ProductSearchTags
        //     console.log(str)
        //     console.log(str.search(searchFor)) 
        //     if(str.search(searchFor) >=0)
        //     {
        //         arr.push(data.val())
        //     }
        // });
        // console.log(arr)
    
        // sessionStorage.setItem("SerachItem", JSON.stringify(arr));
        //window.location.href= "ProductShowSearch.html"
    }

        //------------------------------------------Assinging Popular Products ---------------------------------------------------//
        // document.getElementById("PopularWirlpool").onclick = function()
        // {
        //    sessionStorage.setItem("PopularCompanyName", "whirlpool") ;
        //    PopularProductFunction()
            
            
        // }
        // document.getElementById("PopularOnida").onclick = function()
        // {
        //    sessionStorage.setItem("PopularCompanyName", "ONIDA") ;
        //    PopularProductFunction()
            
            
        // }
        // document.getElementById("PopularLg").onclick = function()
        // {
        //    sessionStorage.setItem("PopularCompanyName", "LG") ;
          
        //    PopularProductFunction()
            
        // }
        // document.getElementById("PopularSony").onclick = function()
        // {
        //    sessionStorage.setItem("PopularCompanyName", "SONY") ;
        //    PopularProductFunction()
            
            
        // }
        // document.getElementById("PopularPanasonic").onclick = function()
        // {
        //    sessionStorage.setItem("PopularCompanyName", "PANASONIC") ;
        //    PopularProductFunction()
            
            
        // }
        // document.getElementById("PopularSamsung").onclick = function()
        // {
        //    sessionStorage.setItem("PopularCompanyName", "SAMSUNG") ;
        //    PopularProductFunction()
            
            
        // }
        //------------------------------------------Assinging Category PANASONIC--------------------------------------------------//
        document.getElementById("PanasonicTV").onclick = function()
        {
           sessionStorage.setItem("ProductCompanyName", "PANASONIC") ;
           sessionStorage.setItem("ProductCategory", "TV") ;
            window.location.href = 'ProductShow.html';
            
        }
        document.getElementById("PanasonicAc").onclick = function()
        {
           sessionStorage.setItem("ProductCompanyName", "PANASONIC") ;
           sessionStorage.setItem("ProductCategory", "AC") ;
            window.location.href = 'ProductShow.html';
            
        }
        document.getElementById("PanasonicFridge").onclick = function()
        {
           sessionStorage.setItem("ProductCompanyName", "PANASONIC") ;
           sessionStorage.setItem("ProductCategory", "FRIDGE") ;
            window.location.href = 'ProductShow.html';
            
        }
        document.getElementById("PanasonicWm").onclick = function()
        {
           sessionStorage.setItem("ProductCompanyName", "PANASONIC") ;
           sessionStorage.setItem("ProductCategory", "WASHING MACHINE") ;
            window.location.href = 'ProductShow.html';
            
        }

        //------------------------------------------WHIRLPOOL--------------------------------------------------//

        document.getElementById("Whirlpoolfridge").onclick = function()
        {
           sessionStorage.setItem("ProductCompanyName", "whirlpool") ;
           sessionStorage.setItem("ProductCategory", "FRIDGE") ;
            window.location.href = 'ProductShow.html';
            
        }
        document.getElementById("WhirlpoolWm").onclick = function()
        {
           sessionStorage.setItem("ProductCompanyName", "whirlpool") ;
           sessionStorage.setItem("ProductCategory", "WASHING MACHINE") ;
            window.location.href = 'ProductShow.html';
            
        }
        //------------------------------------------LG--------------------------------------------------//
        document.getElementById("LGAC").onclick = function()
        {
           sessionStorage.setItem("ProductCompanyName", "LG") ;
           sessionStorage.setItem("ProductCategory", "AC") ;
            window.location.href = 'ProductShow.html';
            
        }
        document.getElementById("LGWM").onclick = function()
        {
           sessionStorage.setItem("ProductCompanyName", "LG") ;
           sessionStorage.setItem("ProductCategory", "WASHING MACHINE") ;
            window.location.href = 'ProductShow.html';
            
        }
        document.getElementById("LGTV").onclick = function()
        {
           sessionStorage.setItem("ProductCompanyName", "whirlpool") ;
           sessionStorage.setItem("ProductCategory", "TV") ;
            window.location.href = 'ProductShow.html';
            
        }
        document.getElementById("LGFridge").onclick = function()
        {
           sessionStorage.setItem("ProductCompanyName", "LG") ;
           sessionStorage.setItem("ProductCategory", "FRIDGE") ;
            window.location.href = 'ProductShow.html';
            
        }
        //------------------------------------------SONY --------------------------------------------------//
        
        document.getElementById("SonyTv").onclick = function()
        {
            sessionStorage.setItem("ProductCompanyName", "SONY") ;
           sessionStorage.setItem("ProductCategory", "TV") ;
            window.location.href = 'ProductShow.html';
            
        }

        //------------------------------------------SAMSUNG --------------------------------------------------//
        document.getElementById("SamSungAC").onclick = function()
        {
            sessionStorage.setItem("ProductCompanyName", "SAMSUNG") ;
           sessionStorage.setItem("ProductCategory", "AC") ;
            window.location.href = 'ProductShow.html';
            
        }
        document.getElementById("SamSungTv").onclick = function()
        {
            sessionStorage.setItem("ProductCompanyName", "SAMSUNG") ;
           sessionStorage.setItem("ProductCategory", "TV") ;
            window.location.href = 'ProductShow.html';
            
        }
        document.getElementById("SamSungfridge").onclick = function()
        {
            sessionStorage.setItem("ProductCompanyName", "SAMSUNG") ;
           sessionStorage.setItem("ProductCategory", "FRIDGE") ;
            window.location.href = 'ProductShow.html';
            
        }
        document.getElementById("SamSungWM").onclick = function()
        {
            sessionStorage.setItem("ProductCompanyName", "SAMSUNG") ;
           sessionStorage.setItem("ProductCategory", "WASHING MACHINE") ;
            window.location.href = 'ProductShow.html';
            
        }

    }
    else if(document.URL.includes("ProductShow.html"))
    {
        
        
        console.log(sessionStorage.getItem("ProductCompanyName"));
        console.log(sessionStorage.getItem("ProductCategory"));
        var companyName = sessionStorage.getItem("ProductCompanyName");
        var categoryName=sessionStorage.getItem("ProductCategory");
       
        document.getElementById("SiteTitle").innerHTML = companyName;
  
       
        
        get(child(dbRef, `Products/` + companyName + '/' + categoryName),
        ).then((snapshot) =>
        {
            if (snapshot.exists()) 
            {
                var returnArr = [];
                snapshot.forEach((child) =>
                {
                    var item = child.val();
                   // console.log(item)
                    item.key = child.key;
                   // console.log(item.key)
                    returnArr.push(item);
                });
                document.getElementById("number").value =  returnArr.length;
                //console.log(snapshot.val())
                
                //console.log(returnArr)
                sessionStorage.setItem("size",returnArr.length)
                sessionStorage.setItem("items", JSON.stringify(returnArr));
                for ( var i=0; i < returnArr.length; i++) {
                    document.getElementById("ProductImageLinkDb" + i).setAttribute('src',returnArr[i].ProductMainImageLink)
                    sessionStorage.setItem("ProductId" + i,returnArr[i].ProductID)
                    console.log(sessionStorage.getItem("ProductId0" ))
                    document.getElementById("ProductNameDb" + i).innerHTML =  returnArr[i].ProductName;
                    document.getElementById("ProductPriceDb" + i).innerHTML =  returnArr[i].ProductSalePrice;
                    
                } 
 
            }
        })

       
        
    }
    else if(document.URL.includes("PopularProductPage.html"))
    {
       
    }
}


//--------------------------------------Pupular Product Fucntion -------------------------------------------------------------//
function PopularProductFunction(){
    var companyName = sessionStorage.getItem("PopularCompanyName");
    console.log(companyName)

   // document.getElementById("companyname").innerHTML = companyName;

   
    
    get(child(dbRef, `Products/` + companyName),
    ).then((snapshot) =>
    {
        if (snapshot.exists()) 
        {
            var i = 0
            var returnArr = [];
            var arr2 = []
            snapshot.forEach((child) =>
            {
            

                var item = child.val();
               // console.log(item)
                item.key = child.key;
              // console.log(item.key)
              // document.getElementById("CategoryName"+i).innerHTML = item.key
                returnArr.push(item);
                
                child.forEach(arr => {
                    var item = arr.val();
                    // console.log(item)
                        item.key = child.key;
                    //console.log(item.ProductName)
                    arr2.push(item)

                //   for(var j=0 ; j<5; j++)
                //   {
                //       console.log("ProductName"+j + i)
                //     document.getElementById("ProductName"+j + i).innerHTML = item.ProductName
                //   }
                   
                });
                i++
            });
           // document.getElementById("number").value =  returnArr.length;
           sessionStorage.setItem("PopularProduct", JSON.stringify(returnArr));
      
           
       
           var delayInMilliseconds = 1000; //1 second

           setTimeout(function() {
           //your code to be executed after 1 second
           
            sessionStorage.setItem("PopularProductCategory", JSON.stringify(returnArr));
            sessionStorage.setItem("PopularProduct", JSON.stringify(arr2));
            
                    
           }, delayInMilliseconds);
           
           var delayInMilliseconds = 1500; //1.5 second

           setTimeout(function() {
           //your code to be executed after 1 second
             window.location.href = 'PopularProductPage.html';
           }, delayInMilliseconds);

          console.log(returnArr[0])
        //    for(var i=0;i<arr2.length;i++)
        //    {
        //        for(var j=0 ; j<4;j++)
        //        {
        //            console.log(arr2[j].ProductName)
                
        //            document.getElementById("ProductName"+i+ j).innerHTML = arr2[j].ProductName
        //            document.getElementById("Price"+i+ j).innerHTML = arr2[j].ProductSalePrice
        //         document.getElementById("MainImg"+i+j ).setAttribute('src',arr2[j].ProductMainImageLink) 
        //        }
            

        //    }
           
        }
    })
}
//--------------------------------------SignIn User Using Firebase Auth ------------------------------------------------------//




function LogInSignUp(){


 
 document.getElementById("SignUp").onclick = function(){
     var FirstName = document.getElementById("FirstName").value
     var LastName = document.getElementById("LastName").value
     var address = document.getElementById("address").value
     var PhoneNumber = document.getElementById("PhoneNumber").value
     var Email = document.getElementById("Email");
     var pass = document.getElementById("regi_password");
     var ConfPass = document.getElementById("Confregi_password");

     Email.addEventListener("input", () => {
        if (Email.validity.valueMissing) {
            Email.setCustomValidity("Enter a Valid Email Address");
            Email.reportValidity();
        } else { Email.setCustomValidity(""); }
      });
      pass.addEventListener("input", () => {
        if ( pass.validity.tooShort) {
            pass.setCustomValidity("Password must be more than 6 characters.");
            pass.reportValidity();
        } else { pass.setCustomValidity(""); }
      });
     
     
     var email = Email.value;
     var password = pass.value;
     console.log(password);
     console.log(ConfPass.value);
     console.log(email)

     if(ConfPass.value == password)
     {
         createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
             // Signed in 
             const user = userCredential.user;
             console.log(user);
             const uid = user.uid;
             console.log(uid);

             set(ref(db, 'Users/' + uid), {
                 FirstName : FirstName,
                 LastName : LastName,
                 Email : email,
                 Address : address,
                 PhoneNumber: PhoneNumber,
                 CartDetails:{
                    ProductId:{
                        ProductName : "ProductName"
                    }
                 }
                
             })
            //  set(ref(db, 'Users/' + uid + 'CartDetails' + "ProductId"), {
                swal({
                    title: "Registered Succesfully",

                    icon: "success",
                    
                    }); 
               
            // })
            //  // ...
         })
         .catch((error) => {
             const errorCode = error.code;
             console.log(errorCode)
             const errorMessage = error.message;
             console.log(errorMessage)

             if(errorCode == "auth/email-already-in-use")
             {
                console.log("same")
                swal({
                    title: "Email Already Exists ",

                    icon: "error",
                    
                    }); 
             }
             // ..
         });
     }
     else
     {
         console.log("Paasword Does Not match");
     }
     

 }

//--------------------------------------LogIn User Using Firebase Auth ------------------------------------------------------//
  document.getElementById("LogIn").onclick = function(){
     
     var Email = document.getElementById("LoginEmail");
     var pass = document.getElementById("id_password");
     
     var email = Email.value;
     console.log(email)
     var password = pass.value;

     signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
             // Signed in 
             const user = userCredential.user;
             console.log(user);
             console.log("User Login In")

             swal({
                title: "LOG-IN Succesfully",

                icon: "success",
                
                }
                ).then(function() {
                    var LoginForm2 = document.getElementById("form-box")
                    let loginForm = document.querySelector('.login-form');
                    let signupForm = document.querySelector('.signup-form');
                    document.querySelector('.home').style.filter = "blur(0px)";
                    LoginForm2.style.visibility = "hidden";
                    signupForm.classList.toggle('active')
                    loginForm.classList.remove('active')
                });
             
           
            // window.location.href = 'index.html';
           // sessionStorage.setItem("LogInStatus","True")
           
        
                        
                      
             
         })
         .catch((error) => {
             const errorCode = error.code;
             console.log(errorCode)
             const errorMessage = error.message;
             console.log(errorMessage)
         });

       
        
  }

}



       
 
    

 
 