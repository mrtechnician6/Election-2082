const API_URL = "https://sheetdb.io/api/v1/YOUR_API_ID"; // Paste your ID here

async function fetchElectionData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        const grid = document.getElementById('results-grid');
        grid.innerHTML = ''; // Clear old data

        data.forEach(party => {
            grid.innerHTML += `
                <div class="bg-white p-6 rounded-xl shadow-md border-l-8" style="border-color: ${party.color_code}">
                    <h2 class="text-xl font-bold">${party.party_name}</h2>
                    <div class="mt-4 flex justify-between items-end">
                        <div>
                            <p class="text-gray-500 text-xs uppercase font-bold">Total Votes</p>
                            <p class="text-4xl font-black text-gray-800 tracking-tighter">
                                ${Number(party.votes).toLocaleString()}
                            </p>
                        </div>
                        <div class="text-right">
                            <span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-bold">
                                Leading in ${party.leading_in}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Data fetch failed:", error);
    }
}

// Update every 30 seconds
setInterval(fetchElectionData, 30000);
fetchElectionData();
