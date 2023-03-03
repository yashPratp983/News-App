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
const Header = () => {
    const {filter,setfilter}=usefilterContext()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {news,setNews}=useNewsContext()
    const [open1, setOpen1] = useState(false);
    const open = Boolean(anchorEl);
    const [opendrawer, setOpendrawer] = useState(false);
    const [show, setShow] = useState(false);
    const { user, setUser } = useUserContext()

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
    
    &:hover: {
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

    return(
        <div className={classes.header}>
            <h1 className={classes.title}>News</h1>
            <div className={classes.search}>
                <FontAwesomeIcon icon={faSearch} className={classes.searchicon}/>
                <input placeholder="Search author" className={classes.input}></input>
            </div>
            <div className={classes.rightcon}>
            {!user && <p className={classes.login}>Login</p>}
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
            <TopicItem>
                <Typography>Technology</Typography>
                <ButtonElement>Subscribe</ButtonElement>
            </TopicItem>
            <TopicItem>
                <Typography>Technology</Typography>
                <ButtonElement>Subscribe</ButtonElement>
            </TopicItem>
            <TopicItem>
                <Typography>Technology</Typography>
                <ButtonElement>Subscribe</ButtonElement>
            </TopicItem>
            <TopicItem>
                <Typography>Technology</Typography>
                <ButtonElement>Subscribe</ButtonElement>
            </TopicItem>
            <TopicItem>
                <Typography>Technology</Typography>
                <ButtonElement>Subscribe</ButtonElement>
            </TopicItem>
        </Box>
        <Box>
        <Titles>Subscribed Topics</Titles>
            <TopicItem>
                <Typography>Technology</Typography>
                <ButtonElement>Unsubscribe</ButtonElement>
            </TopicItem>
            <TopicItem>
                <Typography>Technology</Typography>
                <ButtonElement>Unsubscribe</ButtonElement>
            </TopicItem>
            <TopicItem>
                <Typography>Technology</Typography>
                <ButtonElement>Unsubscribe</ButtonElement>
            </TopicItem>
            <TopicItem>
                <Typography>Technology</Typography>
                <ButtonElement>Unsubscribe</ButtonElement>
            </TopicItem>
            <TopicItem>
                <Typography>Technology</Typography>
                <ButtonElement>Unsubscribe</ButtonElement>
            </TopicItem>
        </Box>
        <Box>
        <Titles>Subscribed Authors</Titles>
            <TopicItem>
                <Typography>Technology</Typography>
                <ButtonElement>Unsubscribe</ButtonElement>
            </TopicItem>
            <TopicItem>
                <Typography>Technology</Typography>
                <ButtonElement>Unsubscribe</ButtonElement>
            </TopicItem>
            <TopicItem>
                <Typography>Technology</Typography>
                <ButtonElement>Unsubscribe</ButtonElement>
            </TopicItem>
            <TopicItem>
                <Typography>Technology</Typography>
                <ButtonElement>Unsubscribe</ButtonElement>
            </TopicItem>
            <TopicItem>
                <Typography>Technology</Typography>
                <ButtonElement>Unsubscribe</ButtonElement>
            </TopicItem>
        </Box>
        </Dialog>
        <Drawer anchor='right' open={opendrawer} onClose={() => { setOpendrawer(false) }} PaperProps={{
                sx: leftBar, elevation: 24
            }}>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
            {!user && <DrawerItems>Login</DrawerItems>}
            {!user && <DrawerItems>Sign up</DrawerItems>}
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
    )
}

export default Header