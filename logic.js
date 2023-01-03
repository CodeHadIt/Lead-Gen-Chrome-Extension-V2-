let myLeads = [];
const inputField = document.querySelector("#input");
const saveInputBtn = document.querySelector("#input-btn");
const leadList = document.querySelector("#list-items");
const tabBtn = document.querySelector("#tab-btn");
const deleteBtn = document.querySelector("#delete-btn");

//The items we get from local storage is being stored here
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") );

//the rendering function to display/update the leads
function renderLeads(leads) {
    let listItems = "";
    for(let lead of leads) {
        listItems += `<li><a target='_blank' href='${lead}'> ${lead}</a></li>`
    };
    leadList.innerHTML = listItems;
};

//checking if indeed we have value(s) inside our local storage variable
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
}

saveInputBtn.addEventListener("click", () => {
    //get the value from the input field, push it into the array, store it in our local storage and then render it.
    let enteredValue = inputField.value;
    myLeads.push(enteredValue);
    enteredValue = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
});

tabBtn.addEventListener("click", () =>{
    //get current tab url from chrome API, push to array, store in local storage and then render it.
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads(myLeads); 
    })
    
})

// On double click, clear local storage, resets myLeads array back to empty, then renders nothing(by calling the render function with an empty array)
deleteBtn.addEventListener("dblclick", () => { 
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
})