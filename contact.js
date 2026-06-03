/**
 * Portfolio Contact Form Controller Architecture
 * Handles validation, client-side security, asynchronously dispatches 
 * FormSpree/FormSubmit payloads, and controls UI feedback states.
 */

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-form");
    const submitBtn = document.querySelector(".submit-btn");
    const submitBtnText = submitBtn.querySelector("span");

    if (!contactForm) return;

    contactForm.addEventListener("submit", async (event) => {
        // Prevent default browser page refresh behavior
        event.preventDefault();

        // 1. Gather Form Input Elements
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const subjectInput = document.getElementById("subject");
        const messageInput = document.getElementById("message");

        // 2. Extract and Trim White Spaces
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
        };

        // 3. Client-Side Validation Gateways
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showToast("Please fill in all fields before sending.", "error");
            return;
        }

        if (!validateEmail(formData.email)) {
            showToast("Please enter a structurally valid email address.", "error");
            emailInput.focus();
            return;
        }

        // 4. Update UI to Loading State
        setLoadingState(true);

        try {
            /**
             * Form Submission Endpoint
             * Replace the URL string below with your live endpoint when ready:
             * e.g., "https://formspree.io/f/your_endpoint_id" or "https://submit-form.com/your_id"
             */
            const ENDPOINT_URL = "https://formsubmit.co/ramyasrevankar2002@gmail.com"; 

            // Simulating real network delay if placeholder URL isn't configured yet
            if (ENDPOINT_URL.includes("placeholder")) {
                await new Promise(resolve => setTimeout(resolve, 1400));
                // Throwing simulated success
                showToast("Message dispatched successfully! I will reach out soon.", "success");
                contactForm.reset();
            } else {
                // Actual AJAX Server Dispatch
                const response = await fetch(ENDPOINT_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    showToast("Message dispatched successfully! I will reach out soon.", "success");
                    contactForm.reset();
                } else {
                    throw new Error("Server rejected response payload.");
                }
            }

        } catch (error) {
            console.error("Submission Error Log:", error);
            showToast("Failed to transmit message. Please contact via direct email.", "error");
        } finally {
            // 5. Restore UI Clickable State
            setLoadingState(false);
        }
    });

    /**
     * Regex Pattern-Matching Email Structural Validator
     */
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    /**
     * Toggles Interactive Button State Properties
     */
    function setLoadingState(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";
            submitBtn.style.cursor = "not-allowed";
            submitBtnText.textContent = "Sending...";
        } else {
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
            submitBtn.style.cursor = "pointer";
            submitBtnText.textContent = "Send Message";
        }
    }

    /**
     * Spawns a Temporary Glassmorphic Alert Toast Notification
     */
    function showToast(message, type = "success") {
        // Remove existing toasts if clicked rapidly
        const existingToast = document.querySelector(".portfolio-toast");
        if (existingToast) existingToast.remove();

        // Create notification module container
        const toast = document.createElement("div");
        toast.className = `portfolio-toast ${type}`;
        
        // Inline layout configuration styling to match dark/neon ecosystem
        Object.assign(toast.style, {
            position: "fixed",
            bottom: "30px",
            right: "30px",
            padding: "14px 24px",
            borderRadius: "12px",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#ffffff",
            zIndex: "9999",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            webkitBackdropFilter: "blur(8px)",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            transform: "translateY(100px)",
            opacity: "0"
        });

        // Set type color profiles
        if (type === "success") {
            toast.style.background = "rgba(168, 85, 247, 0.15)";
            toast.style.border = "1px solid rgba(168, 85, 247, 0.4)";
            toast.style.boxShadow = "0 0 15px rgba(168, 85, 247, 0.15)";
        } else {
            toast.style.background = "rgba(239, 68, 68, 0.15)";
            toast.style.border = "1px solid rgba(239, 68, 68, 0.4)";
            toast.style.boxShadow = "0 0 15px rgba(239, 68, 68, 0.15)";
        }

        toast.textContent = message;
        document.body.appendChild(toast);

        // Animation timing frames
        setTimeout(() => {
            toast.style.transform = "translateY(0)";
            toast.style.opacity = "1";
        }, 50);

        // Self-destruction timeline removal
        setTimeout(() => {
            toast.style.transform = "translateY(30px)";
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }
});