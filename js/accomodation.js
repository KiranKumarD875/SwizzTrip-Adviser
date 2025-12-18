document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.solid-button-button').addEventListener('click', function() {
      const mostFamousHotelsSection = document.getElementById('main-section');
      mostFamousHotelsSection.scrollIntoView({ behavior: 'smooth' });
  });
});


