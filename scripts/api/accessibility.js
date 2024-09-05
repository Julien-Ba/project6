export function simulateClick(event) {
    // if enter pressed, click the focused element
    const isEnterPressed = event.key === 'Enter' || event.keyCode === 13;
    if (!isEnterPressed) return;
    event.target.click();
}

export function trapFocus(event, elements) {
    // trap the tab navigation inside a container
    const isTabPressed = (event.key === 'Tab' || event.keyCode === 9);
    if (!isTabPressed) return;
    if (event.shiftKey && document.activeElement === elements[0]) {
        elements[elements.length - 1].focus();
        event.preventDefault();
    } else {
        if (document.activeElement === elements[elements.length - 1]) {
            elements[0].focus();
            event.preventDefault();
        }
    }
}
