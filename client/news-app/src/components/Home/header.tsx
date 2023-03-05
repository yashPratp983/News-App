import classes from './header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faBars,faAngleUp,faAngleDown } from '@fortawesome/free-solid-svg-icons'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { Button, Typography,styled } from '@mui/material';
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import Drawer from '@mui/material/Drawer';
import { useUserContext } from '../../contexts/user';
import { useNewsContext } from '../../contexts/news';
import { usefilterContext } from '../../contexts/filter';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props={
    getSearchNews:(filteredNews:string)=>void
}

const Header = ({getSearchNews}:Props) => {
    const {filter,setfilter}=usefilterContext()
    const navigate=useNavigate()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {news,setNews}=useNewsContext()
    const [open1, setOpen1] = useState(false);
    const open = Boolean(anchorEl);
    const [opendrawer, setOpendrawer] = useState(false);
    const [show, setShow] = useState(false);
    const { user, setUser } = useUserContext()
    const [loading,setloading]=useState('')
    const [search, setSearch] = useState('');
    const [searchNews, setSearchNews] = useState<{}[] | undefined>([]);

    const filterItems = news?.map((item) => item.type).filter((value, index, self) => self.indexOf(value) === index);

    const handleClickOpen = () => {
      setOpen1(true);
    };
  
    const handleClose1 = () => {
      setOpen1(false);
    };
  
    const handleClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const subscribeTopic=async(topic:string,item:string)=>{
        const token=localStorage.getItem('token')

        if(!user){
            navigate('/login')
            return
        }
        try{
            setloading(item)
            const data=await axios.put('https://6404d5c738068b3beb6907cd--beautiful-rolypoly-1da010.netlify.app/.netlify/functions/user/subscribetopic',{topic},{headers:{authorisation:`Bearer ${token}`}})
            setUser(data.data.user)
            setloading('')
        }
        catch(err:any){
           setloading('')
           toast.error(`${err.response.data.error}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        }

    }

    const unsubscribeTopic=async(topic:string,item:string)=>{
        const token=localStorage.getItem('token')

        if(!user){
            navigate('/login')
            return
        }
        try{
            setloading(item)
            const data=await axios.put('https://6404d5c738068b3beb6907cd--beautiful-rolypoly-1da010.netlify.app/.netlify/functions/user/unsubscribetopic',{topic},{headers:{authorisation:`Bearer ${token}`}})
            setUser(data.data.user)
            setloading('')
        }
        catch(err:any){
            setloading('')
            toast.error(`${err.response.data.error}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const unsubscribeAuthor=async(author:string,item:string)=>{
        const token=localStorage.getItem('token')

        if(!user){
            navigate('/login')
            return
        }
        try{
            setloading(item);
            const data=await axios.put('https://6404d5c738068b3beb6907cd--beautiful-rolypoly-1da010.netlify.app/.netlify/functions/user/unsubscribeauthor',{author},{headers:{authorisation:`Bearer ${token}`}})
            setUser(data.data.user)
            setloading('')
        }
        catch(err:any){
           setloading('')
           toast.error(`${err.response.data.error}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        }
    }

    const dialogStyle={
        width:'400px',
        padding:'20px',
        "&::-webkit-scrollbar": {
            width: '5px'
        },
        "&::-webkit-scrollbar-track": {
            background: '#f1f1f1'
        },
        "&::-webkit-scrollbar-thumb": {
            background: '#888'
        },
        "&::-webkit-scrollbar-thumb:hover": {
            background: '#555'
        },
    }

    const Titles=styled(Typography)`
    font-size:20px;
    font-weight:600;
    padding-bottom:20px;
    padding-top:20px;
    `

    const TopicItem=styled(Box)`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding-bottom:15px;
    `

    const ButtonElement=styled(Button)`
    width:120px;
    height:30px;
    background-color:#4CAF50;
    color:white;
    
    &:hover {
        background-color: #45a049;
    
}
    `
    const leftBar={
        width:'250px',
        height:'100vh',
        padding:'30px 0px',
    }

    const DrawerItems=styled(Typography)`
    font-size:18px;
    font-weight:400;
    
    padding:0px 20px;
    padding-bottom:20px;
    align-items:center;
    cursor:pointer;
    &:hover{
        background-color:#f1f1f1;
    }
    
    `

    const DrawerItems1=styled(Typography)`
    font-size:15px;
    font-weight:400;
    align-items:center;
    cursor:pointer;
    `

    const DrawerItems2=styled(Typography)`
    font-size:15px;
    font-weight:400;
    
    padding:0px 20px;
    padding-bottom:20px;
    align-items:center;
    cursor:pointer;
    &:hover{
        background-color:#f1f1f1;
    }
    `
    const handleFilter=(item:string)=>{
        if(item=='all'){
            setfilter(null)
        }
        else{
            setfilter(item)
        }
       handleClose()
       setShow(false)
       setOpendrawer(false)
       console.log(item)
    }

    const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
        getSearchNews(e.target.value)
    }

    return(
        <>
        <div className={classes.header}>
            <h1 className={classes.title}>News</h1>
            <div className={classes.search}>
                <FontAwesomeIcon icon={faSearch} className={classes.searchicon}/>
                <input placeholder="Search news" className={classes.input} onChange={handleSearch}></input>
            </div>
            <div className={classes.rightcon}>
            {!user && <p className={classes.login} onClick={()=>{navigate('/login')}}>Login</p>}
            {user && <p className={classes.login} onClick={()=>{localStorage.removeItem('token');setUser(null)}}>Logout</p>}
            <p className={classes.filter} onClick={handleClick}>filter</p>
            <p className={classes.subscribe} onClick={handleClickOpen}>Subscribe</p>
            
            </div>
            <FontAwesomeIcon icon={faBars} className={classes.button} onClick={()=>{setOpendrawer(!opendrawer)}}/>
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            >
                <MenuItem onClick={()=>{handleFilter('all')}}>All</MenuItem>
                {filterItems?.map((item,index)=>{
                    return(
                        <MenuItem key={index} onClick={()=>{handleFilter(item)}}>{item}</MenuItem>
                    )
                }
                )}

      </Menu>
      <Dialog open={open1} onClose={handleClose1} PaperProps={{sx:dialogStyle}}>
            <FontAwesomeIcon icon={faXmark} onClick={handleClose1} style={{marginLeft:'auto',cursor:'pointer'}}/>
        
        <Box>
            <Titles>Subscribe Topics</Titles>
            {filterItems?.map((item,index)=>{
                return(
                    <TopicItem key={index}>
                        <Typography>{item}</Typography>
                        {user?.subscribed_topic.includes(item) && loading!=item && <ButtonElement onClick={()=>{unsubscribeTopic(item,item)}}>Unsubscribe</ButtonElement>}
                        {!user?.subscribed_topic.includes(item) && loading!=item && <ButtonElement onClick={()=>{subscribeTopic(item,item)}}>Subscribe</ButtonElement>}
                        
                        {loading==item && <ButtonElement disabled style={{color:'white'}}>loading...</ButtonElement>}
                    </TopicItem>
                )
            })}
           
        </Box>
        <Box>
        <Titles>Subscribed Authors</Titles>
           {user?.subscribed_author.map((item,index)=>{
                return(
                 <TopicItem key={index}>
                 <Typography>{item}</Typography>
                 {loading!=item && <ButtonElement onClick={()=>{unsubscribeAuthor(item,item)}}>Unsubscribe</ButtonElement>}
                 {loading==item && <ButtonElement disabled style={{color:'white'}}>loading...</ButtonElement>}
                </TopicItem>
                )
           })}
        </Box>
        </Dialog>
        <Drawer anchor='right' open={opendrawer} onClose={() => { setOpendrawer(false) }} PaperProps={{
                sx: leftBar, elevation: 24
            }}>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
            {!user && <DrawerItems onClick={()=>{navigate('/login')}}>Login</DrawerItems>}
            {!user && <DrawerItems onClick={()=>{navigate('/signup')}}>Sign up</DrawerItems>}
            {user && <DrawerItems onClick={()=>{localStorage.removeItem('token');setUser(null)}}>Logout</DrawerItems>}
            <DrawerItems>Subscribe</DrawerItems>
            <DrawerItems>
                <Box sx={{display:'flex',justifyContent:'space-between'}} onClick={()=>{setShow(!show)}}>
                <Typography style={{fontSize:'18px'}}>Filter</Typography>
                {!show && <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>}
                {show && <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>}
                </Box>
            </DrawerItems>
            {show && <DrawerItems1 >
            <DrawerItems2 onClick={()=>{handleFilter('all')}}>All</DrawerItems2>
                {filterItems?.map((item,index)=>{
                    return(
                        <DrawerItems2 key={index} onClick={()=>{handleFilter(item)}}>{item}</DrawerItems2>
                    )
                })}
            </DrawerItems1>}
            </Box>
        </Drawer>
        </div>
        <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default Header