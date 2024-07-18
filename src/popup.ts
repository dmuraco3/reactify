var selecting: boolean = false;

const cursorListener: (this: Window, ev: MouseEvent) => any = (e) => {
    const elementAtIndex = document.elementFromPoint(e.x, e.y) as HTMLElement;
    elementAtIndex.style.border = "5px red";
}

function selectButtonCallback() {
    if (!selecting) {
        window.addEventListener("mousemove", cursorListener);
        window.alert("starting to select");
        selecting = true;
        return;
    } else {
        window.removeEventListener("mousemove", cursorListener);
        selecting = false;
    };
};

function main() {
    document.getElementById("selectButton")?.addEventListener("click", selectButtonCallback);
};

main();