function describe(text) {

    const tooltip = document.getElementById('tooltip');
    tooltip.innerText = text;
    tooltip.style.opacity = 1; // Make sure it's visible
    tooltip.style.zIndex = 10; // Make sure it's visible


    const icons = document.querySelectorAll('#Icons img');

    icons.forEach((icon) => {
        icon.style.opacity =  "0"; // Toggle opacity
      });



  }
  
  function clearTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.opacity = 0; // Reset visibility
    tooltip.style.zIndex = -10; // Make sure it's visible

    const icons = document.querySelectorAll('#Icons img');
    icons.forEach((icon) => {
        icon.style.opacity = "1"; // Toggle opacity
      });


  }
