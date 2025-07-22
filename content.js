function addTranscriptButton() {
  const observer = new MutationObserver((mutations) => {
    const videoElements = document.querySelectorAll('ytd-video-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer, ytd-rich-item-renderer');
    
    videoElements.forEach((element) => {
      if (!element.querySelector('.ytrans-button')) {
        const metadata = element.querySelector('#metadata, #details, #meta');
        
        if (metadata) {
          const button = document.createElement('button');
          button.className = 'ytrans-button';
          button.textContent = 'Transcript';
          button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Transcript button clicked');
          });
          
          metadata.appendChild(button);
        }
      }
    });

    const watchPageButton = document.querySelector('#actions:not(.ytrans-processed)');
    if (watchPageButton && window.location.pathname === '/watch') {
      watchPageButton.classList.add('ytrans-processed');
      
      const button = document.createElement('button');
      button.className = 'ytrans-button ytrans-watch-button';
      button.textContent = 'Transcript';
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Watch page transcript button clicked');
      });
      
      watchPageButton.appendChild(button);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addTranscriptButton);
} else {
  addTranscriptButton();
}