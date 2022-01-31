import React, { useEffect, useState } from "react";
import { Row, Col, Offcanvas } from "react-bootstrap";
import styles from './Main.module.css';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import ReactSearchBox from "react-search-box";
import { AiOutlineSearch } from "react-icons/ai";
import SelectSearch from 'react-select-search';
import Select from 'react-select';
import Checkbox from '../Main/Checkbox';
import Form from 'react-bootstrap/Form';
import SearchBar from '../SearchBox/SearchBar'
import ReactDOM from "react-dom";
import './Cstyle.css';
const Main = () => {
    const [Users, fetchUsers] = useState([]);

    const [district, fetchdistrict] = useState([]);

    const getData = () => {
      fetch('https://engine.shikho.net/address?division_id=487095964')
        .then((res) => res.json())
        .then((res) => {
        
          const dummy = [];
          res.body.map(item => {
              dummy.push({
                  key: item._key,
                  value: item.display
              })
          })
          fetchUsers(dummy)
        })
    }

    
    const getDisdrictsData = () => {
        fetch('https://engine.shikho.net/address?district_id=613581915')
          .then((res) => res.json())
          .then((res) => {
            //console.log('-------------------------district-------------hh',res)
            const dummy = [];
            res.body.map(item => {
                dummy.push({
                    value: item._key,
                    label: item.display
                })
            })
            fetchdistrict(dummy)
          })
      }
    useEffect(() => {
        getData();
        getDisdrictsData();
    }, []);

  

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
                packageName:'package 1',
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

     
    const [valueState, setValueState] = useState("")
    // create a function that handle the React-select event and
    // save the value of that event on an state every time the component change
    const handler = (event) => {
        const value = event.value
        setValueState(value)
    }

    const [searchhandlerv, setVearchhandlerv] = useState("");
    const searchhandler = (event) => {
        console.log('hell', event);
        // const value = event.target.value;
        setVearchhandlerv(event);
        // console.log('founding------',value);
    }


    // OffCanvas 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [search, Setsearch] = useState("");
   

   
    const [place, setPlace] = useState([]);
    const [id, setId] = useState(1);

    const addPlace = () => {
        let obj = {
            id: id,
            value: 'Popular Place ' + id,
        }
        setId((prevState) => prevState + 1);
        let temp = place;
        temp.push(obj);
        setPlace([...temp]);
    }

    const removePlace = (id) => {
        let temp = place;
        var index = temp.findIndex(function (x) {
            return x.id === id;
        })
        if (index !== -1) temp.splice(index, 1);
        setPlace([...temp]);
    }

console.log('----plaaaaaaceee---',place);

    const handleChange = (e, id) => {
        e.preventDefault();
        let temp = place;
        var index = temp.findIndex(function (x) {
            return x.id === id;
        })
        if (index !== -1) {
            temp[index].value = e.target.value;
        }
        setPlace([...temp]);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        let obj = [{
            district:district,
            division:Users,
            PopularPlacw: place,
            package:checked,
            
        }];
        console.log('obj----latest-----------', obj);
        localStorage.setItem("All Data",JSON.stringify(obj));

  
    }

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          border: '1px dotted pink',
          color:  'blue',
        }),
        control: () => ({
          // none of react-select's styles are passed to <Control />
          width: 100,

        }),
        singleValue: (provided, state) => {
          const opacity = 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        }
      }
      const dot = (color = 'transparent') => ({
        alignItems: 'center',
        display: 'flex',
      
        ':before': {
          backgroundColor: color,
          borderRadius: 10,
          content: '" "',
          display: 'block',
          marginRight: 8,
          height: 10,
          width: 10,
        },
      });
      const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: '#F5F6FE' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          const color = '#F5F6FE';
          return {
            ...styles,
            backgroundColor: isDisabled
              ? undefined
              : isSelected
              ? data.color
              : isFocused
              ? '#F5F6FE'
              : undefined,
            color: isDisabled
              ? '#ccc'
              : isSelected
              ? 'red' > 2
                ? 'white'
                : 'black'
              : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',
      
            ':active': {
              ...styles[':active'],
              backgroundColor: !isDisabled
                ? isSelected
                  ? data.color
                  : '#F5F6FE'
                : undefined,
            },
          };
        },
        input: (styles) => ({ ...styles, ...dot() }),
        placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
      };


    return (
        <div>
            <Row>
                <Col md={2} className="mx-0 px-0 d-none d-md-block">
                    <div className={`sticky-top ${styles.sidebar}`}>

                    </div>
                </Col>

                <Col md={10} style={{ paddingLeft: '10px' }}>
                    <Row className={`${styles.head}`}>
                        <Col md={8} sm={8} xs={7} className="d-flex align-items-center">
                            <p className={styles.heading}>Want to add a new place?</p>
                        </Col>
                        <Col md={4} sm={4} xs={5} className="d-flex align-items-center justify-content-end">
                            <button onClick={handleShow} className={`btn ${styles.btn}`}>+ add new place</button>
                        </Col>
                    </Row>

                    <Row className={styles.content}>
                        <p className={`${styles.conHead} mt-4`}>Popular Places</p>
                        <Row>
                           
                                    <Col md={4} >
                                        <div className={styles.box}>
                                            <div>
                                                <p className={styles.text1}>Manikgonj</p>
                                                <p className={styles.text2}>Popular Place 1</p>
                                            </div>
                                            <button className={`btn ${styles.editBtn}`}>EDIT</button>
                                        </div>
                                    </Col>

                                    <Col md={4} >
                                        <div className={styles.box}>
                                            <div>
                                                <p className={styles.text1}>Manikgonj</p>
                                                <p className={styles.text2}>Popular Place 1</p>
                                            </div>
                                            <button className={`btn ${styles.editBtn}`}>EDIT</button>
                                        </div>
                                    </Col>
                              
                          

                        </Row>

                    </Row>
                </Col>
            </Row>



            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* Dynamic button  */}
                        <div className="mt-5">
                            <div>
                             

                                <div className="mt-5" style={{ width: '70%'}}>
                                <div>
                                        <span  className="title"  >
                                            Divisions
                                        </span>
                                    </div>
                                    <div  style={{  position:'relative' }}>
                                        
                                        <div className="" >
                                            <ReactSearchBox
                                                placeholder="Placeholder"
                                                value="joe"
                                                data={Users}
                                                onChange={searchhandler}
                                                inputBackgroundColor='#F5F6FE'
                                            />


                                        </div>
                                        <div style={{ position: "absolute", top: 5,right:10 }}>
                                            <AiOutlineSearch />
                                        </div>
                                    </div>





                                    <div  style={{paddingTop:15}}>

                                    <div>
                                        <span  className="title"  >
                                            District
                                        </span>
                                    </div>

                                        <Select options={district} 
                                        onChange={handler} 
                                        styles={colourStyles}
                                        
                                        />

                                    </div>
                                 


                                </div>


                                <div  style={{paddingTop:15}}>
                                <div>
                                        <span  className="title"  >
                                            Poular Place
                                        </span>
                                    </div>
                                <div>
                                  
                                    {
                                        place.map(p => (
                                            <div key={p.id} style={{ textAlign: 'left' }}>
                                                <input type="text" value={p.value} onChange={(e) => handleChange(e, p.id)} className={styles.input} />
                                                <button className={`btn`} onClick={() => (removePlace(p.id))}><IoIosRemoveCircleOutline size={33} className={styles.remove} /></button>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <button className={`btn ${styles.add}`} onClick={addPlace}>+ add aa place</button>
                                </div>
                                </div>
                              

                                    <div>

                                    <div  style={{paddingTop:25}}> 
                                    <div>
                                        <span  className="title"  >
                                            Packages
                                        </span>
                                    </div>
      <div className="checkList"  style={{marginTop:8}}>
       
        <div className="list-container">
          {checked.map((item, index) => (
            <div className="packagedetails">
              <div className="emptyDiv">

             </div>
             <div className="package"   style={{marginLeft:15}}>
               <div>
               <span style={{color:'#bd6c1b'}}>{item.packageName}</span>
               </div>
               <div>
               <span >{item.price}</span>
               </div>
             </div>
              <div  className="inputcheckbox"   key={index}>
              <input  type="checkbox" id={item.id} checked={item.isChecked}  class="checkboxClass"
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
            
            </div>


            </div>
          ))}
        </div>
      </div>
 
     
    </div>
                                    </div>
                               
                                {/* <div>
                                    <input type="submit" />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <button className={`btn ${styles.add}`} onClick={handleSubmit}>Test Button</button>
                                </div> */}
                                <div  style={{marginTop:10}}>
                                <button onClick={handleSubmit} className={`btn ${styles.submitbtn}`}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>


        </div>
    )
}
export default Main;