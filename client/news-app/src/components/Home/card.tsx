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

type cardProps={
    title:string
    by:string
    url:string
    time:number
    score:number
    type:string
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
    width:110px;
    height:30px;
    background-color:#4CAF50;
    color:white;
    "&:hover": {
        background: #45a049,
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


const Cardcom=()=>{
    const {news}=useNewsContext();
    const navigate=useNavigate();
    const {filter,setfilter}=usefilterContext();
    let news1=news?.sort((a,b)=>b.score-a.score);

    if(filter){
        news1=news1?.filter((item)=>item.type==filter)
    }
    console.log(news1)
    return(
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
            <SubscribeButton>
                Subscribe
            </SubscribeButton>                
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
    )
}

export default Cardcom