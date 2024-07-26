import { isTryStatement } from "typescript";
import { getActiveTab, getStyleMap } from "./lib";

async function cursorSelectCallback() {
    var selecting: boolean = false;
    
    if (!selecting) {
        const activeTab = await getActiveTab();
        const results = chrome.scripting.executeScript({
            target: { tabId: activeTab },
            files: ["CursorSelectCallback.js"],
        }, ()=>{
        chrome.tabs.sendMessage(activeTab, null, (response) => {
            console.log(response);
        });
    });

    }
    selecting=!selecting;
};

async function allSelectCallback() {
    const activeTab = await getActiveTab();
    chrome.scripting.executeScript({
        target: { tabId: activeTab },
        files: ["AllSelectCallback.js"]
    }, ()=>{
        chrome.tabs.sendMessage(activeTab, null, (response) => {
            navigator.clipboard.writeText(response);
            alert("Successfuly Copied");
        })
    });
}

async function formSelectCallback(e: SubmitEvent) {
   const formData = new FormData(e.target as HTMLFormElement);

   const xpath = formData.get("XPath") ?? '';

   chrome.scripting.executeScript({
       target: { tabId: await getActiveTab()},
       files: ["FormSelectCallback.js"],
   }, async ()=>{
       chrome.tabs.sendMessage(await getActiveTab(), xpath, (response) => {
           console.log(response);
       });
   });
}

function main() {
    const cursorSelectBttn = document.getElementById("cursorSelectButton") as HTMLButtonElement | null;
    const allSelectBttn = document.getElementById("allSelectButton") as HTMLButtonElement | null;
    const formElmt = document.getElementById("XPathSelectForm") as HTMLFormElement | null;

    cursorSelectBttn?.addEventListener("click", cursorSelectCallback);
    allSelectBttn?.addEventListener("click", allSelectCallback);
    formElmt?.addEventListener("submit", formSelectCallback);

};

main();
