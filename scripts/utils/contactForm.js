import { simulateClick, trapFocus } from "../api/accessibility.js";



const modal = document.querySelector('#contact_modal');
const focusableElements = modal.querySelectorAll('input, textarea, .close-modal-btn');

const openModalBtn = document.querySelector('.contact_button');
openModalBtn.addEventListener('click', displayModal);

const closeModalBtn = document.querySelector('.close-modal-btn');
closeModalBtn.addEventListener('click', closeModal);
closeModalBtn.addEventListener('keydown', simulateClick);
modal.addEventListener('keydown', escModal);

const submitForm = document.querySelector('form');
submitForm.addEventListener('submit', validateForm);

modal.addEventListener('keydown', event => trapFocus(event, focusableElements));



function displayModal() {
    modal.style.display = 'flex';
    modal.ariaHidden = 'false';
    // focus the 1st input
    focusableElements[1].focus();
}

function closeModal() {
    modal.style.display = 'none';
    modal.ariaHidden = 'true';
}

function escModal(event) {
    // Close modal when escape key is pressed
    const isEscPressed = (event.key === 'Escape' || event.keyCode === 27);
    if (modal.ariaHidden === 'false' && isEscPressed)
        closeModal();
}

function validateForm(event) {
    event.preventDefault();
    const form = event.target;
    const len = form.elements.length;
    for (let i = 0; i < len; i++) {
        console.log(`${form.elements[i].name}: ${form.elements[i].value}`);
    }
    event.target.reset();
    closeModal();
}
