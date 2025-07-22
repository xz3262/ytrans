function createTranscriptModal() {
  const modal = document.createElement('div');
  modal.className = 'ytrans-modal';
  modal.innerHTML = `
    <div class="ytrans-modal-overlay">
      <div class="ytrans-modal-content">
        <div class="ytrans-modal-header">
          <h3>Video Transcript</h3>
          <button class="ytrans-close-btn">&times;</button>
        </div>
        <div class="ytrans-modal-body">
          <div class="ytrans-transcript-text" id="ytrans-transcript-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
            
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
          </div>
        </div>
        <div class="ytrans-modal-footer">
          <button class="ytrans-copy-btn">Copy All Text</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Close modal functionality
  modal.querySelector('.ytrans-close-btn').addEventListener('click', () => {
    modal.remove();
  });
  
  modal.querySelector('.ytrans-modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      modal.remove();
    }
  });
  
  // Copy functionality
  modal.querySelector('.ytrans-copy-btn').addEventListener('click', () => {
    const text = modal.querySelector('#ytrans-transcript-text').innerText;
    navigator.clipboard.writeText(text).then(() => {
      const btn = modal.querySelector('.ytrans-copy-btn');
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      btn.style.background = '#16a34a';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 2000);
    });
  });
}

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
            createTranscriptModal();
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
        createTranscriptModal();
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