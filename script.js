// Set up the initial state when document loads
document.addEventListener('DOMContentLoaded', () => {
    // Ensure Home is shown by default
    const homeView = document.getElementById('home-view');
    if (homeView) {
        homeView.style.display = 'block';
        setTimeout(() => homeView.classList.add('active'), 10);
    }
});

// Toggle Views (Home <--> Courses)
function switchView(viewName) {
    const allViews = document.querySelectorAll('.view-section');
    const targetView = document.getElementById(`${viewName}-view`);

    if (!targetView) return;

    // Check if it's already active
    if (targetView.classList.contains('active')) return;

    // Fade out current view
    allViews.forEach(view => {
        if (view.classList.contains('active')) {
            view.classList.remove('active');
            // wait for fade out transition (300ms) before hiding
            setTimeout(() => {
                view.style.display = 'none';
            }, 300);
        }
    });

    // Delay fade in to allow fade out to complete
    setTimeout(() => {
        targetView.style.display = 'block';
        // slight delay to enforce display block before opacity transition
        setTimeout(() => {
            targetView.classList.add('active');
        }, 50);
    }, 300);

    // Update Navbar UI
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.dataset.target === viewName) {
            btn.classList.replace('text-slate-600', 'text-navy-800');
            btn.classList.replace('border-transparent', 'border-navy-800');
        } else {
            btn.classList.replace('text-navy-800', 'text-slate-600');
            btn.classList.replace('border-navy-800', 'border-transparent');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Switch between Course Panes inside tracking Courses view
function showCourse(courseId, btnElement) {
    // Hide all sub-panes
    document.querySelectorAll('.course-pane').forEach(pane => {
        pane.classList.add('hidden');
        pane.classList.remove('block');
    });

    // Show new sub-pane
    const targetPane = document.getElementById(courseId);
    if (targetPane) {
        targetPane.classList.remove('hidden');
        targetPane.classList.add('block');
    }

    // Reset all tab button styles
    const allTabs = document.querySelectorAll('.course-tab-btn');
    allTabs.forEach(tab => {
        tab.classList.remove('bg-navy-50', 'border-navy-800', 'text-navy-900');
        tab.classList.add('bg-white', 'border-transparent', 'text-slate-700');
    });

    // Style the active tab button
    if (btnElement) {
        btnElement.classList.remove('bg-white', 'border-transparent', 'text-slate-700');
        btnElement.classList.add('bg-navy-50', 'border-navy-800', 'text-navy-900');
    }
}

// Expand / Collapse Video Sections
function toggleVideo(btn) {
    const container = btn.nextElementSibling;
    const icon = btn.querySelector('.fa-chevron-down');

    if (!container || !icon) return;

    if (container.classList.contains('expanded')) {
        // Collapse
        container.classList.remove('expanded');
        icon.style.transform = 'rotate(0deg)';
        btn.classList.remove('bg-gray-100');
        btn.classList.add('bg-gray-50');
    } else {
        // Auto-collapse other open videos within the same course pane
        const parentPane = btn.closest('.course-pane');
        if (parentPane) {
            parentPane.querySelectorAll('.video-container.expanded').forEach(c => {
                if (c !== container) {
                    c.classList.remove('expanded');
                    const otherIcon = c.previousElementSibling.querySelector('.fa-chevron-down');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                    c.previousElementSibling.classList.remove('bg-gray-100');
                    c.previousElementSibling.classList.add('bg-gray-50');
                }
            });
        }

        // Expand
        container.classList.add('expanded');
        icon.style.transform = 'rotate(180deg)';
        btn.classList.remove('bg-gray-50');
        btn.classList.add('bg-gray-100');
    }
}
