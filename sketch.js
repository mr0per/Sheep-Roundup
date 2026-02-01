// Game state
let currentPage = 1;
const totalPages = 17;
let sheepFound = 0;
const totalSheep = 4;
let tractorClicked = false;
let chickenCoopCompleted = false;
let barnCompleted = false;
let pastureCompleted = false;
let pastureSheepCount = 0;
let canClickSheep = true;
let lastTransitionTime = 0;
let isTransitioning = false;
let blockClicks = false;

// Custom notification function
function showNotification(message) {
    // Create notification if it doesn't exist
    let notification = document.getElementById('custom-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'custom-notification';
        notification.className = 'custom-notification';
        notification.innerHTML = `
            <div class="notification-message"></div>
            <button onclick="closeNotification()">OK</button>
        `;
        document.body.appendChild(notification);
    }
    
    // Set message and show
    notification.querySelector('.notification-message').textContent = message;
    notification.classList.add('show');
}

function closeNotification() {
    const notification = document.getElementById('custom-notification');
    if (notification) {
        notification.classList.remove('show');
    }
}

// Global click interceptor to block clicks during transitions
function globalClickBlocker(e) {
    console.log('Global click interceptor fired, blockClicks:', blockClicks);
    if (blockClicks) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();
        console.log('BLOCKED click via global interceptor');
        return false;
    }
}

// Add the click blocker on page load
window.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', globalClickBlocker, true); // Use capture phase
});

// Navigate to next page
function nextPage() {
    if (currentPage < totalPages) {
        // Hide current page
        document.getElementById(`page${currentPage}`).style.display = 'none';
        
        // Show next page
        currentPage++;
        document.getElementById(`page${currentPage}`).style.display = 'block';
    } else {
        // Last page - could navigate to game
        console.log('Ready to start game!');
    }
}

// Select location
function selectLocation(direction) {
    console.log(`Selected location: ${direction}`);
    
    // Hide page 4
    document.getElementById('page4').style.display = 'none';
    
    // Show corresponding scene
    if (direction === 'left') {
        // Chicken Coop - go to page 11 if already completed
        if (chickenCoopCompleted) {
            currentPage = 11;
            document.getElementById('page11').style.display = 'block';
        } else {
            currentPage = 5;
            document.getElementById('page5').style.display = 'block';
        }
    } else if (direction === 'right') {
        // Barn - go to page 17 if already completed
        if (barnCompleted) {
            currentPage = 17;
            document.getElementById('page17').style.display = 'block';
        } else {
            currentPage = 13;
            document.getElementById('page13').style.display = 'block';
        }
    } else if (direction === 'up') {
        // Pasture - go to appropriate page based on completion status
        if (pastureCompleted) {
            // Both sheep collected - go to completely empty page 22
            currentPage = 22;
            document.getElementById('page22').style.display = 'block';
        } else if (pastureSheepCount === 1) {
            // One sheep collected - go to page 20 (empty with basket)
            currentPage = 20;
            document.getElementById('page20').style.display = 'block';
        } else {
            // No sheep collected yet - go to initial page 18
            currentPage = 18;
            document.getElementById('page18').style.display = 'block';
        }
    }
}

