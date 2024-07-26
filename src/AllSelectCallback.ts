import { getReactFromElement } from "./lib";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const xpath = "html > body";
    
    const element = document.querySelector<HTMLElement>(xpath);

    if (!element) {
        alert(`Could not find element for selector: ${xpath}`);
        return false;
    }

    const reactCode = getReactFromElement(element);

    sendResponse(reactCode);
    return true;
});
