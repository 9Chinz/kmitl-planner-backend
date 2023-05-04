const router = require("express").Router();
const MongoClient = require('mongodb').MongoClient

router.get('/test', (req, res) => {
    res.status(200).json({
        message: 'test'
    });
});

router.get('/subject', async (req, res) => {
    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const subjects = db.collection('subject');

    const doc = subjects.find();
    const result = await doc.toArray();
    client.close();

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

router.post('/subject', async (req, res) => {
    const {subject_id} = req.body;

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const subjects = db.collection('subject');

    const doc = subjects.find({subject_id: subject_id});
    const result = await doc.toArray();
    client.close();

    res.status(200).json({
        error: false,
        message: "subjects id req",
        match_subject: result
    });
});

router.get('/subjectGened', async (req, res) => {
    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const subject_gened = db.collection('subject_gened');

    const doc = subject_gened.find();
    const result = await doc.toArray();
    client.close();

    if (result.length > 0){
        res.status(200).json({
            error: false,
            message: "all subject gened detail",
            match_subject_gened: result
        });
    }else{
        res.status(404).json({
            error: true,
            message: "not found any subject gened",
        });
    }
});

router.post('/subjectGened', async (req, res) => {
    const {subject_id} = req.body;

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const subject_gened = db.collection('subject_gened');

    const doc = subject_gened.find({subject_id: subject_id});
    const result = await doc.toArray();
    client.close();

    res.status(200).json({
        error: false,
        message: "subjects id req",
        match_subject_gened: result
    });
});

router.post('/courseDetail', async (req, res) => {

    const {curriculum_id} = req.body;

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const curriculums = db.collection('curriculum');

    const doc = curriculums.find({curriculum_id: curriculum_id});
    const result = await doc.toArray();
    client.close();

    if (result.length > 0){
        res.status(200).json({
            error: false,
            message: "all curriculums detail",
            match_curriculum: result
        });
    }else{
        res.status(404).json({
            error: true,
            message: "not found any curriculum",
        });
    }
});

router.get('/type', async (req, res) => {

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const type = db.collection('type');

    const doc = type.find();
    const result = await doc.toArray();
    client.close();

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

router.post('/userTable', async (req, res) => {
    const {user_id} = req.body;

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });
    const db = client.db(`${process.env.DB_NAME}`);
    const user_table = db.collection('user_table');

    const doc = user_table.find({user_id: user_id});
    const result = await doc.toArray();
    client.close();

    if(result.length > 0){
        res.status(200).json({
            error: false,
            message: "user table detail",
            match_user_table: result
        });
    }else{
        res.status(404).json({
            error: true,
            message: "not found any user table",
        });
    }
});

router.put('/userTable', async (req, res) => {
    const {user_id, curriculum_id, year, subject_id} = req.body;

    const client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });
    const db = client.db(`${process.env.DB_NAME}`);
    const user_table = db.collection('user_table');

    const doc = user_table.find({user_id: user_id});
    const result = await doc.toArray();
    
    let is_have_data = false
    if(result.length > 0){
        is_have_data = true
        user_table.updateOne({user_id: user_id}, {$push: {curriculum_id: curriculum_id, year: year, subject_id: subject_id}})
    }else{
        user_table.insertOne({user_id: user_id, curriculum_id: curriculum_id, year: year, subject_id: subject_id})
    }

    client.close();

    res.status(200).json({
        error: false,
        message: `update user table success already have this data ${is_have_data}`,
    });

});

module.exports = router;