// Return to map
function returnToMap() {
    // Hide current scene
    if (currentPage === 5) {
        document.getElementById('page5').style.display = 'none';
    } else if (currentPage === 6) {
        document.getElementById('page6').style.display = 'none';
    } else if (currentPage === 7) {
        document.getElementById('page7').style.display = 'none';
    } else if (currentPage === 8) {
        document.getElementById('page8').style.display = 'none';
    } else if (currentPage === 9) {
        document.getElementById('page9').style.display = 'none';
    } else if (currentPage === 10) {
        document.getElementById('page10').style.display = 'none';
    } else if (currentPage === 11) {
        document.getElementById('page11').style.display = 'none';
    } else if (currentPage === 12) {
        document.getElementById('page12').style.display = 'none';
    } else if (currentPage === 13) {
        document.getElementById('page13').style.display = 'none';
    } else if (currentPage === 14) {
        document.getElementById('page14').style.display = 'none';
    } else if (currentPage === 15) {
        document.getElementById('page15').style.display = 'none';
    } else if (currentPage === 16) {
        document.getElementById('page16').style.display = 'none';
    } else if (currentPage === 17) {
        document.getElementById('page17').style.display = 'none';
    } else if (currentPage === 18) {
        document.getElementById('page18').style.display = 'none';
    } else if (currentPage === 19) {
        document.getElementById('page19').style.display = 'none';
    } else if (currentPage === 20) {
        document.getElementById('page20').style.display = 'none';
    } else if (currentPage === 21) {
        document.getElementById('page21').style.display = 'none';
    } else if (currentPage === 22) {
        document.getElementById('page22').style.display = 'none';
    } else if (currentPage === 23) {
        document.getElementById('page23').style.display = 'none';
    } else if (currentPage === 24) {
        document.getElementById('page24').style.display = 'none';
    } else if (currentPage === 25) {
        document.getElementById('page25').style.display = 'none';
    } else if (currentPage === 26) {
        document.getElementById('page26').style.display = 'none';
    } else if (currentPage === 27) {
        document.getElementById('page27').style.display = 'none';
    } else if (currentPage === 28) {
        document.getElementById('page28').style.display = 'none';
    }
    
    // Show location selection
    currentPage = 4;
    document.getElementById('page4').style.display = 'block';
}

// Check for sheep in objects
function checkForSheep(object) {
    console.log(`Checking ${object} for sheep...`);
    console.log(`Current page: ${currentPage}`);
    console.log(`Tractor clicked: ${tractorClicked}`);
    
    if (object === 'coop' && !tractorClicked && currentPage === 5) {
        // First time clicking chicken coop - show alert then hide it
        showNotification('No sheep here!');
        tractorClicked = true;
        document.getElementById('page5').style.display = 'none';
        currentPage = 6;
        document.getElementById('page6').style.display = 'block';
    } else if (object === 'coop' && tractorClicked && currentPage === 9) {
        // Clicking coop on page 9 - go to page 12
        showNotification('No sheep here!');
        document.getElementById('page9').style.display = 'none';
        currentPage = 12;
        document.getElementById('page12').style.display = 'block';
    } else if (object === 'coop' && currentPage === 10) {
        // Clicking coop on page 10 - show alert and go to completely empty scene
        showNotification('No sheep here!');
        document.getElementById('page10').style.display = 'none';
        currentPage = 11;
        document.getElementById('page11').style.display = 'block';
    } else if (object === 'tractor' && currentPage === 6) {
        // Clicking tractor on page 6 reveals the sheep (coop was clicked first)
        document.getElementById('page6').style.display = 'none';
        currentPage = 7;
        document.getElementById('page7').style.display = 'block';
    } else if (object === 'tractor' && currentPage === 7) {
        // Clicking tractor on page 7 - hide tractor, show just sheep
        console.log('Tractor clicked on page 7 - going to page 12');
        showNotification('No sheep here!');
        document.getElementById('page7').style.display = 'none';
        currentPage = 12;
        document.getElementById('page12').style.display = 'block';
        console.log('Should now be on page 12');
    } else if (object === 'tractor' && currentPage === 5 && !tractorClicked) {
        // Clicking tractor first - sheep appears on left, coop stays
        tractorClicked = true;
        document.getElementById('page5').style.display = 'none';
        currentPage = 9;
        document.getElementById('page9').style.display = 'block';
    }
    // Otherwise do nothing
}

