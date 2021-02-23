# Note App
## Requirements
* MySQL workbench
* React.js
* Node.js
* Environment to run both codes

## Steps to setup database
1. After MySQL workbench is installed
2. Click the '+' button to create a new connection 
3. Create a connection 
4. Remember the:
    1. Connection name
    2. hostname (Recommend: 127.0.0.1)
    3. Port name (Recommend: 3306)
    4. Username
    5. Password
5. Create a new Schema
6. Open a new qeury and run the following script:
```
use polsource;

CREATE TABLE `polsource`.`notes` (
  `idnotes` INT NOT NULL AUTO_INCREMENT,
  `version` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `date_created` DATETIME NOT NULL,
  `last_modified` DATETIME NOT NULL,
  `content` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idnotes`));
  
   CREATE TABLE `polsource`.`action_types` (
  `idaction` INT NOT NULL,
  `action_type` varchar(45) NOT NULL,
	primary key (`idaction`));
    
CREATE TABLE `polsource`.`notes_history` (
`idhistory` INT NOT NULL AUTO_INCREMENT,
  `idnotes` INT NOT NULL,
  `version` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `date_created` DATETIME NOT NULL,
  `last_modified` DATETIME NOT NULL,
  `content` VARCHAR(45) NOT NULL,
  `idaction` INT NOT NULL,
   PRIMARY KEY (`idhistory`),
  foreign key(idaction) references action_types(idaction));
  
 

INSERT INTO	Notes(idnotes, version, title, date_created, last_modified, content) VALUES (1, 0, "FIRST NOTE", NOW(), NOW(), "Some content for my note");
INSERT INTO	Notes(idnotes, version, title, date_created, last_modified, content) VALUES (2, 0, "Second NOTE", NOW(), NOW(), "Some content for my second note");

INSERT INTO action_types(idaction, action_type) VALUES (1,"UPDATED");
INSERT INTO action_types(idaction, action_type) VALUES (2,"CREATED");
INSERT INTO action_types(idaction, action_type) VALUES (3,"DELETED");

INSERT INTO	notes_history(idnotes, version, title, date_created, last_modified, content, idaction) VALUES (1, 0, "FIRST NOTE", NOW(), NOW(), "Some content for my note", 2);
INSERT INTO	notes_history(idnotes, version, title, date_created, last_modified, content, idaction) VALUES (2, 0, "Second NOTE", NOW(), NOW(), "Some content for my second note", 2);
 ```
 7. Tables are set up with mock data.
 
 ## How to build and run the project
 1. After you clone the project from the git 
 2. Open the project into an IDE (I used Visual Studio Code)
 3. Open 'Note_App'
 4. Open 'api'
 5. Create a file: '.env'
 6. Here input:
``` 
DB_HOST=
DB_USER=
DB_PASS=
DATABASE=
DB_PORT=
PORT=
```
7. For each secion add the missing information mentioned in the last point and save
8. Now after that is done open two terminals
    1. Terminal 1: make sure you are in the "api" folder  
    2. Run ``` npm start ```
    3. Terminal 2: make sure you are in the "client" folder
    4. Run ```npm start```
9. Should be running on localhost:8080 (make sure that port is available as well as port 5000)
10. Open in your browser and happy Noting!

## Example of Usages
* If you would like to create a new Note
  * Click the button titled "Create New Note"
  * Note will be created with default information
* If you want to edit the note click the button next to each row labeled "Edit"
  * You can now edit the note with information 
  * If you choose not to, the data will not change
* If you want to view the changes to a note click "View Version History"
* If you are done and want to delete a note click the red "X"
  * Now the note is deleted       
