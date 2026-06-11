const semesterSubjects = {

1: [
    "Programming Fundamentals and Problem Solving",
    "Internet Technology",
    "Digital Electronics",
    "Mathematics for Computer Science",
    "Communication Skills",
    "Project Work-I",
    "Introduction to IKS",
    "Indian Astronomy-I"
],

2: [
    "Programming in C",
    "Database Management System",
    "Software Engineering",
    "Computer Oriented Numerical and Statistical Methods",
    "Foundation Course in English Language",
    "Project Work-II",
    "Environmental Studies"
],

3: [
    "Data Structures and Algorithms",
    "Object Oriented Programming with C++",
    "Advanced Database Management System",
    "Probability Theory and Distributions",
    "Personality Development",
    "Project Work-III",
    "Indian Ethos and Ethics",
    "Indian Astronomy-II"
],

4: [
    "Python Programming",
    "Web Design and Development",
    "Operating System",
    "Data Communication and Network",
    "Business Communication",
    "Project Work-IV",
    "Disaster Management"
]

};

document.addEventListener("DOMContentLoaded", () => {

const selectors =
document.querySelectorAll(".result-status");

selectors.forEach(select => {

    select.addEventListener("change", function () {

        const semester =
        this.dataset.semester;

        const container =
        document.getElementById(
            `semester${semester}Container`
        );

        container.innerHTML = "";

        if (this.value === "pass") {

            container.innerHTML = `

                <div class="form-group">

                    <label>
                        SGPA
                    </label>

                    <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.01"
                        placeholder="Enter SGPA">

                </div>

            `;

        }

        else if (this.value === "atkt") {

            createATKTBlock(
                semester,
                container
            );

        }

    });

});

});

function createATKTBlock(
semester,
container
){

const wrapper =
document.createElement("div");

wrapper.classList.add(
    "atkt-wrapper"
);

wrapper.innerHTML = `

    <div class="atkt-card">

        <h3>
            ATKT Record
        </h3>

        <div class="form-group">

            <label>
                Subject
            </label>

            <select>

                ${generateSubjectOptions(
                    semester
                )}

            </select>

        </div>

        <div class="form-group">

            <label>
                Attempt Number
            </label>

            <select>

                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>

            </select>

        </div>

        <div class="form-group">

            <label>
                Previous Marks
            </label>

            <input
                type="number"
                placeholder="Enter Previous Marks">

        </div>

        <div class="form-group">

            <label>
                Current Marks
            </label>

            <input
                type="number"
                placeholder="Enter Current Marks">

        </div>

        <div class="form-group">

            <label>
                Current Status
            </label>

            <select>

                <option>
                    Pending
                </option>

                <option>
                    Cleared
                </option>

            </select>

        </div>

    </div>

`;

const addButton =
document.createElement("button");

addButton.type = "button";

addButton.textContent =
"+ Add Another ATKT Subject";

addButton.addEventListener(
    "click",
    () => {

        const newCard =
        wrapper.firstElementChild
        .cloneNode(true);

        wrapper.appendChild(
            newCard
        );

    }
);

container.appendChild(
    wrapper
);

container.appendChild(
    addButton
);

}

function generateSubjectOptions(
semester
){

let html =
'<option value="">Select Subject</option>';

semesterSubjects[
    semester
].forEach(subject => {

    html += `
    <option>
        ${subject}
    </option>
    `;

});

return html;

}

document
.getElementById("submitBtn")
.addEventListener(
"click",
submitForm
);

