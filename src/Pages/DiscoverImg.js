import React,{useState} from 'react'
import classes from './DiscoverImg.module.css'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Footer from '../Components/Footer';
import DiscoverImageCard from '../Components/DiscoverImageCard';
import { useNavigate } from 'react-router-dom';

const DiscoverImg = () => {

    
    const [input,setInput] = useState("");
    
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

      let arr = new Array(25).fill(null);

      const navigate = useNavigate()
      

      const handleOnClick=({id})=>{
        console.log(id)
        navigate(`/category/${id}`)
      }


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
    <hr />
    <div className={classes.cards}>
    {
      arr.map((data,index)=>(
        
        <div className={classes.card} onClick={()=>{  navigate(`/category/${index+1}`)}}>
        
    <DiscoverImageCard />
    </div>
      ))
    }
    </div>


    <div className={classes.footer}>
   <Footer/>
   </div>
    </div>
    </div>
  )
}

export default DiscoverImg
