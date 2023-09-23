import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { CardActionAreaProps, ListItem } from '@mui/material';
import { useEffect,useState } from 'react';
import { useNewsContext } from '../../contexts/news';
import classes from './cardcontainer.module.css'
import { useNavigate } from 'react-router-dom';
import { usefilterContext } from '../../contexts/filter';
import { useUserContext } from '../../contexts/user';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    searchNews: string
}

const Parent=styled(Box)`
    height:300px;
    // width:300px;
    min-width:275px;
   margin-bottom:50px;
   padding:0 10px;
  
    word-wrap:break-word;

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
`

 const Title=styled(Typography)`
    word-wrap:break-word;
    padding-top:30px;
 `

 const SubscribeButton=styled(Button)`
    width:120px;
    height:30px;
    background-color:#4CAF50;
    color:white;
    &:hover {
        background-color: #45a049;
    }
 `

 const Author=styled(Typography)`
    font-size:14px;
 `

 const AuthorSection=styled(Box)`
 display:flex;
    justify-content:space-between;
    padding:0 10px;
    align-items:center;
    margin-top:10px;
 `


const Cardcom=({searchNews}:Props)=>{
    const {news}=useNewsContext();
    const {user,setUser}=useUserContext();
    console.log(user)
    const [loading,setloading]=useState<number>(0);
    const navigate=useNavigate();
    const {filter,setfilter}=usefilterContext();
    let news1:{
        by: string;
        id: number;
        score: number;
        time: number;
        title: string;
        type: string;
        url: string;
    }[] | null |undefined=news
    const subscribeAuthor=async(author:string,id:number)=>{
        const token=localStorage.getItem('token');
        if(!user){
            navigate('/login')
        }
        else{
            setloading(id)
            try{
            const data=await axios.put('https://beautiful-rolypoly-1da010.netlify.app/.netlify/functions/user/subscribeauthor',{author},{
                headers:{
                    authorisation:`Bearer ${token}`
                }
            })
            setUser(data.data.user)
            setloading(0)
        }
        catch(err:any){
            console.log(err)
            setloading(0)
            toast.error(`${err.response}`, {
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
    }

    const unsubscribeAuthor=async(author:string,id:number)=>{
        const token=localStorage.getItem('token');
        if(!user){
            navigate('/login')
        }
        else{
            setloading(id)
            try{
            const data=await axios.put('https://beautiful-rolypoly-1da010.netlify.app/.netlify/functions/user/unsubscribeauthor',{author},{
                headers:{
                    authorisation:`Bearer ${token}`
                }
            })
            console.log(data)
            setUser(data.data.user)
            setloading(0)
        }catch(err:any){
            console.log(err)
            setloading(0)
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
    }

    if(filter){
        news1=news?.filter((item)=>item.type==filter)
    }
    console.log(news1)

    if(searchNews && searchNews.length>0 && news1) {
        news1=news1.filter((item)=>item.by.toLowerCase().includes(searchNews.toLowerCase()) || item.title.toLowerCase().includes(searchNews.toLowerCase()));
    }

    return(
        <>
        <div className={classes.cardsContainer} >
            {news1?.map((item)=>{
            return(
    <Parent key={item.id} >
    <Card sx={{ minWidth: 275,
    height:300,
    overflowX:'hidden',
    overflowY:'scroll',
    wordWrap:'break-word',
    position:'relative',
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
    marginBottom:'50px',
 }}>
        <CardContent>
        <AuthorSection>
            <Author >
                <p style={{fontFamily:'cursive',color:'grey',paddingBottom:'0',margin:'0'}}>Author:</p>
                <p style={{padding:'0',margin:'0',fontSize:'16px'}}>{item.by}</p>
            </Author >
        {(!user || !user?.subscribed_author.includes(item.by)) && loading!=item.id && <SubscribeButton onClick={()=>{subscribeAuthor(item.by,item.id)}}>Subscribe</SubscribeButton>}
        {user && user?.subscribed_author.includes(item.by) && loading!=item.id && <SubscribeButton  onClick={()=>{unsubscribeAuthor(item.by,item.id)}}>Unsubscribe</SubscribeButton>}               
          {loading==item.id && <SubscribeButton disabled style={{color:'white'}} >loading...</SubscribeButton>}
          </AuthorSection>
          <Title variant="h6" >
          {item.title}
          </Title>
         
        </CardContent>
        <CardActions >
          <Button size="small" style={{margin:'5px 10px', color:'#4CAF50',position:'absolute',bottom:'20px'}} onClick={()=>{window.location.assign(item.url)}}>Learn More</Button>
        </CardActions>
      </Card>
    </Parent>)})}
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

export default Cardcom