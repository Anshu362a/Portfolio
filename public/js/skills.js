document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    // Animate the progress bars when the page is loaded
    progressBars.forEach(function(bar) {
      const value = bar.getAttribute('aria-valuenow');
      bar.style.width = value + '%';
    });
  });
  