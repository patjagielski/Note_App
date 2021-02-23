import app from"../app";
const moment = require('moment');
import request from 'supertest';


describe("Adding a note",()=>{
    it("Consume an API endpoint whilst adding a new note", async done=>{
        await request(app).post("/addNotes").send({"date_created":moment().format('YYYY-MM-DD, HH:mm:ss')}).then((res)=>{
            expect(res.body.message).toBe(200)           
        })
        done();
        
    });
    
});

describe("Editing a note", ()=>{
    it("Consume API endpoint to edit a note", async done =>{
        await request(app).patch("/editNote").send({
            "idnotes":1,
            "version":1,
            "title":"title",
            "content":"content"
        }).then((res)=>{
            expect(res.status).toBe(200)
        });
        done();
    });
});

describe("Deleting a note", ()=>{
    it("Consume API enpoint to delete a note", async done => {
        await request(app).post("/removeNote").send({
            "idnotes": 1
        }).then((res)=>{
            expect(res.status).toBe(200);
        });
        done();
    });
});