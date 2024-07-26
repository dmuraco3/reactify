import { descendAndStyle, domNodeToJSX, getActiveTab, getReactFromElement, getStyleMap } from "./lib";


async function attachMouseListener(): Promise<string> {
    var ele: HTMLElement | null;

    const mouseMoveListener = (e: MouseEvent) => {
        const newEle = document.elementFromPoint(e.x, e.y) as HTMLElement;
        if (!ele) { ele = newEle };
        if (!newEle.isEqualNode(ele)) {
            if (ele) ele.style.border = "";
            ele = newEle;
            ele.style.border = "5px solid purple";
        };
    };

    function getPromiseFromEvent(item: Document, event: keyof DocumentEventMap): Promise<HTMLElement> {
        return new Promise((resolve) => {
            const listener = () => {
                if (ele) {
                    console.log(event, "just fired");
                    document.removeEventListener("mousemove", mouseMoveListener);
                    ele.style.border = "";
                    resolve(ele);
                    item.removeEventListener(event, listener);
                }
            }
            item.addEventListener(event, listener);
        })
    }

    const attach: () => Promise<HTMLElement> = () => {
        document.addEventListener("mousemove", mouseMoveListener);
        return getPromiseFromEvent(document, "click");
    };


    const selectedElement = await attach();
    const reactCode = getReactFromElement(selectedElement);
    return reactCode;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
   attachMouseListener().then(res=>{ 
       navigator.clipboard.writeText(res);
       sendResponse(res)
   });
   return true;
});
