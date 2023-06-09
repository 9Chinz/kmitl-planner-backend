const router = require("express").Router();
const MongoClient = require('mongodb').MongoClient

// test path for backend
router.get('/test', (req, res) => {
    res.status(200).json({
        message: 'test backend'
    });
});

// get all subject
router.get('/subject', async (req, res) => {
    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const subjects = db.collection('subject');

    const doc = subjects.find();
    const result = await doc.toArray();
    await client.close();

    if (result.length > 0){
        res.status(200).json({
            error: false,
            message: "all subjects detail",
            match_subject: result
        });
    }else{
        res.status(404).json({
            error: true,
            message: "not found any subject",
        });
    }
});

router.post('/subject/specific', async (req, res) => {
    const {subject_id} = req.body;

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const subjects = db.collection('subject');

    const doc = subjects.find({subject_id: subject_id});
    const result = await doc.toArray();
    await client.close();

    if (result.length > 0){
        res.status(200).json({
            error: false,
            message: "subject detail",
            match_subject: result
        });
    }else{
        res.status(404).json({
            error: true,
            message: "not found any subject",
        });
    }
});

// add one subject that not duplicated
router.post('/subject', async (req, res) => {
    const {subject_id, type, curriculum_id} = req.body;

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const subjects = db.collection('subject');

    const doc = subjects.find({subject_id: subject_id, type: type, curriculum_id: curriculum_id});

    const result = await doc.toArray();

    if(result.length > 0){
        if(result[0].subject_id == subject_id && result[0].type == type && result[0].curriculum_id == curriculum_id){
            await client.close();
            return res.status(200).json({
                error: false,
                message: "subject is duplicate",
                match_subject: result
            });
        }
    }
    const insert = await subjects.insertOne(req.body);
    await client.close();
    res.status(200).json({
        error: false,
        message: "insert subject success",
        insert_subject: insert
    });
});

// update subject
router.put('/subject', async (req, res) => {
    const {subject_id} = req.body;

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const subjects = db.collection('subject');

    const result = await subjects.findOneAndUpdate({subject_id: subject_id}, {$set: req.body});
    await client.close();

    if(result.value == null){
        res.status(404).json({
            error: true,
            message: "not found any subject",
        });
    }else{
        res.status(200).json({
            error: false,
            message: "update subject success",
            update_subject: result
        });
    }

});

// delete subject
router.delete('/subject', async (req, res) => {
    const {subject_id} = req.body;

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const subjects = db.collection('subject');

    const result = await subjects.findOneAndDelete({subject_id: subject_id});
    await client.close();
    if(result.value == null){
        res.status(404).json({
            error: true,
            message: "not found any subject",
        });
    }else{
        res.status(200).json({
            error: false,
            message: "delete subject success",
            delete_subject: result
        });
    }

});

// get all subject gened
router.get('/subjectGened', async (req, res) => {
    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const subject_gened = db.collection('subject_gened');

    const doc = subject_gened.find();
    const result = await doc.toArray();
    await client.close();

    if (result.length > 0){
        res.status(200).json({
            error: false,
            message: "all subject gened detail",
            match_subject: result
        });
    }else{
        res.status(404).json({
            error: true,
            message: "not found any subject gened",
        });
    }
});

router.post('/subjectGened/specific', async (req, res) => {
    const {subject_id} = req.body;

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const subject_gened = db.collection('subject_gened');

    const doc = subject_gened.find({subject_id: subject_id});
    const result = await doc.toArray();
    await client.close();

    if (result.length > 0){
        res.status(200).json({
            error: false,
            message: "subject gened detail",
            match_subject: result
        });
    }else{
        res.status(404).json({
            error: true,
            message: "not found any subject gened",
        });
    }
});

// add one subject gened that not duplicated
router.post('/subjectGened', async (req, res) => {
    const {subject_id, type} = req.body;

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const subject_gened = db.collection('subject_gened');

    const doc = subject_gened.find({subject_id: subject_id, type: type});

    const result = await doc.toArray();

    if(result.length > 0){
        if(result[0].subject_id == subject_id && result[0].type == type){
            await client.close();
            return res.status(200).json({
                error: false,
                message: "subject gened is duplicate",
                match_subject: result
            });
        }
    }
    const insert = await subject_gened.insertOne(req.body);
    await client.close();
    res.status(200).json({
        error: false,
        message: "insert subject gened success",
        insert_subject: insert
    });
});

