        let filterHeads = document.querySelectorAll(".collection-filters2 .sidebar-collection-filters-head-wrapper .collection-sidebar-filter-headings");
        let filterValues = document.querySelectorAll(".collection-filters2 .sidebar-collection-filter-values-wrap .collection-sidebar-section");

        filterHeads.forEach((div) => {
            div.addEventListener('click', () => {
                // Get the data-filter attribute value of the clicked div
                const filterValue = div.getAttribute('data-filter');

                // Iterate over each div in filterValues
                filterValues.forEach((valueDiv) => {
                    // Check if the data-filter attribute matches
                    if (valueDiv.getAttribute('data-filter') === filterValue) {
                        // Check if the clicked div already has the active class
                        const isActive = div.classList.contains('active');

                        // Remove active class and reset opacity for all divs
                        filterHeads.forEach((head) => {
                            head.classList.remove('active');
                        });

                        filterValues.forEach((value) => {
                            value.classList.remove('active');
                            value.style.opacity = '0.5';
                        });

                        // If the clicked div didn't have the active class, toggle it and set opacity to 1
                        if (!isActive) {
                            div.classList.toggle('active');
                            valueDiv.classList.toggle('active');
                            valueDiv.style.opacity = '1';
                        }
                    }
                });
            });
        });