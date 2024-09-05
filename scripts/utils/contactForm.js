const openModalBtn = document.querySelector('.contact_button');
openModalBtn.addEventListener('click', displayModal);

const closeModalBtn = document.querySelector('.close-modal-btn');
closeModalBtn.addEventListener('click', closeModal);

const submitForm = document.querySelector('form');
submitForm.addEventListener('submit', validateForm);

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = 'block';
    modal.ariaHidden = 'false';
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = 'none';
    modal.ariaHidden = 'true';
}

function validateForm(event) {
    event.preventDefault();
    event.target.reset();
    closeModal();
}
