const router = require("express").Router();
const MongoClient = require('mongodb').MongoClient

router.get('/test', (req, res) => {
    res.status(200).json({
        message: 'test'
    });
});

router.post('/subject', async (req, res) => {
    let {subject_id} = req.body;
    
    let client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

    const db = client.db(`${process.env.DB_NAME}`);
    const subjects = db.collection('subject');

    const doc = await subjects.findOne({subject_id: subject_id});

    client.close();
    if (doc){
        res.status(200).json({
            error: false,
            message: "subject detail",
            subject_id: subject_id,
            subject_name: doc.subject_name,
            credit: doc.credit,
            type: doc.type
        });
    }else{
        res.status(404).json({
            error: true,
            message: "not found the subject",
        });
    }

});

router.post('/courseDetail', async (req, res) => {

    let {curriculum_id} = req.body;

    let client = await MongoClient.connect(`${process.env.MONGO_ENDPOINT}`, { useUnifiedTopology: true });

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

module.exports = router;
