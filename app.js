/*
 * @Author: Celine
 * @Date:   2017-12-09 19:44:57
 * @Last Modified by:   Celine
 * @Last Modified time: 2017-12-09 20:45:03
 */
const express= require('express')
const expressArtTemplate=require('express-art-template')
const comment=require('./comment')
const bodyParser=require('body-parser')

const app=express()
// 把node_modules 开放出来
app.use('/node_modules/',express.static("./node_modules/"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// 配置模板引擎
app.engine("html",expressArtTemplate)


app.get("/",(req,res)=>{
	// res.send('hahah')
	comment.findAll((err,comments)=>{
		if(err){
			return console.log('读取数据失败')
		}
		res.render('index.html',{
			comments
		})
	})
	
	
})
app.get("/fabiao",(req,res)=>{
	res.render('fabiao.html')
})
app.post('/fabiao',(req,res)=>{
	const body=req.body
	if(!body.name||!body.name.length){
		return res.send('name invalid')
	}
	if(!body.content||!body.content.length){
		return res.send('content invalid')
	}
	comment.save(body,err=>{
		if(err){
			return res.send('500 server Error')
		}
		res.redirect('/')
	})
})
app.listen(8080,function(){
	console.log('running...')
})