<script>
async function loadAIApps(targetCategories) {
    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRhLJjC48YfJR3JfDtsLBsP_npi1XdXoF_nlBylIv5F-gkFL4ayprtcGShRCKZMOhhoSCxkjyeSXMZ8/pub?output=csv";

    const response = await fetch(csvUrl);
    const csvText = await response.text();

    const rows = csvText.split("\n").map(r => r.split(","));
    const headers = rows[0];

    const categoryIndex = headers.indexOf("Category");
    const nameIndex = headers.indexOf("Name of AI App");
    const linkIndex = headers.indexOf("Weblink to the AI App");
    const iconIndex = headers.indexOf("Icon");

    const apps = rows.slice(1).map(r => ({
        category: r[categoryIndex],
        name: r[nameIndex],
        link: r[linkIndex],
        icon: r[iconIndex]
    }));

    const container = document.getElementById("app-container");

    targetCategories.forEach(category => {
        const section = document.createElement("section");
        section.innerHTML = `<h2>${category}</h2><div class="grid"></div>`;
        const grid = section.querySelector(".grid");

        apps.filter(a => a.category === category).forEach(app => {
            const item = document.createElement("div");
            item.className = "item";
            item.innerHTML = `
                <a href="${app.link}" target="_blank">
                    <img src="${app.icon}" alt="${app.name}">
                    <div>${app.name}</div>
                </a>
            `;
            grid.appendChild(item);
        });

        container.appendChild(section);
    });
}
</script>
