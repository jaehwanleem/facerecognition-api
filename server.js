import express from "express";
import bodyParser from "body-parser"; // bodyparser 사용하는걸 잊지말자!!
import cors from 'cors';
const app = express();


app.use(bodyParser.json());  // bodyparser 사용하는걸 잊지말자!!!
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()

        },
        {
            id: '124',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'bannana',
            entries: 0,
            joined: new Date()

        }
    ]

}

app.get('/', (req, res) => {
    res.send(database.users);
})




app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }

    })
    if (!found) {
        res.status(400).json('not found')
    }

})
// app.get('/profile/:id', (req, res) => {
//     const { id } = req.params;
//     let found = false;
//     database.users.forEach(user => {
//         if (user.id === id) {
//             found = true;
//             return res.json(user);
//         }

//     })
//     if (!found) {
//         res.status(400).json('not found')
//     }

// })


app.post('/signin', (req, res) => {

    // bcrypt.compare("561aa8599", '$2a$10$Lhhs30aipBQbK2VQKgXawOcqWACs940mFzGZ1Ly619Torp8fEn372', function (err, res) {
    //     console.log('first guess', res) // res == true 
    // });
    // bcrypt.compare("veggies", '$2a$10$Lhhs30aipBQbK2VQKgXawOcqWACs940mFzGZ1Ly619Torp8fEn372', function (err, res) {
    //     console.log('second guess', res);// res = false
    // });


    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('success');
        // res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in');
    }
})


app.post('/register', (req, res) => {//register 할때는 post request 를 사용한다 

    const { email, name, password } = req.body;
    // bcrypt.hash(password, null, null, function (err, hash) {
    //     console.log(hash);
    //     // Store hash in your password DB.
    // });
    database.users.push({ //register.js 에서 body 부분의 obj에 대입하게된다
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()

    })

    res.json(database.users[database.users.length - 1]);
})




app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = true;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })

    if (!found) {
        res.status(400).json('not found')
    }



})


app.listen(3000, () => {
    console.log('app is running in port 3000')
})

// '/' (route) 는 respond => this is working
// '/signin 은 POST 로 이용 , respond 는 success, fail 둘중하나 
// '/register 도 POST 로 이용 , respond 는 user obj 출력하도록 
// '/profile/:userID  GET => user
// '/image 은 PUT를 사용 --> user (사용자가 몇번 사진을 올려서 facedetect를 하는지 알려는 기능)
//

// bcrypt.hash("bacon", null, null, function (err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function (err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function (err, res) {
//     // res = false
// });