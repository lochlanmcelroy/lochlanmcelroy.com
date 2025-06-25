// Prevent auto-scroll to terminal on page load while allowing scripts to run
(function() {
    let preventScrolling = true;
    let initialLoad = true;
    
    // Override focus to prevent auto-scroll during initial load
    const originalFocus = HTMLElement.prototype.focus;
    HTMLElement.prototype.focus = function(options) {
        if (preventScrolling && initialLoad) {
            // Call focus but prevent scrolling during initial load
            return originalFocus.call(this, { preventScroll: true });
        }
        return originalFocus.call(this, options);
    };
    
    // Ensure we start at the top
    const ensureTopPosition = () => {
        if (initialLoad) {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    };
    
    // Handle immediate scroll prevention
    document.addEventListener('DOMContentLoaded', function() {
        ensureTopPosition();
        
        // Continue preventing scroll for a short time to let scripts initialize
        setTimeout(() => {
            preventScrolling = false;
            ensureTopPosition(); // One more time after scripts have loaded
        }, 500);
    });
    
    // Final cleanup after full page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            initialLoad = false;
            HTMLElement.prototype.focus = originalFocus; // Restore original focus
            ensureTopPosition(); // Final position correction
        }, 100);
    });
})();
