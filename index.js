import axios from 'axios';
import { select } from '@inquirer/prompts';
import input from '@inquirer/input';
import inquirer from 'inquirer';


/* FUNCIONES DE API */

//GET ALL
const GetAll = () => {
    axios.get('http://localhost:3000/data/customers').then(res => {
       return console.log(res.data);
    });
}

//GET SPECIFIC
const GetSpecific = (ID) => {
    axios.get(`http://localhost:3000/data/customers/${ID}`).then(res => {
        return console.log(res.data);
    }).catch(err => {
        if(err.response.status === 404) {
            return console.log('Cliente no encontrado');
        } else {
            return console.log(err.response.data);
        }
    });
}

//POST CLIENT 
const PostClient = (NAME, EMAIL) => {
    axios.post('http://localhost:3000/data/customers', {
        name: NAME,
        email: EMAIL
    }).then(res => {
        console.log('Cliente almacenado con éxito:');
        console.log(res.data);
    }).catch(err => {
        if(err.response) {
            return console.log(err.response.data)
        }
    });
}


/* QUESTIONARE */

const questions = () => select({
    message: 'Cool stuff',
    choices: [
        {
            name: 'Buscar en toda la API',
            value: 'all',
            description: 'Retorna todos los datos de la API'
        },
        {
            name: 'Buscar a un cliente en especifico.',
            value: 'specific',
            description: 'Busca a un cliente en la API por medio de su ID.'
        },
        {
            name: 'Sumar cliente',
            value: 'add',
            description: 'Suma un cliente a la API, necesitas su nombre y correo'
        }
    ]
}).then(res => {
    if(res === 'all') {
        GetAll()
    } else if(res === 'specific') {
        input({
            message: 'Ingresa la ID del cliente:'
        }).then(res => {
            GetSpecific(res);
        });
    } else if(res === 'add') {
        let quests = [
            {
                type: 'input',
                name: 'usuario',
                message: 'Porfavor escribe el nombre del usuario:'
            },
            {
                type: 'input',
                name: 'email',
                message: 'Porfavor escribe el correo:'
            },
        ];
        
        inquirer.prompt(quests).then((answers) => {            
            PostClient(answers.usuario, answers.email);
          });
    }
});

questions();