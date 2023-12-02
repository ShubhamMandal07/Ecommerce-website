import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js"
import {getDatabase,ref, set ,onValue , get,child } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,updateProfile  } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js"



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
  
//------------------------------------UPLOADING DATA INTO DATABASE ----------------------------------------------------------//
 
function AdminFuntion()
{
    console.log("done");
    document.getElementById('upload').onclick = function(){
        console.log("all done");
        var ProductMainImageLink = sessionStorage.getItem("MainImg");
        var ProductSideImageLink = sessionStorage.getItem("SideImg");
        var ProductSide2ImageLink = sessionStorage.getItem("Side2Img");
        var ProductName = document.getElementById('ProductName').value;
        var ProductID = sessionStorage.getItem("second");
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
  

 //------------------------------------GETTING DATA FROM THE DATABASE ----------------------------------------------------------//
//  function whatis()
//  {
     
//         var productNameDB = document.getElementById('ProductNameDb');
//         var productImageLinkDb = document.getElementById('ProductImageLinkDb');
//         var productDescription = document.getElementById('Description').value;
//         var productPriceDb = document.getElementById('ProductPriceDb');
//         var productCompanyNameDb = document.getElementById('ProductCompanyNameDb');
//         var productCategoryDb = document.getElementById('ProductCategoryDb');
//         var productSalePriceDb = document.getElementById('ProductSalePriceDb');
//         var ProductSearchTags = document.getElementById('SearchTags');
    
//         document.getElementById("SiteTitle").onclick = function(){
//         const dbRef = ref(getDatabase());
//         get(child(dbRef, `Products`)).then((snapshot) => {
//             if (snapshot.exists()) {
                
//                 var dataFromDb = snapshot.val();
//                 console.log(dataFromDb.SAMSUNG.FRIDGE.SAMFRIDGE101);
//                 name = dataFromDb.SAMSUNG.FRIDGE.SAMFRIDGE101.ProductCompanyName;
//                 console.log(name);
    
    
//                 //productCompanyNameDb.innerHTML = dataFromDb.SAMSUNG.FRIDGE.SAMFRIDGE101.ProductCompanyName;
//                // productCategoryDb.innerHTML = dataFromDb.SAMSUNG.FRIDGE.SAMFRIDGE101.ProductCategory;
//                 productNameDB.innerHTML = dataFromDb.SAMSUNG.FRIDGE.SAMFRIDGE101.ProductName;
//                 productPriceDb.innerHTML = ( "Rs." + dataFromDb.SAMSUNG.FRIDGE.SAMFRIDGE101.ProductPrice);
//                 sessionStorage.setItem("ProductValue", dataFromDb.SAMSUNG.FRIDGE.SAMFRIDGE101.ProductPrice);
//                 //productSalePriceDb.innerHTML = ( "Rs." + dataFromDb.SAMSUNG.FRIDGE.SAMFRIDGE101.ProductSalePrice);
//                 productImageLinkDb.style.width = '200px';
//                 productImageLinkDb.style.height = '200px';
//                 productImageLinkDb.setAttribute('src',dataFromDb.SAMSUNG.FRIDGE.SAMFRIDGE101.ProductImageLink);
                

//             } else {
//                 console.log("No data available");
//             }
//             }).catch((error) => {
//             console.error(error);
//             });
//         }

   
// }


window.onload = function () 
{
    if ( document.URL.includes("LogInPage.html") ) {
        LogInSignUp()
        console.log("signupForm")
    }
    else if(document.URL.includes("admin.html"))
    {
        AdminFuntion();
    }
    else if(document.URL.includes("index.html"))
    {
        document.getElementById("PanasonicTV").onclick = function()
        {
           sessionStorage.setItem("ProductCompanyName", "PANASONIC") ;
           sessionStorage.setItem("ProductCategory", "TV") ;
            window.location.href = 'Panasonic.html';
            Samsungfridgecode();
        }
        document.getElementById("Whirlpoolfridge").onclick = function()
        {
           sessionStorage.setItem("ProductCompanyName", "whirlpool") ;
           sessionStorage.setItem("ProductCategory", "FRIDGE") ;
            window.location.href = 'Panasonic.html';
            Samsungfridgecode();
        }

        document.getElementById("SamSungfridge").onclick = function()
        {
            sessionStorage.setItem("ProductCompanyName", "SAMSUNG") ;
           sessionStorage.setItem("ProductCategory", "FRIDGE") ;
            window.location.href = 'Panasonic.html';
            Samsungfridgecode();
        }
    }
    else if(document.URL.includes("Whirlpool.html"))
    {
        
        
        console.log(sessionStorage.getItem("ProductCompanyName"));
        console.log(sessionStorage.getItem("ProductCategory"));
        // var companyName = sessionStorage.getItem("ProductCompanyName");
        // var categoryName=sessionStorage.getItem("ProductCategory");
        var companyName = "ONIDA"
        var categoryName= "AC"
        document.getElementById("SiteTitle").innerHTML = companyName;
        //document.getElementById("ProductCategory").innerHTML = categoryName;

       
        const dbRef = ref(getDatabase());
        get(child(dbRef, `Products/` + companyName + '/' + categoryName)
        ).then((snapshot) =>
        {
            if (snapshot.exists()) 
            {
                var returnArr = [];
                snapshot.forEach((child) =>
                {
                    var item = child.val();
                    item.key = child.key;
                    returnArr.push(item);
                });
                console.log(snapshot.val())
                
                console.log(returnArr)
                sessionStorage.setItem("size",returnArr.length)
            
                var productDetails = sessionStorage.getItem("product")

                console.log(productDetails)
                for ( var i=0; i < returnArr.length; i++) {
                    document.getElementById("ProductImageLinkDb" + i).setAttribute('src',returnArr[i].ProductMainImageLink)
                    sessionStorage.setItem("ProductId" + i,returnArr[i].ProductID)
                    console.log(sessionStorage.getItem("ProductId" + i))
                    document.getElementById("ProductNameDb" + i).innerHTML =  returnArr[i].ProductName;
                    document.getElementById("ProductPriceDb" + i).innerHTML =  returnArr[i].ProductSalePrice;
                    
                } 
            }
        })
    }
}


//--------------------------------------SignIn User Using Firebase Auth ------------------------------------------------------//

function LogInSignUp(){


 const auth = getAuth(app);
 document.getElementById("SignUp").onclick = function(){
     var FirstName = document.getElementById("FirstName").value
     var LastName = document.getElementById("LastName").value
     var address = document.getElementById("address").value
     var PhoneNumber = document.getElementById("PhoneNumber").value
     var Email = document.getElementById("Email");
     var pass = document.getElementById("regi_password");
     var ConfPass = document.getElementById("Confregi_password");

     
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
                
               
            // })
            //  // ...
         })
         .catch((error) => {
             const errorCode = error.code;
             console.log(errorCode)
             const errorMessage = error.message;
             console.log(errorMessage)
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
             window.location.href = 'index.html';
            sessionStorage.setItem("LogInStatus","True")
           
        
                        
                      
             
         })
         .catch((error) => {
             const errorCode = error.code;
             console.log(errorCode)
             const errorMessage = error.message;
             console.log(errorMessage)
         });
  }

}


   
 
    

 
 