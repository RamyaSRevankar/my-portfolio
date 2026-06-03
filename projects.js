/**
 * Interactive Client-Side Project Filter Logic Engine
 */
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    const gridContainer = document.querySelector(".projects-grid");

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // 1. Manage active CSS states across target buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // 2. Fetch active categorization filter query
            const targetFilter = button.getAttribute("data-filter");

            // 3. Evaluate matching criteria maps across cards
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");

                if (targetFilter === "all" || cardCategory === targetFilter) {
                    // Reveal matching elements smoothly
                    card.classList.remove("hide-item");
                    // Restore position alignment inside native grid rows
                    card.style.position = "relative";
                } else {
                    // Fade out and scale down unselected cards
                    card.classList.add("hide-item");
                    
                    // Delay structural collapsing until visibility finishes fading out
                    setTimeout(() => {
                        if (card.classList.contains("hide-item")) {
                            card.style.position = "absolute";
                        }
                    }, 400);
                }
            });
        });
    });
});