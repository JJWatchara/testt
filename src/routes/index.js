const router = require('express').Router();
const modelUser = require('../models/user');
const modelGrade = require('../models/grade');
const bcrypt = require('bcrypt');

const generatePassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHashed = await bcrypt.hash(password, salt);
    return passwordHashed;
};

const comparePassword = async (pass_login, pass_user) => {
    return await bcrypt.compare(pass_login, pass_user);
};

router.post('/register', async (req, res) => {
    try {

        let data = req.body;

        data.password = await generatePassword(data.password);
        let user = new modelUser({
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            password: data.password,
            email: data.email
        });
        
        user.save();
        res.status(200).json({ 
            msg: 'สมัครสมาชิกสำเร็จ', 
            data: user 
        });

    } catch (err) { 

        res.status(400).json({ 
            msg: 'สมัครสมาชิกไม่สำเร็จ', 
            err: err.message 
        });

    }
});

router.post('/login', async (req, res) => {
    try {
 
        let data = req.body;

        const user = await modelUser.findOne({'username': data.username});
        if (user && await comparePassword(data.password, user.password)) {
            user.password = undefined;
            delete user.password;
            req.session.dataUser = user;
            res.status(200).json({ 
                msg: 'เข้าสู่ระบบสำเร็จ', 
                data: user,
            });
            return;
        } else {
            throw new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        } 

    } catch (err) { 

        res.status(400).json({ 
            msg: 'เกิดข้อผิดพลาด', 
            err: err.message 
        });

    }
});

router.get('/checkUserLogin', async (req, res) => {
    try {

        res.status(200).json(req.session.dataUser);
        return;
    } catch (err) {

        res.status(400).json({ 
            msg: 'เกิดข้อผิดพลาด', 
            err: err.message 
        });

    }
});

router.get('/grade/:id', async (req, res) => {
    try {
        const id = req.params.id
        res.status(200).json(await modelGrade.findOne({'id_member': id}));
        return;
    } catch (err) {

        res.status(400).json({ 
            msg: 'เกิดข้อผิดพลาด', 
            err: err.message 
        });

    }
});
router.post('/grade/', async (req, res) => {
    try {
        const body = req.body
        await modelGrade.insert({
            id_member: body.id_member,
            course: body.course,
            credit:body.credit,
            grade: body.grade,
        })
        res.status(200).json({status: true});
        return;
    } catch (err) {

        res.status(400).json({ 
            msg: 'เกิดข้อผิดพลาด', 
            err: err.message 
        });

    }
});
router.patch('/grade/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await modelGrade.updateOne({'_id': id},{ $set: {  
            id_member: body.id_member,
            course: body.course,
            credit:body.credit,
            grade: body.grade,
        }})
        res.status(200).json({status: true});
        return;
    } catch (err) {

        res.status(400).json({ 
            msg: 'เกิดข้อผิดพลาด', 
            err: err.message 
        });

    }
});

router.patch('/grade/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await modelGrade.deleteOne({'_id': id});
        res.status(200).json({status: true});
        return;
    } catch (err) {

        res.status(400).json({ 
            msg: 'เกิดข้อผิดพลาด', 
            err: err.message 
        });

    }
});
module.exports = router;
