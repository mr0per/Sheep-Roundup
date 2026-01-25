// Game state
let currentPage = 1;
const totalPages = 12;
let sheepFound = 0;
const totalSheep = 4;
let tractorClicked = false;
let chickenCoopCompleted = false;

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
        // Barn - TODO
        console.log('Barn scene not yet implemented');
    } else if (direction === 'up') {
        // Sheep pasture - TODO
        console.log('Sheep pasture scene not yet implemented');
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
        alert(`No sheep here!`);
        tractorClicked = true;
        document.getElementById('page5').style.display = 'none';
        currentPage = 6;
        document.getElementById('page6').style.display = 'block';
    } else if (object === 'coop' && tractorClicked && currentPage === 9) {
        // Clicking coop on page 9 - go to page 12
        alert(`No sheep here!`);
        document.getElementById('page9').style.display = 'none';
        currentPage = 12;
        document.getElementById('page12').style.display = 'block';
    } else if (object === 'coop' && currentPage === 10) {
        // Clicking coop on page 10 - show alert and go to completely empty scene
        alert(`No sheep here!`);
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
        alert(`No sheep here!`);
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
    sheepFound++;
    chickenCoopCompleted = true; // Mark chicken coop as completed
    alert(`You found a sheep! ${sheepFound}/${totalSheep}`);
    
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
    }
}

// Initialize
console.log('Sheep Roundup - Click the text to continue');
