const express = require('express')
const app = express()
const cors = require('cors');
const PORT = process.env.PORT || 8080;

app.use(cors()); 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const { FieldValue } = require('firebase-admin/firestore')
const { db } = require('./firebase.js')


app.post('/addService/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const requestJson ={
            id : req.body.id,
            serviceName : req.body.serviceName,
            cost : req.body.cost,
            package: req.body.package,
            description: req.body.description,
            rating: req.body.rating,
            serviceImage: req.body.serviceImage
        };
        const response = await db.collection("services").doc(id).set(requestJson);
        res.send(response);
        console.log("Data has been Inserted Successfully");
    }catch(error){
        res.send(error);
    }
})

app.post('/addServiceRequest/:serviceId', async (req, res) => {
    try{
        const id = req.params.serviceId;
        const requestJson ={
           serviceId: req.body.serviceId,
           userId: req.body.userId,
           status: req.body.status,
           serviceName : req.body.serviceName,
           cost : req.body.cost,
           package: req.body.package,
           description: req.body.description,
           rating: req.body.rating,
           serviceImage: req.body.serviceImage
        };
        const response = await db.collection("serviceRequest").doc(id).set(requestJson);
        res.send(response);
    }catch(error){
        res.send(error);
    }
})

app.post('/addUser',async(req,res)=> {
    try{
        const id = req.body.id;
        const requestJson ={
            userId : req.body.userId,
            userName: req.body.userName
        };
        const response = await db.collection("users").doc(id).add(requestJson);
        res.send(response);
    }catch(error){
        res.send(error);
    }
})


app.get('/getServices',async(req,res)=> {
    try{
        const response = await db.collection("services").get()
        let responseArr =[];
        response.forEach(doc =>{
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    }catch(error){
        res.send(error);
    }
})

app.get('/getServicesRequests',async(req,res)=> {
    try{
        const response = await db.collection("serviceRequest").get()
        let responseArr =[];
        response.forEach(doc =>{
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    }catch(error){
        res.send(error);
    }
})

app.get('/getServiceRequest/:userId',async(req,res)=> {
    try{
        console.log(req.body);
        const id = req.body.id;
        const requestJson ={
            userId : req.body.userId,
            userName: req.body.userName
        };
        const response = await db.collection("serviceRequest").get()
        let responseArr =[];
        response.forEach(doc =>{
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    }catch(error){
        res.send(error);
    }
})


app.put('/updateServiceRequest/:id/:status', async (req, res) => {
    try{
        const id = req.params.id;
        const status = req.params.status;
        const response = await db.collection("serviceRequest").doc(id).update({["status"]: status});
        res.send(response);
    }catch(error){
        res.send(error);
    }
})


app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})