import {Command} from 'commander';
import fs from 'fs';

const program = new Command();

program
    .name('notes-app')
    .description('a CLI notes app')
    .version('1.0.0')

program
    .command('add')
    .description('add a new note')
    .requiredOption('-t, --title <title>', 'title for the note')
    .requiredOption('-b, --body <body>', 'body for the note')
    .action((options) => {
        addNote(options.title, options.body);
        console.log('Notes added successfully');        
    })


program
    .command('list')
    .description('list all created notes')
    .action(() => {
        const notes = loadNotes();
        notes.forEach((note, index) => {
            console.log(`${index + 1}. ${note.title}: ${note.body}`);
        });
    })


const addNote = function(title, body){
    const notes = loadNotes();

    const duplicate = notes.find(note => note.title === title);
    if (duplicate) {
        console.log('❌ Note title already exists!');
        return;
    }

    notes.push({
        title: title,
        body: body
    })
    console.log(notes);
    
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        const data = JSON.parse(dataJSON);
        return data;
    }catch(e){
        return [];
    }
}

program.parse();