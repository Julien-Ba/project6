import { simulateClick, trapFocus } from "../api/accessibility.js";



const modal = document.getElementById("contact_modal");
const focusableEls = modal.querySelectorAll('input, textarea, .close-modal-btn');

const openModalBtn = document.querySelector('.contact_button');
openModalBtn.addEventListener('click', displayModal);

const closeModalBtn = document.querySelector('.close-modal-btn');
closeModalBtn.addEventListener('click', closeModal);
closeModalBtn.addEventListener('keydown', simulateClick);
modal.addEventListener('keydown', escModal);

const submitForm = document.querySelector('form');
submitForm.addEventListener('submit', validateForm);

modal.addEventListener('keydown', event => trapFocus(event, focusableEls));



function displayModal() {
    modal.style.display = 'block';
    modal.ariaHidden = 'false';
    focusableEls[1].focus();
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
    //event.target.reset();
    //closeModal();
}
