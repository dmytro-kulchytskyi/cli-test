import { createInterface } from 'node:readline/promises';
import { stdin, stdout }  from 'node:process';

const readLine = createInterface(stdin, stdout);
try {
    const dayAnswer = await readLine.question('How was ypur day?\n');

    console.log('ANSWER', dayAnswer);

} finally {
    readLine.close();
}
