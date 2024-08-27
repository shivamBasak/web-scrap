document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.toggleButton');
    const formPanels = document.querySelectorAll('.formPanel');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            
            // Remove active class from all buttons and panels
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            formPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to the clicked button and target panel
            button.classList.add('active');
            document.getElementById(`${target}Form`).classList.add('active');
        });
    });
});
