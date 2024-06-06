document.addEventListener('DOMContentLoaded', () => {
    const lengthInput = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const passwordInput = document.querySelector('.password-input');
    const copyButton = document.querySelector('.copy-button');
    const generateButton = document.querySelector('.generate-button');
    const checkboxes = document.querySelectorAll('.checkbox-input');
    const strengthBars = document.querySelectorAll('.strength-bar');
  
    lengthInput.addEventListener('input', () => {
      lengthValue.textContent = lengthInput.value;
      updateStrengthIndicator();
    });
  
    copyButton.addEventListener('click', () => {
      passwordInput.select();
      document.execCommand('copy');
      alert('Password copied to clipboard!');
    });
  
    generateButton.addEventListener('click', () => {
      const length = parseInt(lengthInput.value);
      const includeUppercase = checkboxes[0].checked;
      const includeLowercase = checkboxes[1].checked;
      const includeNumbers = checkboxes[2].checked;
      const includeSymbols = checkboxes[3].checked;
  
      const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
      passwordInput.value = password;
      updateStrengthIndicator();
    });
  
    function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
      const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const numberChars = '0123456789';
      const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
      let allChars = '';
      let password = '';
  
      if (includeUppercase) allChars += uppercaseChars;
      if (includeLowercase) allChars += lowercaseChars;
      if (includeNumbers) allChars += numberChars;
      if (includeSymbols) allChars += symbolChars;
  
      if (allChars.length === 0) return '';
  
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
      }
  
      return password;
    }
  
    function updateStrengthIndicator() {
      const length = parseInt(lengthInput.value);
      let strength = 0;
  
      if (length >= 8) strength++;
      if (length >= 12) strength++;
      if (checkboxes[0].checked) strength++;
      if (checkboxes[1].checked) strength++;
      if (checkboxes[2].checked) strength++;
      if (checkboxes[3].checked) strength++;
  
      strengthBars.forEach((bar, index) => {
        if (index < strength) {
          bar.style.backgroundColor = '#10b981'; 
        } else {
          bar.style.backgroundColor = '#3f3f46'; 
        }
      });
    }
  
    lengthValue.textContent = lengthInput.value;
    updateStrengthIndicator();
  });
  