// Collect sheep
function collectSheep(sheepId) {
    console.log(`Collecting sheep: ${sheepId}`);
    console.log(`Current page in collectSheep: ${currentPage}`);
    console.log(`isTransitioning: ${isTransitioning}`);
    console.log(`blockClicks: ${blockClicks}`);
    
    // Block if clicks are disabled
    if (blockClicks) {
        console.log('Sheep click blocked - blockClicks is true');
        return;
    }
    
    // Block if currently transitioning
    if (isTransitioning) {
        console.log('Sheep click blocked - page is transitioning');
        return;
    }
    
    // Prevent immediate clicks after page transition
    const timeSinceTransition = Date.now() - lastTransitionTime;
    if (timeSinceTransition < 300) {
        console.log(`Sheep click blocked - only ${timeSinceTransition}ms since transition`);
        return;
    }
    
    if (!canClickSheep) {
        console.log('Sheep click blocked - too soon after page transition');
        return;
    }
    
    sheepFound++;
    
    // Mark chicken coop as completed only for chicken coop sheep
    if (sheepId === 'chicken-coop-sheep' || sheepId === 'left-chicken-coop-sheep') {
        chickenCoopCompleted = true;
    }
    
    // Mark barn as completed for barn sheep
    if (sheepId === 'barn-sheep') {
        barnCompleted = true;
    }
    
    // Mark pasture as completed for pasture sheep
    if (sheepId === 'pasture-sheep' || sheepId === 'pasture-left-sheep') {
        pastureSheepCount++;
        if (pastureSheepCount >= 2) {
            pastureCompleted = true;
        }
    }
    
    showNotification("You've found a sheep");
    
    // Hide current page and show appropriate next scene
    if (currentPage === 7) {
        // From coop-first path -> go to empty scene
        document.getElementById('page7').style.display = 'none';
        currentPage = 8;
        document.getElementById('page8').style.display = 'block';
        const counter8 = document.getElementById('sheep-counter-page8');
        if (counter8) {
            counter8.textContent = `sheep collected: ${sheepFound}/${totalSheep}`;
        }
    } else if (currentPage === 9) {
        // From tractor-first path -> go to page 10 (coop and tractor remain)
        document.getElementById('page9').style.display = 'none';
        currentPage = 10;
        document.getElementById('page10').style.display = 'block';
        const counter10 = document.getElementById('sheep-counter-page10');
        if (counter10) {
            counter10.textContent = `sheep collected: ${sheepFound}/${totalSheep}`;
        }
        // Also update page 11 counter in case they go there
        const counter11 = document.getElementById('sheep-counter-page11');
        if (counter11) {
            counter11.textContent = `sheep collected: ${sheepFound}/${totalSheep}`;
        }
    } else if (currentPage === 12) {
        // From page 12 (sheep only after tractor clicked) -> go to page 11
        document.getElementById('page12').style.display = 'none';
        currentPage = 11;
        document.getElementById('page11').style.display = 'block';
        const counter11 = document.getElementById('sheep-counter-page11');
        if (counter11) {
            counter11.textContent = `sheep collected: ${sheepFound}/${totalSheep}`;
        }
    } else if (currentPage === 15 || currentPage === 16) {
        // From barn interior - collect sheep, go to empty barn
        if (currentPage === 15) {
            document.getElementById('page15').style.display = 'none';
        } else {
            document.getElementById('page16').style.display = 'none';
        }
        currentPage = 17;
        document.getElementById('page17').style.display = 'block';
        const counter17 = document.getElementById('sheep-counter-page17');
        if (counter17) {
            counter17.textContent = `sheep collected: ${sheepFound}/${totalSheep}`;
        }
    } else if (currentPage === 19) {
        // From pasture - collect sheep, go to empty pasture page 20
        document.getElementById('page19').style.display = 'none';
        currentPage = 20;
        document.getElementById('page20').style.display = 'block';
        const counter20 = document.getElementById('sheep-counter-page20');
        if (counter20) {
            counter20.textContent = `sheep collected: ${sheepFound}/${totalSheep}`;
        }
    } else if (currentPage === 21) {
        // From pasture left sheep - collect sheep, go to completely empty pasture page 22
        document.getElementById('page21').style.display = 'none';
        currentPage = 22;
        document.getElementById('page22').style.display = 'block';
        const counter22 = document.getElementById('sheep-counter-page22');
        if (counter22) {
            counter22.textContent = `sheep collected: ${sheepFound}/${totalSheep}`;
        }
    } else if (currentPage === 23) {
        // From pasture page 23 (left sheep with tree) - collect sheep, go to page 24 (just tree)
        document.getElementById('page23').style.display = 'none';
        currentPage = 24;
        document.getElementById('page24').style.display = 'block';
        const counter24 = document.getElementById('sheep-counter-page24');
        if (counter24) {
            counter24.textContent = `sheep collected: ${sheepFound}/${totalSheep}`;
        }
    } else if (currentPage === 25) {
        // From pasture page 25 (only right sheep) - collect sheep, go to page 22 (completely empty)
        document.getElementById('page25').style.display = 'none';
        currentPage = 22;
        document.getElementById('page22').style.display = 'block';
        const counter22 = document.getElementById('sheep-counter-page22');
        if (counter22) {
            counter22.textContent = `sheep collected: ${sheepFound}/${totalSheep}`;
        }
    } else if (currentPage === 26) {
        // From page 26 (both sheep visible) - collect one sheep
        if (sheepId === 'pasture-left-sheep') {
            // Collected left sheep - show only right sheep on page 27
            document.getElementById('page26').style.display = 'none';
            currentPage = 27;
            document.getElementById('page27').style.display = 'block';
            const counter27 = document.getElementById('sheep-counter-page27');
            if (counter27) {
                counter27.textContent = `sheep collected: ${sheepFound}/${totalSheep}`;
            }
        } else if (sheepId === 'pasture-sheep') {
            // Collected right sheep - show only left sheep on page 28
            document.getElementById('page26').style.display = 'none';
            currentPage = 28;
            document.getElementById('page28').style.display = 'block';
            const counter28 = document.getElementById('sheep-counter-page28');
            if (counter28) {
                counter28.textContent = `sheep collected: ${sheepFound}/${totalSheep}`;
            }
        }
    } else if (currentPage === 27) {
        // From page 27 (only right sheep) - collect sheep, go to page 22 (completely empty)
        document.getElementById('page27').style.display = 'none';
        currentPage = 22;
        document.getElementById('page22').style.display = 'block';
        const counter22 = document.getElementById('sheep-counter-page22');
        if (counter22) {
            counter22.textContent = `sheep collected: ${sheepFound}/${totalSheep}`;
        }
    } else if (currentPage === 28) {
        // From page 28 (only left sheep) - collect sheep, go to page 22 (completely empty)
        document.getElementById('page28').style.display = 'none';
        currentPage = 22;
        document.getElementById('page22').style.display = 'block';
        const counter22 = document.getElementById('sheep-counter-page22');
        if (counter22) {
            counter22.textContent = `sheep collected: ${sheepFound}/${totalSheep}`;
        }
    }
}

