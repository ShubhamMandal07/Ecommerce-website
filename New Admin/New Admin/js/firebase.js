import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js"
import {
    getFirestore, collection , getDocs , doc, setDoc, Timestamp 
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js"


import {getStorage,ref , getDownloadURL,uploadString,uploadBytesResumable  } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js"



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

 
  //--------------------------------------GETTING DATA FROM DATABASE PROCCESS ------------------------------------------------------//
  //init service
  const db = getFirestore();
 


   
  
//   //get collection data
//   getDocs(collRef)
//     .then((snapshot) => {
        
//         snapshot.docs.forEach((doc) => {
//             name.push({ ...doc.data(), id: doc.id})
//         });
//         console.log(name)
//         ImgLink3 =  name[2].imgLink;
//         document.getElementById("offer3").setAttribute('src',ImgLink3)  
//         ImgLink1 =  name[0].imgLink;     
//         document.getElementById("offer1").setAttribute('src',ImgLink1)  
        
//         ImgLink2 =  name[1].imgLink;
//         document.getElementById("offer2").setAttribute('src',ImgLink2)  

        
//     })
//     .catch(err =>{
//         console.log(err.message)
//     })


    
    
//--------------------------------------SELECT IMG PRECCESS ------------------------------------------------------//
var selectFileMain = document.getElementById('selectImgMain');
var selectFile1 = document.getElementById('selectImg1');
var selectFile2 = document.getElementById('selectImg2');
window.onload = function () 
{
    
    if(document.URL.includes("Samsung.html"))
    {
       console.log("samsung");
       
    }
    else if(document.URL.includes("admin.html"))
    {
       console.log("admin");
       afunction();
    }
}

 
    console.log("include")
    

        var files = [];
        var side = [];
        var Side2 = [];
        var MainImg = ImageData;
        var SideImg = ImageData;
        var SideImg2 = ImageData;
        var reader;
        
       
        selectFileMain.onclick = function(e){
            selectFileMain.onchange = e =>{
                
                
                files = e.target.files;

                reader = new FileReader(); 
                reader.onload = function(){
                    document.getElementById("myimgMain").setAttribute('src',reader.result);
                    MainImg = reader.result;
                   // console.log(ImageData)
                }
               reader.readAsDataURL(files[0])
               console.log(files)
               
            }
        }
        selectFile1.onclick = function(e){
            selectFile1.onchange = e =>{
                
                side = e.target.files;
               
                reader = new FileReader(); 
                reader.onload = function(){
                    document.getElementById("myimg1").setAttribute('src',reader.result);
                    
                    SideImg = reader.result;
                    
                }
                reader.readAsDataURL(side[0])
                console.log(side)
            }
        }
        
        selectFile2.onclick = function(e){
            selectFile2.onchange = e =>{
                
                Side2 = e.target.files;
                reader = new FileReader(); 
                reader.onload = function(){
                    document.getElementById("myimg2").setAttribute('src',reader.result);
                    SideImg2 = reader.result;
                    
                }
                reader.readAsDataURL(Side2[0])
                console.log(Side2)
            }
        }
    
    

//--------------------------------------UPLOAD PRECCESS ------------------------------------------------------//


   //init service
   
        console.log("ready");
   
  const storage = getStorage();
  var uploadbtn = document.getElementById('upload');

  //collection ref
  const storageRef = ref(storage,'Products/') 
    document.getElementById('submit').onclick = function f()
    {
        

        var ProductName = document.getElementById('ProductName').value;
        var ProductImageLink = 'awf';

        
        
            const storageRef = ref(storage,'Products/' + ProductName+ "Main" + ".jpg" ) 
            //const uploadTask = uploadBytesResumable(storageRef, ImageData);
           const uploadTask = uploadBytesResumable(storageRef , files[0])
           uploadTask.on('state_changed', 
           (snapshot) => 
           {
               // Observe state change events such as progress, pause, and resume
               // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
               const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               console.log('Upload is ' + progress + '% done');
               switch (snapshot.state) {
               case 'paused':
                   console.log('Upload is paused');
                   break;
               case 'running':
                   console.log('Upload is running');
                   break;
               }
           }, 
           (error) => 
           {
               // Handle unsuccessful uploads
           }, 
           () => 
           {
               // Handle successful uploads on complete
               // For instance, get the download URL: https://firebasestorage.googleapis.com/...
               getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
               {
                    console.log('File available at', downloadURL);
                    sessionStorage.setItem("MainImg",downloadURL);
                    const storageRef2 = ref(storage,'Products/' + ProductName+ "Side" + ".jpg" )
                    const uploadTask =  uploadBytesResumable(storageRef2, side[0]);
                
                    uploadTask.on('state_changed', 
                    (snapshot) => 
                    {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        }
                    }, 
                    (error) => 
                    {
                        // Handle unsuccessful uploads
                        console.log(error)
                    }, 
                    () => 
                    {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        sessionStorage.setItem("SideImg",downloadURL);

                        const storageRef3 = ref(storage,'Products/' + ProductName+ "Side2" + ".jpg" )
                            const uploadTask =  uploadBytesResumable(storageRef3 ,  Side2[0]);
                        
                            uploadTask.on('state_changed', 
                            (snapshot) => 
                            {
                                // Observe state change events such as progress, pause, and resume
                                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log('Upload is ' + progress + '% done');
                                switch (snapshot.state) {
                                case 'paused':
                                    console.log('Upload is paused');
                                    break;
                                case 'running':
                                    console.log('Upload is running');
                                    break;
                                }
                            }, 
                            (error) => 
                            {
                                // Handle unsuccessful uploads
                                console.log(error)
                            }, 
                            () => 
                            {
                                // Handle successful uploads on complete
                                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                console.log('File available at', downloadURL);
                                sessionStorage.setItem("Side2Img",downloadURL);
                                sessionStorage.setItem("second", ProductName); 
                                 uploadbtn.click();
                                });
                            }
                        );
                        
                        });
                    }
                );
            });
        }
        );
        
          
    
    }
        
    
    
      
   
      
      



  