async function submitForm(){

const studentName =
document.getElementById(
"studentName"
).value.trim();

const rollNumber =
document.getElementById(
"rollNumber"
).value.trim();
    if (!/^\d{5}$/.test(rollNumber)) {
    alert("Please enter exactly 5 digits");
    return;
}

const enrollmentNo = "24BCA" + rollNumber;

const studentMobile =
document.getElementById(
"studentMobile"
).value.trim();

const parentMobile =
document.getElementById(
"parentMobile"
).value.trim();

if(studentName === ""){
    alert("Please enter Student Name.");
    return;
}

if(rollNumber === ""){
    alert("Please enter Enrollment Number.");
    return;
}

if(!/^\d+$/.test(rollNumber)){
    alert("Roll Number must contain 5 digits only.");
    return;
}

if(studentMobile === ""){
    alert("Please enter Student Mobile Number.");
    return;
}

if(!/^\d{10}$/.test(studentMobile)){
    alert("Student Mobile Number must contain exactly 10 digits.");
    return;
}

if(parentMobile === ""){
    alert("Please enter Parent Mobile Number.");
    return;
}

if(!/^\d{10}$/.test(parentMobile)){
    alert("Parent Mobile Number must contain exactly 10 digits.");
    return;
}

const semesterData = [];

const statuses =
document.querySelectorAll(".result-status");

for(const status of statuses){

    const semester =
    status.dataset.semester;

    if(status.value === ""){
        alert(
        `Please select Result Status for Semester ${semester}`
        );
        return;
    }

    const container =
    document.getElementById(
    `semester${semester}Container`
    );

    if(status.value === "pass"){

        const sgpa =
        container.querySelector(
        'input[type="number"]'
        );

        if(
            !sgpa ||
            sgpa.value.trim() === ""
        ){
            alert(
            `Please enter SGPA for Semester ${semester}`
            );
            return;
        }

        semesterData.push({
            semester: semester,
            status: "Passed",
            sgpa: sgpa.value
        });

    }

    else if(status.value === "atkt"){

        const cards =
        container.querySelectorAll(
        ".atkt-card"
        );

        if(cards.length === 0){
            alert(
            `Please enter ATKT details for Semester ${semester}`
            );
            return;
        }

        const atktSubjects = [];

        for(const card of cards){

            const selects =
            card.querySelectorAll("select");

            const inputs =
            card.querySelectorAll("input");

            const subject =
            selects[0].value;

            const attempt =
            selects[1].value;

            const previousMarks =
            inputs[0].value;

            const currentMarks =
            inputs[1].value;

            const currentStatus =
            selects[2].value;

            if(subject === ""){
                alert(
                `Please select subject in Semester ${semester}`
                );
                return;
            }

            if(previousMarks === ""){
                alert(
                `Please enter Previous Marks in Semester ${semester}`
                );
                return;
            }

            if(currentMarks === ""){
                alert(
                `Please enter Current Marks in Semester ${semester}`
                );
                return;
            }

            atktSubjects.push({
                subject,
                attempt,
                previousMarks,
                currentMarks,
                currentStatus
            });

        }

        semesterData.push({
            semester: semester,
            status: "ATKT",
            subjects: atktSubjects
        });

    }

}

const data = {

    name: studentName,

    roll: enrollmentNo,

    studentMobile: studentMobile,

    parentMobile: parentMobile,

    semesters: semesterData

};

try {

    const response = await fetch(
    "https://script.google.com/macros/s/AKfycbyrGFZ31tcnvyyh4jxVNGaYQoG6wVMlJFTrSLwPdKCTgL2sxwxQJspR27qROnYRduve/exec",
    {
        method: "POST",
        body: JSON.stringify(data)
    });

    console.log("Response:", response);

    alert(
    "Academic Record Submitted Successfully!"
    );

}
catch(error){

    console.error(
    "FETCH ERROR:",
    error
    );

    alert(
    "Error: " + error
    );

}

console.log(data);

}

document.addEventListener(
"DOMContentLoaded",
()=>{

const particleContainer =
document.getElementById(
"particles"
);

if(!particleContainer)
return;

for(let i=0;i<40;i++){

const particle =
document.createElement("div");

particle.classList.add(
"particle"
);

particle.style.left =
Math.random()*100+"%";

particle.style.width =
Math.random()*8+3+"px";

particle.style.height =
particle.style.width;

particle.style.animationDuration =
(Math.random()*15+10)+"s";

particle.style.animationDelay =
(Math.random()*10)+"s";

particleContainer.appendChild(
particle
);

}

});