// Check for sheep in barn objects
function checkBarnObject(object, event) {
    // Set transition flag FIRST before anything else
    if ((object === 'barn' && currentPage === 13) || (object === 'barn' && currentPage === 14)) {
        isTransitioning = true;
        console.log('SET isTransitioning to TRUE');
    }
    
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    console.log(`Checking barn ${object} for sheep...`);
    console.log(`Current page BEFORE: ${currentPage}`);
    
    if (object === 'barn' && currentPage === 13) {
        // Clicking barn on page 13 - go to barn interior
        blockClicks = true;
        console.log('SET blockClicks to TRUE at', Date.now());
        
        // Disable all sheep clicks FIRST
        const allSheep = document.querySelectorAll('.barn-sheep, .barn-sheep-moved');
        allSheep.forEach(sheep => {
            sheep.style.pointerEvents = 'none';
        });
        console.log('Disabled sheep pointer events');
        
        document.getElementById('page13').style.display = 'none';
        currentPage = 15;
        document.getElementById('page15').style.display = 'block';
        lastTransitionTime = Date.now();
        console.log(`Transitioned from page 13 to page 15`);
        console.log(`Current page AFTER: ${currentPage}`);
        
        // Re-enable sheep clicks after a delay
        setTimeout(() => { 
            allSheep.forEach(sheep => {
                sheep.style.pointerEvents = 'auto';
            });
            blockClicks = false;
            isTransitioning = false;
            console.log('SET blockClicks to FALSE at', Date.now(), '- Re-enabled sheep clicks');
        }, 500);
    } else if (object === 'hay' && currentPage === 13) {
        showNotification('No sheep here!');
        document.getElementById('page13').style.display = 'none';
        currentPage = 14;
        document.getElementById('page14').style.display = 'block';
        console.log(`Transitioned from page 13 to page 14`);
        console.log(`Current page AFTER: ${currentPage}`);
    } else if (object === 'barn' && currentPage === 14) {
        // Clicking barn reveals sheep inside
        
        // Disable all sheep clicks FIRST
        const allSheep = document.querySelectorAll('.barn-sheep, .barn-sheep-moved');
        allSheep.forEach(sheep => {
            sheep.style.pointerEvents = 'none';
        });
        console.log('Disabled sheep pointer events');
        
        document.getElementById('page14').style.display = 'none';
        currentPage = 15;
        document.getElementById('page15').style.display = 'block';
        lastTransitionTime = Date.now();
        console.log(`Transitioned from page 14 to page 15`);
        console.log(`Current page AFTER: ${currentPage}`);
        
        // Re-enable sheep clicks after a delay
        setTimeout(() => { 
            allSheep.forEach(sheep => {
                sheep.style.pointerEvents = 'auto';
            });
            isTransitioning = false;
            console.log('Re-enabled sheep clicks');
        }, 500);
    }
}