// update subject gened
router.put('/subjectGened', async (req, res) => {
    const {subject_id} = req.body;

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });
    
    const db = client.db(`${process.env.DB_NAME}`);
    const subject_gened = db.collection('subject_gened');

    const result = await subject_gened.findOneAndUpdate({subject_id: subject_id}, {$set: req.body});
    await client.close();

    if(result.value == null){
        res.status(404).json({
            error: true,
            message: "not found any subject gened",
        });
    }else{
        res.status(200).json({
            error: false,
            message: "update subject gened success",
            update_subject: result
        });
    }
});

// delete subject gened
router.delete('/subjectGened', async (req, res) => {
    const {subject_id} = req.body;

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const subject_gened = db.collection('subject_gened');

    const result = await subject_gened.findOneAndDelete({subject_id: subject_id});
    await client.close();

    if(result.value == null){
        res.status(404).json({
            error: true,
            message: "not found any subject gened",
        });
    }else{
        res.status(200).json({
            error: false,
            message: "delete subject gened success",
            delete_subject: result
        });
    }

});

// get all curriculum
router.get('/curriculum', async (req, res) => {
    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const curriculum = db.collection('curriculum');

    const doc = curriculum.find();
    const result = await doc.toArray();
    await client.close();

    if (result.length > 0){
        res.status(200).json({
            error: false,
            message: "all curriculum detail",
            match_result: result
        });
    }else{
        res.status(404).json({
            error: true,
            message: "not found any curriculum",
        });
    }
});

// get one curriculum
router.post('/curriculum/specific', async (req, res) => {
    const {curriculum_id} = req.body;

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const curriculum = db.collection('curriculum');

    const doc = curriculum.find({curriculum_id: curriculum_id});
    const result = await doc.toArray();
    await client.close();

    if (result.length > 0){
        res.status(200).json({
            error: false,
            message: "curriculum detail",
            match_curriculum: result
        });
    }else{
        res.status(404).json({
            error: true,
            message: "not found any curriculum",
        });
    }
});

// insert one curriculum that not duplicated
router.post('/curriculum', async (req, res) => {
    const {curriculum_id} = req.body;

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const curriculum = db.collection('curriculum');

    const doc = curriculum.find({curriculum_id: curriculum_id});

    const result = await doc.toArray();

    if(result.length < 8){
        const insert = await curriculum.insertOne(req.body.data);
        await client.close();
        res.status(200).json({
            error: false,
            message: "insert curriculum success",
            insert_subject: insert
        });
    }else{
        await client.close();
        res.status(200).json({
            error: false,
            message: "curriculum is duplicate",
            match_subject: result
        });
    }
});

// update curriculum
router.put('/curriculum', async (req, res) => {
    const {curriculum_id, type_id} = req.body.data;

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const curriculum = db.collection('curriculum');

    const result = await curriculum.findOneAndUpdate({curriculum_id: curriculum_id, type_id: type_id}, {$set: req.body.data});
    await client.close();
    
    if(result.modifiedCount == 0){
        res.status(404).json({
            error: true,
            message: "not found any curriculum",
        });
    }else{
        res.status(200).json({
            error: false,
            message: "update curriculum success",
            update_subject: result
        });
    }
});

// delete curriculum
router.delete('/curriculum', async (req, res) => {

    const {curriculum_id} = req.body;

    console.log(curriculum_id)

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const curriculum = db.collection('curriculum');

    const result = await curriculum.deleteMany({curriculum_id: parseInt(curriculum_id)});
    await client.close();

    if(result.deletedCount == 0){
        res.status(404).json({
            error: true,
            message: "not found any curriculum",
        });
    }else{
        res.status(200).json({
            error: false,
            message: "delete curriculum success",
            delete_subject: result
        });
    }
});

// get all type
router.get('/type', async (req, res) => {

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const type = db.collection('type');

    const doc = type.find();
    const result = await doc.toArray();
    await client.close();

    if (result.length > 0){
        res.status(200).json({
            error: false,
            message: "all type detail",
            match_type: result
        });
    }else{
        res.status(404).json({
            error: true,
            message: "not found any type",
        });
    }
});


module.exports = router;
