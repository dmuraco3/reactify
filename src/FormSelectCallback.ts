import { getReactFromElement } from "./lib";

chrome.runtime.onMessage.addListener((message: string, sender, sendResponse) => {
    const xpath = message;
    
    const element = document.querySelector<HTMLElement>(xpath);

    if (!element) {
        alert(`Could not find element for selector: ${xpath}`);
        return false;
    }

    const reactCode = getReactFromElement(element);
    navigator.clipboard.writeText(reactCode);

    sendResponse("Copy Success");
    return true;
});
