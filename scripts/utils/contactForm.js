const modal = document.getElementById("contact_modal");

const openModalBtn = document.querySelector('.contact_button');
openModalBtn.addEventListener('click', displayModal);

const closeModalBtn = document.querySelector('.close-modal-btn');
closeModalBtn.addEventListener('click', closeModal);
document.addEventListener('keydown', escModal);

const submitForm = document.querySelector('form');
submitForm.addEventListener('submit', validateForm);



function displayModal() {
    modal.style.display = 'block';
    modal.ariaHidden = 'false';
}

function closeModal() {
    modal.style.display = 'none';
    modal.ariaHidden = 'true';
}

function escModal(event) {
    // Close modal when escape key is pressed
    if (modal.ariaHidden === 'false' && event.keyCode === 27)
        closeModal();
}

function validateForm(event) {
    event.preventDefault();
    event.target.reset();
    closeModal();
}
