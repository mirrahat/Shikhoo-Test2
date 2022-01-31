import React, { useState } from "react";
import ReactDOM from "react-dom";
import './Cstyle.css';
 
function Checkbox() {
  // State with list of all checked item
  const [checked, setChecked] = useState([
    {
    id:1,
    packageName:'Package 1',
    price:'500',
    isChecked: true,
   
    }
    ,
    {
        id:2,
        packageName:'Package 2',
        price:'500',
        isChecked: false,
        },
        {
            id:3,
            packageName:'package 3',
            price:'500',
            isChecked: true,
           
            }
   
      ]);
 
 
  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
 
  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";
 
  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";
console.log(checked);
localStorage.setItem("chek", JSON.stringify(checked));
 
  return (
    <div>
      <div className="checkList">
        <div className="title">Your CheckList:</div>
        <div className="list-container">
          {checked.map((item, index) => (
            <div className="packagedetails">
              <div className="emptyDiv">

             </div>
             <div className="package">
               <div>
                 <span>Package 1</span>
               </div>
               <div>
                 <span>
                   300tk.
                 </span>
               </div>
             </div>
              <div key={index}>
              <input  type="checkbox" id={item.id} checked={item.isChecked}
              onChange={(event) => {
                  setChecked(
                    checked.map( (d)=>
                        {
                            if (item.id === d.id) {
                                d.isChecked = event.target.checked;
                            }
                        
                            return d;
                        }
                    )
                    )
              }} />
              <span className={isChecked(item)}>{item.packageName}</span>
            </div>


            </div>
          ))}
        </div>
      </div>
 
     
    </div>
  );
}
 
export default Checkbox;
 
