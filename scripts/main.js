document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const finishBtn = document.getElementById('finishBtn');

    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            fileNameDisplay.textContent = `Selected file: ${fileName}`;
        }
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        uploadArea.style.borderColor = '#007bff';
        uploadArea.style.backgroundColor = '#f8f9fa';
    }

    function unhighlight() {
        uploadArea.style.borderColor = '#ccc';
        uploadArea.style.backgroundColor = '';
    }

    uploadArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            fileInput.files = files;
            const fileName = files[0].name;
            fileNameDisplay.textContent = `Selected file: ${fileName}`;
        }
    }

    finishBtn.addEventListener('click', function() {
        if (fileInput.files.length > 0) {
            alert('Resume uploaded successfully!');
        } else {
            alert('Please upload a resume file first.');
        }
    });
});