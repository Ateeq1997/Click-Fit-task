// Click Fit - Main JavaScript File

// Wait for page to fully load
window.addEventListener('DOMContentLoaded', function() {
    console.log('Click Fit loaded successfully');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // AJAX call to NumbersAPI - REQUIRED BY TASK
    // This calls http://numbersapi.com/1/30/date?json and displays the result
    console.log('Making AJAX call to: http://numbersapi.com/1/30/date?json');
    
    fetch('http://numbersapi.com/1/30/date?json', {
        method: 'GET',
        mode: 'cors'
    })
        .then(response => {
            console.log('API Response received:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('NumbersAPI data loaded successfully:', data.text);
            document.getElementById('funFactText').innerHTML = 
                '<i class="fas fa-check-circle me-2"></i><strong>API Response:</strong> ' + data.text;
        })
        .catch(error => {
            console.log('API call failed or timed out:', error);
            // Fallback content if API fails - fitness related fact
            document.getElementById('funFactText').innerHTML = 
                '<i class="fas fa-lightbulb me-2"></i><strong>Fitness Fact:</strong> Studies show that just 30 minutes of moderate exercise, 5 days a week, can reduce your risk of heart disease by 50% and boost mental health significantly! 💪';
        });


    // Get DOM elements
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');

    // Click to upload - opens file browser
    uploadArea.addEventListener('click', function(e) {
        console.log('Upload area clicked - opening file browser');
        fileInput.click();
    });

    // File input change event - when user selects files
    fileInput.addEventListener('change', function() {
        console.log('Files selected:', this.files.length);
        if (this.files.length > 0) {
            handleFiles(this.files);
        }
    });

    // Drag over event - when dragging files over the upload area
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.add('dragover');
    });

    // Drag leave event - when dragging files away from upload area
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.remove('dragover');
    });

    // Drop event - when dropping files onto the upload area
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.remove('dragover');
        
        console.log('Files dropped');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    // Main function to handle file uploads
    function handleFiles(files) {
        console.log('Processing', files.length, 'files');
        
        if (files.length === 0) {
            alert('⚠️ Please select at least one image');
            return;
        }

        // Clear previous previews
        previewContainer.innerHTML = '';
        
        // Create FormData object to send files to server
        const formData = new FormData();
        let validFiles = 0;

        // Loop through all selected files
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log('File:', file.name, 'Type:', file.type, 'Size:', file.size);

            // Check if file is an image
            if (file.type.startsWith('image/')) {
                validFiles++;

                // Create preview for the image
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.className = 'preview-image';
                    img.title = file.name;
                    img.alt = 'Preview of ' + file.name;
                    previewContainer.appendChild(img);
                };
                reader.readAsDataURL(file);

                // Add file to FormData for upload
                formData.append('images', file);
            } else {
                console.warn('Skipped non-image file:', file.name);
            }
        }

        // Check if any valid images were selected
        if (validFiles === 0) {
            alert('⚠️ Please select valid image files (JPG, PNG, GIF, WEBP)');
            return;
        }

        // Upload files to server - REQUIRED BY TASK
        console.log('Uploading', validFiles, 'images to Node.js server...');
        
        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Server responded with status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Upload successful:', data);
            alert('✓ Success!\n\n' + 
                  validFiles + ' image(s) uploaded successfully to the server.\n\n' +
                  'Location: upload_images folder in your project directory');
        })
        .catch(error => {
            console.error('Upload error:', error);
            alert('❌ Upload Failed!\n\n' +
                  'Please ensure:\n' +
                  '• Node.js server is running\n' +
                  '• Run command: npm start\n' +
                  '• Server should be at: http://localhost:3000\n\n' +
                  'Error: ' + error.message);
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll for feature cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    console.log('All event listeners initialized successfully');
});