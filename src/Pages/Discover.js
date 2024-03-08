import React, { useEffect, useState } from 'react'
import classes from './Discover.module.css'
import DiscoverDataCard from '../Components/DiscoverDataCard'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Footer from '../Components/Footer';
import { fetchCategoryData } from '../Services.js/Http';

import DiscoverSkeleton from '../Components/DiscoverSkeleton';

const Discover = () => {

    const [input,setInput] = useState("");

    const [arr,setArr] = useState([])
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
      const fetchData=async()=>{
        const data = await fetchCategoryData();
        setArr(data)
        setLoading(false);
        // console.log("-----",data)
      }
      fetchData();
    },[])
    
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: "20px",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    color:"white",
    height:"3.5rem"
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

//   console.log(arr)
  

  return (
    <div className={classes.container}>
    <div className={classes.sub_container}>
    <div className={classes.search}>
    <Search>
            <SearchIconWrapper>
              <SearchIcon fontSize='large'/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={input}
              onChange={(e)=>{setInput(e.target.value)}}
            />
          </Search>
    </div>
    {/* <hr /> */}
    <div className={classes.cards}>

    {!loading?
       arr.map((data,index)=>(
        <>
            <div className={classes.card}>
            <DiscoverDataCard name={data.name} id = {data.sub_cat_id}/>
            </div>
            {/* <hr /> */}
            </>
        )):
        <DiscoverSkeleton/>
        }
    </div>
      
        
   <div className={classes.footer}>
   <Footer active={1}/>
   </div>
     
    </div>
    </div>
  )
}

export default Discover
