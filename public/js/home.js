 const nameEl = document.getElementById('name');
  const names = ['Web Developer','Mern Stack Developer', 'A Problem Solver'];
  let index = 0;
  let charIndex = 0;
  let typing = true;

  function type() {
    if (typing) {
      if (charIndex < names[index].length) {
        nameEl.textContent += names[index].charAt(charIndex);
        charIndex++;
        setTimeout(type, 150);
      } else {
        typing = false;
        setTimeout(type, 2000); // Wait 2 sec before deleting
      }
    } else {
      if (charIndex > 0) {
        nameEl.textContent = names[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(type, 100);
      } else {
        typing = true;
        index = (index + 1) % names.length;
        setTimeout(type, 500);
      }
    }
  }

  type();
