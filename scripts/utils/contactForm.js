const modal = document.getElementById("contact_modal");
const focusableEls = modal.querySelectorAll('input, textarea');

const openModalBtn = document.querySelector('.contact_button');
openModalBtn.addEventListener('click', displayModal);

const closeModalBtn = document.querySelector('.close-modal-btn');
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('keydown', escModal);

const submitForm = document.querySelector('form');
submitForm.addEventListener('submit', validateForm);

modal.addEventListener('keydown', tabInModal);



function displayModal() {
    modal.style.display = 'block';
    modal.ariaHidden = 'false';
    focusableEls[0].focus();
}

function closeModal() {
    modal.style.display = 'none';
    modal.ariaHidden = 'true';
}

function escModal(event) {
    // Close modal when escape key is pressed
    const escKey = 27;
    if (modal.ariaHidden === 'false' && event.keyCode === escKey)
        closeModal();
}

function validateForm(event) {
    event.preventDefault();
    event.target.reset();
    closeModal();
}

function tabInModal(event) {
    const tabKey = 9;
    if (event.keyCode !== tabKey) return;
    if (event.shiftKey && document.activeElement === focusableEls[0]) {
        focusableEls[focusableEls.length - 1].focus();
        event.preventDefault();
    } else {
        if (document.activeElement === focusableEls[focusableEls.length - 1]) {
            focusableEls[0].focus();
            event.preventDefault();
        }
    }
}
