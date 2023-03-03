class Student {
    constructor(name){
        this.name = name;
        this.sightWords = ['man','by','was','got','be','want','had','here','are','of','ran','good','his']
    }
    addSightWord(word){
        this.sightWords.push(word);
    }
}
class Parent {
    constructor(name) {
    this.name = name;
    this.students = [];
    }
    describe(){
    alert(`
    ${this.name} is now a parent with ${this.students.length}
    number of students.`)
    }
    describeStudents(){
        let studentString = "";
        for(let i = 0; i < this.students.length; i++){
            studentString += i + ") " + this.students[i].name + "\n";
        }
        alert(studentString);
    }
    addStudent(student) {
        if (student instanceof Student) {
        this.students.push(student);
        } else {
        throw new Error(`${student} must be registered. 
        Please register your student in the parent portal.`);
        }
    }
}
class Menu {
    constructor(){
        this.missedWords = [];
        this.currentParent = null;
    }
    start(){
        let selection = this.showMainMenu(); 
            while (selection != 6) {
                switch(selection) {
                    case '0':
                        this.createParent();
                        break;
                    case '1' :
                        this.addStudents();
                    break;
                    case '2' :
                        this.deleteStudent();
                    break;
                    case '3' :
                        if(this.currentParent != null && this.currentParent.students.length > 0){
                            this.currentParent.describeStudents();
                        }else {
                            alert("Please return to main menu and register as a parent or add a student");
                        } 
                    break;
                    case '4' :
                        this.showSightWords();
                    break;
                    case '5':
                        this.showMissedWords();
                    default:
                        selection = 6;
                    }
            selection = this.showMainMenu();
        }
        alert('Thank you for learning with us!');
    }
    showMainMenu(){
        return prompt(`Please select:
        0) Create parent profile(You must do this first)
        1) Add new student
        2) Delete student
        3) View your students
        4) Quiz sight words
        5) Quiz missed words
        6) Exit
        `);
    }
    createParent(){
        let name = prompt("What is your name?");
        this.currentParent = new Parent(name);
        this.currentParent.describe();
    }
    
    addStudents(){
        if(this.currentParent != null){
            let name = prompt("What is your student's name?");
            let student = new Student(name);
            this.currentParent.addStudent(student);
            let selection = 0;
            while(selection != 2){
                selection = prompt("Enter 1 to add words to your child's teacher's list or 2 to exit");
                if(selection == 1){
                    let word = "";
                    word = prompt("Type sight word to add");
                    student.addSightWord(word); 
                }
            }
        }else {
            alert("Please return to main menu and register as a parent");
        }       
    }

    deleteStudent(){
        if(this.currentParent != null && this.currentParent.students.length > 0){
            this.currentParent.describeStudents();        
            let choice = prompt("Enter the number of the student you wish to delete:");
            this.currentParent.students.splice(choice,1);  
        }else{
            alert("Please return to main menu and register as a parent or add a student");
        }
    }

    showSightWords(){
        if(this.currentParent != null && this.currentParent.students.length > 0){
            let student = null;
            this.currentParent.describeStudents();        
            let choice = prompt("Enter the number of the student you wish to quiz:");
            if (choice >= 0 && choice < this.currentParent.students.length){
                student = this.currentParent.students[choice];
                for(let i = 0; i < student.sightWords.length; i++){
                    let score = 0;
                    alert(`${student.sightWords[i]}
                            Parent - have your child say the above word aloud.`);
                    score = prompt("Enter 1 if your child was correct or 2 if they should try again later.");
                    if(score == 2){
                        this.missedWords.push(student.sightWords[i]);
                    }
                }
            }
        }else {
            alert("Please return to main menu and register as a parent or add a student");
        }
    }
    showMissedWords(){
        if(this.missedWords.length > 0){
            for(let i = 0; i < this.missedWords.length; i++){
            alert(`${this.missedWords[i]}
                      Parent - have your child say the above word aloud.`);
            }
        }else{
            alert("Great job you are done studying");
        }
        this.missedWords = [];
    }

}
    

let menu = new Menu();
menu.start();