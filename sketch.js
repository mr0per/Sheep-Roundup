// Game state
let currentPage = 1;
const totalPages = 6;
let sheepFound = 0;
const totalSheep = 4;
let tractorClicked = false;

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
        // Chicken Coop
        currentPage = 5;
        document.getElementById('page5').style.display = 'block';
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
    }
    
    // Show location selection
    currentPage = 4;
    document.getElementById('page4').style.display = 'block';
}

// Check for sheep in objects
function checkForSheep(object) {
    console.log(`Checking ${object} for sheep...`);
    
    if (object === 'coop' && !tractorClicked) {
        // First time clicking chicken coop - show alert then hide it
        alert(`No sheep here!`);
        tractorClicked = true;
        document.getElementById('page5').style.display = 'none';
        currentPage = 6;
        document.getElementById('page6').style.display = 'block';
    } else {
        alert(`No sheep here!`);
    }
}

// Initialize
console.log('Sheep Roundup - Click the text to continue');
