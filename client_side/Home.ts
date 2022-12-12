import {IBook} from "../src/db/interfaces/Book"

let TotalBooks:IBook[];



 


  function Show(){
     let element=document.getElementById("MyTable") as HTMLElement;
     element.innerHTML="";
     
     
     
    for(let i=0;i<TotalBooks.length;i++){
      element.innerHTML+="<tr> <th scope=\"row\">"+(i+1)+"</th>"+"<td>" + TotalBooks[i].book_name +"</td>"+"<td>" + TotalBooks[i].genre +"</td>" +"<td>" + TotalBooks[i].author +"</td>" +"<td>" + TotalBooks[i].avg_rating +"</td>" +"<td>" + TotalBooks[i].book_description +"</td>"+"</tr>" ;
    

             }

 }





async function GetMmebers(){
    const request=await fetch("/books");
  TotalBooks =await request.json();
   console.log(TotalBooks);
   

}


window.onload = async function (){
    await GetMmebers();
    console.log("Hanyyy");
    Show();
   
    
}
    
 
// Show();
    