// Check objects inside barn
function checkBarnInterior(object) {
    console.log(`checkBarnInterior called with: ${object}...`);
    console.log(`Current page: ${currentPage}`);
    
    if (object === 'hay-bales' && currentPage === 15) {
        document.getElementById('page15').style.display = 'none';
        currentPage = 16;
        document.getElementById('page16').style.display = 'block';
    }
}

// Check for sheep in pasture objects
function checkPastureObject(object) {
    console.log(`Checking pasture object: ${object}`);
    console.log(`Current page: ${currentPage}`);
    
    if (object === 'leaves' && currentPage === 18) {
        // Clicked leaves - reveal sheep on page 19
        document.getElementById('page18').style.display = 'none';
        currentPage = 19;
        document.getElementById('page19').style.display = 'block';
    } else if (object === 'basket' && currentPage === 18) {
        // Clicked basket on initial page - reveal left sheep with tree on page 23
        document.getElementById('page18').style.display = 'none';
        currentPage = 23;
        document.getElementById('page23').style.display = 'block';
    } else if (object === 'basket' && currentPage === 19) {
        // Clicked basket on page 19 - reveal both sheep on page 26
        document.getElementById('page19').style.display = 'none';
        currentPage = 26;
        document.getElementById('page26').style.display = 'block';
    } else if (object === 'basket' && currentPage === 20) {
        // Clicked basket on empty pasture - reveal second sheep on page 21
        document.getElementById('page20').style.display = 'none';
        currentPage = 21;
        document.getElementById('page21').style.display = 'block';
    } else if (object === 'leaves' && currentPage === 23) {
        // Clicked tree on page 23 - reveal BOTH sheep on page 26
        document.getElementById('page23').style.display = 'none';
        currentPage = 26;
        document.getElementById('page26').style.display = 'block';
    } else if (object === 'leaves' && currentPage === 24) {
        // Clicked leaves on page 24 - reveal right sheep on page 25 (no basket)
        document.getElementById('page24').style.display = 'none';
        currentPage = 25;
        document.getElementById('page25').style.display = 'block';
    }
}

// Initialize
console.log('Sheep Roundup - Click the text to continue');
