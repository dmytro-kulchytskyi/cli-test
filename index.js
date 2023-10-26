import inquirer from 'inquirer';
import { createUser, findAllUsers } from './db.js';

async function main() {
    while(true) {
        const user = await askUserData();
        if (!user) {
            break;
        }
        await createUser(user);
    }

    const shouldSearch = await askShouldSearch();
    if (shouldSearch) {
        const users = await findAllUsers();
        console.log(users);

        const name = await askNameToSearch();
        const foundUser = users.find(u => u.name === name);
        if (foundUser) {
            console.log(foundUser);
        } else {
            console.log('user not found, idi v sraku')
        }
    }
}

async function askUserData() {
    const user = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter user name, lox, press enter to fuck yourself',
        },
        {
            type: 'list',
            name: 'gender',
            message: 'Gender?',
            choices: ['male', 'female'],
            when: ((answers) => !!answers.name)
        },
        {
            type: 'number',
            name: 'age',
            message: 'age?',
            validate: (input) => !isNaN(input),
            when: ((answers) => !!answers.name)
        }
    ]);
    
    if (!user.name) {
        return null;
    }

    return user;
}

async function askShouldSearch() {
    const { search } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'search',
            message: 'Search in DB?',
        },
       
    ]);
    return search;
}

async function askNameToSearch() {
    const { searchName } = await inquirer.prompt([
        {
            type: 'name',
            name: 'searchName',
            message: 'name to search in db',
        },
       
    ]);
    return searchName;
}

main();